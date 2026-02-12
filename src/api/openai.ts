type Message = {
  role: "user" | "assistant";
  content: string;
};

type ApiResponse = {
  role: "user" | "assistant";
  content: string;
};

export async function sendMessage(messages: Message[]): Promise<ApiResponse> {
  const r = await fetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ messages }),
  });

  if (!r.ok) {
    const text = await r.text().catch(() => "");
    throw new Error(`Erro HTTP ${r.status}: ${text}`);
  }

  return (await r.json()) as ApiResponse;
}
