import { useState } from "react"
import { ItemSuggestion } from "./components/itemSuggestion"

type ProgressType = "pending" | "started" | "done"

function App() {
  const [progress, setProgress] = useState<ProgressType>("pending")

  return (
    <div className="container">
      <div className="sidebar">
        <details open className="suggestion">
          <summary>Tópicos Sugeridos</summary>
          <ItemSuggestion title="HTML"/>
          <ItemSuggestion title="CSS"/>
          <ItemSuggestion title="JavaScript"/>
          <ItemSuggestion title="TypeScript"/>
        </details>

        <details open className="historic">
          <summary>Histórico</summary>
          <ItemSuggestion title="Java"/>
          <ItemSuggestion title="PHP"/>
        </details>
      </div>

      <div className="content">
        {progress === "pending" && (
          <div className="box-home">
            <span>Olá, eu sou o</span>
            <h1>teach<span>.me</span></h1>
            <p>
              Estou aqui para te ajudar nos seus estudos.
              Selecione um dos tópicos sugeridos ao lado
              ou digite um tópico que deseja estudar para
              começarmos
            </p>
          </div>

        )}

        <div className="box-input">
          <textarea placeholder="Insira o tema que deseja estudar..."></textarea>
          <button>Enviar pergunta</button>
        </div>

       {/* <div className="box-chat">
          <h1>Você está estudando sobre <span>HTML</span></h1>

          <div className="question">
            <h2>Pergunta</h2>
            <p>
              Claro! Aqui está a pergunta simulada:
              "Como você descreveria o seu conhecimento
              e experiência com HTML? Você poderia
              fornecer um exemplo de um projeto em
              que utilizou HTML e como isso impactou
              positivamente o resultado final?
              Aguardo a sua resposta para poder
              fornecer feedback!
            </p>
          </div>

          <div className="answer">
            <h2>Sua resposta</h2>
            <p>
              Tenho um conhecimento sólido em HTML.
              Já construi vários sites
            </p>
          </div>

          <div className="feedback">
            <h2>Feedback teach<span>.me</span></h2>
            <p>
              Lorem ipsum dolor sit amet consectetur
              adipisicing elit. Repellat, error neque
              debitis repellendus asperiores, placeat
              temporibus, ducimus tempore eos iusto
              totam adipisci veritatis maiores velit
              soluta ipsum dolore quos vitae! Lorem
              ipsum dolor sit amet consectetur
              adipisicing elit. Voluptas accusantium,
              aperiam nemo provident et dignissimos
              officiis id unde nulla nam tempora
              saepe architecto repellendus obcaecati
              fugiat, voluptates expedita rem soluta.
              fkfksaldksaldkasçlfksaçlfkslaçdksçladk
              kljfklfjskldjfkljsdklfjsdklfdlkdjfslj
            </p>
            <div className="actions">
              <button>Estudar novo tópico</button>
            </div>
          </div>
        </div> */}

        <footer className="box-footer">
          <p>teach<span>.me</span></p>
        </footer>
      </div>
    </div>
  )

}

export default App
