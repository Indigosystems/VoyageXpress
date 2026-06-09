import Anthropic from "@anthropic-ai/sdk";
import {
  SERVICES,
  SIZES,
  calculateQuote,
  type Service,
  type Size,
} from "@/lib/pricing";
import { site } from "@/lib/site";

// The Anthropic SDK needs the Node runtime (not Edge).
export const runtime = "nodejs";
export const maxDuration = 30;

type ChatMessage = { role: "user" | "assistant"; content: string };

const MODEL = "claude-opus-4-8";

const SYSTEM_PROMPT = `You are Meep Meep, the friendly delivery assistant for ${site.name} — a small, owner-operated local courier run by a husband-and-wife team. You help visitors on the website.

About the business:
- Owner-operated: customers deal directly with the owners, not a call centre.
- Service area: ${site.serviceArea} (city and the surrounding region).
- What we carry: ${site.capacity.toLowerCase()} — parcels, satchels, boxes up to ~30kg, and small van loads by arrangement. If two people can lift it, we can usually move it.
- Services: same-day courier (urgent, delivered today), scheduled delivery (booked for a day/time), regular runs for local businesses, and small local moves.
- Tracking: customers can track a delivery on the Track page using their VX tracking number (e.g. VX-4821-7390) — no login needed.
- Booking: use the pricing calculator / "Book a pickup" on the site, or phone us.
- Contact: ${site.phone} · ${site.email}

How to behave:
- Be warm, upbeat and concise — a sentence or two, like a helpful local. A cheery "Meep meep!" now and then fits your character, but don't overdo it.
- When someone asks what a delivery costs or wants a quote, use the get_quote tool to get a real price, then share it plainly. If you're unsure of the service or size, ask one quick clarifying question first.
- Quotes are indicative; always mention the final price is confirmed before booking.
- Only state facts about the business given above. If you don't know something (exact ETAs, whether we cover a specific far-away town, anything unusual), say you'll have one of the owners confirm and point them to ${site.phone} or ${site.email}. Never invent details.
- Respond only with your final reply to the customer — no internal reasoning or meta-commentary.`;

const tools: Anthropic.Tool[] = [
  {
    name: "get_quote",
    description:
      "Calculate an indicative delivery price. Call this whenever the customer asks what a delivery would cost or wants a quote, once you know the service type and roughly what they're sending.",
    input_schema: {
      type: "object",
      properties: {
        service: {
          type: "string",
          enum: Object.keys(SERVICES),
          description:
            "same_day (urgent, today), scheduled (booked day/time), or regular (recurring business run)",
        },
        size: {
          type: "string",
          enum: Object.keys(SIZES),
          description:
            "satchel (documents), small (≤5kg parcel), large (≤30kg box), or van (small van load)",
        },
      },
      required: ["service", "size"],
    },
  },
];

function runQuoteTool(input: unknown): string {
  const { service, size } = (input ?? {}) as { service?: Service; size?: Size };
  if (!service || !SERVICES[service] || !size || !SIZES[size]) {
    return JSON.stringify({ error: "Need a valid service and size to quote." });
  }
  const q = calculateQuote(service, size);
  return JSON.stringify({
    price_from_aud: q.price,
    service: q.serviceLabel,
    size: q.sizeLabel,
    eta: q.eta,
    note: "Indicative only — confirmed before booking.",
  });
}

export async function POST(req: Request) {
  let messages: ChatMessage[] = [];
  try {
    const body = await req.json();
    messages = Array.isArray(body?.messages) ? body.messages : [];
  } catch {
    return Response.json({ error: "Bad request" }, { status: 400 });
  }

  // Keep the last ~12 turns; ignore anything malformed.
  const history = messages
    .filter(
      (m) =>
        m &&
        (m.role === "user" || m.role === "assistant") &&
        typeof m.content === "string",
    )
    .slice(-12);

  if (history.length === 0 || history[history.length - 1].role !== "user") {
    return Response.json({ error: "Expected a user message" }, { status: 400 });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    // No key yet — Meep Meep still helps via a simple scripted fallback.
    return Response.json({ reply: scriptedFallback(history) });
  }

  try {
    const client = new Anthropic({ apiKey });
    const convo: Anthropic.MessageParam[] = history.map((m) => ({
      role: m.role,
      content: m.content,
    }));

    // Manual agentic loop so Claude can call get_quote and we feed the result back.
    let reply = "";
    for (let i = 0; i < 4; i++) {
      const response = await client.messages.create({
        model: MODEL,
        max_tokens: 1024,
        thinking: { type: "disabled" },
        output_config: { effort: "low" },
        system: SYSTEM_PROMPT,
        tools,
        messages: convo,
      });

      const toolUses = response.content.filter(
        (b): b is Anthropic.ToolUseBlock => b.type === "tool_use",
      );

      if (response.stop_reason !== "tool_use" || toolUses.length === 0) {
        reply = response.content
          .filter((b): b is Anthropic.TextBlock => b.type === "text")
          .map((b) => b.text)
          .join("\n")
          .trim();
        break;
      }

      convo.push({ role: "assistant", content: response.content });
      convo.push({
        role: "user",
        content: toolUses.map((t) => ({
          type: "tool_result" as const,
          tool_use_id: t.id,
          content: runQuoteTool(t.input),
        })),
      });
    }

    return Response.json({
      reply:
        reply ||
        "Meep meep! Sorry, I lost my train of thought there — could you ask me again?",
    });
  } catch (err) {
    console.error("chat error", err);
    return Response.json({ reply: scriptedFallback(history) });
  }
}

// Deterministic, keyword-based helper used when no API key is configured (or the
// API call fails). Keeps the widget useful before ANTHROPIC_API_KEY is set.
function scriptedFallback(history: ChatMessage[]): string {
  const last = history[history.length - 1]?.content.toLowerCase() ?? "";
  const has = (...words: string[]) => words.some((w) => last.includes(w));

  if (has("price", "cost", "quote", "how much", "$")) {
    return `Happy to help with pricing! Roughly: same-day from $${SERVICES.same_day.base}, scheduled from $${SERVICES.scheduled.base}, plus a little more for larger items (a small parcel is +$${SIZES.small.surcharge}, a van load +$${SIZES.van.surcharge}). Pop the details into the pricing calculator on this page for an instant estimate, or call us on ${site.phone}. Meep meep!`;
  }
  if (has("track", "where", "parcel", "status")) {
    return `You can track your delivery on the Track page using your VX number (like VX-4821-7390) — no login needed. Need a hand? Call ${site.phone}.`;
  }
  if (has("area", "cover", "where do you", "region", "deliver to")) {
    return `We cover ${site.serviceArea}. If you're not sure we reach your spot, tell me the suburb and I'll have one of the owners confirm — ${site.phone}.`;
  }
  if (has("carry", "weight", "heavy", "size", "move", "big")) {
    return `We carry ${site.capacity.toLowerCase()} — parcels, satchels, boxes up to ~30kg, and small van loads by arrangement. If two people can lift it, we can usually move it!`;
  }
  if (has("book", "pickup", "order", "how do i")) {
    return `Easy — use the "Book a pickup" / pricing calculator on the site, or just call ${site.phone}. Meep meep!`;
  }
  if (has("hi", "hello", "hey", "meep")) {
    return `Meep meep! 👋 I'm Meep Meep, ${site.name}'s delivery helper. Ask me about pricing, what we carry, tracking, or booking a pickup.`;
  }
  return `Great question! I can help with pricing, what we carry, tracking, and booking. For anything else, one of the owners will sort you out — ${site.phone} or ${site.email}.`;
}
