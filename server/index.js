import express from "express";

const app = express();
app.use(express.json());

function extractTopic(firstUserContent = "") {
  const m = firstUserContent.match(/sobre\s+(.+?)\s*,\s*após\s+gerar/i);
  if (m?.[1]) return m[1].trim();
  const m2 = firstUserContent.match(/sobre\s+(.+?)\s*$/i);
  if (m2?.[1]) return m2[1].trim();
  return "o tema";
}

function makeQuestion(topic) {
  const t = topic.toLowerCase();

  if (t.includes("html")) {
    return "Em HTML, qual a diferença entre uma tag semântica (ex.: <header>, <main>) e uma <div>? Dê um exemplo prático.";
  }
  if (t.includes("css")) {
    return "No CSS, explique a diferença entre display: flex e display: grid e quando você escolheria cada um.";
  }
  if (t.includes("javascript")) {
    return "Em JavaScript, explique a diferença entre var, let e const e cite um erro comum que isso evita.";
  }
  if (t.includes("typescript")) {
    return "Em TypeScript, para que servem types/interfaces e como eles ajudam a evitar bugs? Dê um exemplo simples.";
  }

  return `Explique, com suas palavras, o que é ${topic} e cite um exemplo de uso no dia a dia de um dev.`;
}

function makeFeedback(answer) {
  const a = (answer ?? "").trim();
  if (!a) return "Você não enviou uma resposta. Escreva ao menos 2–3 frases para eu avaliar.";

  const firstLine = a.split("\n").find(Boolean) ?? a;
  const snippet = firstLine.length > 120 ? firstLine.slice(0, 120) + "…" : firstLine;

  const words = a.split(/\s+/).filter(Boolean).length;
  let clarity = "ok";
  if (words < 15) clarity = "curta demais";
  if (words > 120) clarity = "longa demais";

  return [
    `Resumo do que você respondeu: “${snippet}”`,
    "",
    "Pontos fortes: você respondeu com uma ideia central e não fugiu do tema.",
    `Ponto a melhorar: sua resposta está ${clarity}.`,
    "Sugestão prática: reescreva em 3 partes (definição → exemplo → conclusão) e evite frases vagas tipo “é um negócio que…”."
  ].join("\n");
}

app.post("/api/chat", (req, res) => {
  try {
    const { messages } = req.body ?? {};
    if (!Array.isArray(messages)) {
      return res.status(400).json({ error: "messages deve ser um array" });
    }

    const first = messages[0]?.content ?? "";
    const last = messages[messages.length - 1]?.content ?? "";

    if (messages.length <= 1) {
      const topic = extractTopic(first);
      return res.json({ role: "assistant", content: makeQuestion(topic) });
    }

    return res.json({ role: "assistant", content: makeFeedback(last) });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: "Erro no modo demo." });
  }
});

app.listen(3001, () => console.log("Backend DEMO ON: http://localhost:3001"));
