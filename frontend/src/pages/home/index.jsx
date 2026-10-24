import './style.css'
import { useState, useEffect } from "react"

const API_BASE_URL = import.meta.env.VITE_API_URL || ""

function Home() {

  const [pagamentos, setPagamentos] = useState([])
  const [total, setTotal] = useState(0)

  useEffect(() => {
    fetch(`${API_BASE_URL}/payments`)
      .then(response => response.json())
      .then(data => setPagamentos(data))

    totalPagamentos();
  }, [])

  const [titulo, setTitulo] = useState("")
  const [valor, setValor] = useState("")
  const [data, setData] = useState("")
  const [categoria, setCategoria] = useState("")
  const [pagamentoEmEdicao, setPagamentoEmEdicao] = useState(null)
  const [tituloEdicao, setTituloEdicao] = useState("")
  const [valorEdicao, setValorEdicao] = useState("")
  const [dataEdicao, setDataEdicao] = useState("")
  const [categoriaEdicao, setCategoriaEdicao] = useState("")

  function registrarPagamento() {

    const pagamento = {
      titulo,
      valor: parseFloat(valor),
      data,
      categoria
    }

    fetch(`${API_BASE_URL}/payments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(pagamento)
    })
      .then(response => response.json())
      .then(novoPagamento => {
        setPagamentos([...pagamentos, novoPagamento]);
        
        totalPagamentos();
      })
  }

  async function deletarPagamento(id) {
    try {
      const response = await fetch(`${API_BASE_URL}/payments/${id}`, {
        method: "DELETE"
      })

      if (!response.ok) {
        throw new Error(`Falha ao excluir pagamento: ${response.status}`)
      }

      setPagamentos(current => current.filter(p => p.id !== id))
      totalPagamentos()
    } catch (error) {
      console.error("Erro ao excluir pagamento:", error)
      window.alert("Não foi possível excluir o pagamento. Tente novamente.")
    }
  }

  function abrirEdicao(pagamento) {
    setPagamentoEmEdicao(pagamento)
    setTituloEdicao(pagamento.titulo)
    setValorEdicao(String(pagamento.valor))
    setDataEdicao(pagamento.data)
    setCategoriaEdicao(pagamento.categoria)
  }

  async function atualizarPagamento(event) {
    event.preventDefault()

    const pagamentoAtualizado = {
      titulo: tituloEdicao,
      valor: parseFloat(valorEdicao),
      data: dataEdicao,
      categoria: categoriaEdicao
    }

    try {
      const response = await fetch(`${API_BASE_URL}/payments/${pagamentoEmEdicao.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(pagamentoAtualizado)
      })

      if (!response.ok) {
        throw new Error(`Falha ao atualizar pagamento: ${response.status}`)
      }

      const pagamentoSalvo = await response.json()
      setPagamentos(current => current.map(p =>
        p.id === pagamentoSalvo.id ? pagamentoSalvo : p
      ))
      setPagamentoEmEdicao(null)
      totalPagamentos()
    } catch (error) {
      console.error("Erro ao atualizar pagamento:", error)
      window.alert("Não foi possível atualizar o pagamento. Tente novamente.")
    }
  }

  function totalPagamentos() {
    fetch(`${API_BASE_URL}/payments/total`)
      .then(response => response.json())
      .then(valorTotal => setTotal(valorTotal))
  }

  function formatarData(data) {
    const [ano, mes, dia] = data.split("-")
    return `${dia}/${mes}/${ano}`
  }

  return (
    <>
      <div className="cabecalho">
        <h1>Payment Manager</h1>
        <p>Bem-vindo ao sistema de gerenciamento de pagamentos.</p>
        <p>Total de pagamentos: R${total.toFixed(2)}</p>
      </div>

      <div className='operacao'>
        <div className='formulario'>
          <h2>Novo pagamento</h2>

          <input
            type="text"
            placeholder="Titulo"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
          />

          <input
            type="number"
            placeholder="Valor"
            value={valor}
            onChange={(e) => setValor(e.target.value)}
          />

          <input
            type="date"
            value={data}
            onChange={(e) => setData(e.target.value)}
          />

          <div className='categorias'>

            {["Comida", "Saúde", "Transporte", "Outros"].map(opcao => (
              <label className="categoria-opcao" key={opcao}>
                <input
                  type="radio"
                  name="categoria"
                  value={opcao}
                  checked={categoria === opcao}
                  onChange={(e) => setCategoria(e.target.value)}
                />
                {opcao}
              </label>
            ))}

          </div>

          <button onClick={registrarPagamento}>
            Registrar
          </button>

        </div>
        <div className='registro'>
          <h2>Pagamentos registrados</h2>
          <table>
            <thead>
              <tr>
                <th>Título</th>
                <th>Valor</th>
                <th>Data</th>
                <th>Categoria</th>
                <th>Ações</th>
              </tr>
            </thead>

            <tbody>
              {pagamentos.map((p) => (
                <tr key={p.id}>
                  <td>{p.titulo}</td>
                  <td>R${p.valor}</td>
                  <td>{formatarData(p.data)}</td>
                  <td>{p.categoria}</td>
                  <td>
                    <div className="acoes-pagamento">
                      <button className="botao-editar" onClick={() => abrirEdicao(p)}>
                        Editar
                      </button>
                      <button className="botao-deletar" onClick={() => deletarPagamento(p.id)}>
                        Deletar
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {pagamentoEmEdicao && (
        <div
          className="modal-edicao"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setPagamentoEmEdicao(null)
            }
          }}
        >
          <section
            className="painel-edicao"
            role="dialog"
            aria-modal="true"
            aria-labelledby="titulo-modal-edicao"
          >
            <div className="cabecalho-edicao">
              <div>
                <p className="sobrelinha-edicao">Pagamento #{pagamentoEmEdicao.id}</p>
                <h2 id="titulo-modal-edicao">Editar pagamento</h2>
              </div>
              <button
                className="fechar-edicao"
                type="button"
                aria-label="Fechar edição"
                onClick={() => setPagamentoEmEdicao(null)}
              >
                ×
              </button>
            </div>

            <form className="formulario-edicao" onSubmit={atualizarPagamento}>
              <label>
                Título
                <input
                  type="text"
                  value={tituloEdicao}
                  onChange={(event) => setTituloEdicao(event.target.value)}
                  required
                />
              </label>

              <label>
                Valor
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  value={valorEdicao}
                  onChange={(event) => setValorEdicao(event.target.value)}
                  required
                />
              </label>

              <label>
                Data
                <input
                  type="date"
                  value={dataEdicao}
                  onChange={(event) => setDataEdicao(event.target.value)}
                  required
                />
              </label>

              <fieldset>
                <legend>Categoria</legend>
                <div className="categorias">
                  {["Comida", "Saúde", "Transporte", "Outros"].map(opcao => (
                    <label className="categoria-opcao" key={opcao}>
                      <input
                        type="radio"
                        name="categoria-edicao"
                        value={opcao}
                        checked={categoriaEdicao === opcao}
                        onChange={(event) => setCategoriaEdicao(event.target.value)}
                        required
                      />
                      {opcao}
                    </label>
                  ))}
                </div>
              </fieldset>

              <div className="acoes-edicao">
                <button
                  className="botao-cancelar"
                  type="button"
                  onClick={() => setPagamentoEmEdicao(null)}
                >
                  Cancelar
                </button>
                <button className="botao-salvar-edicao" type="submit">
                  Salvar alterações
                </button>
              </div>
            </form>
          </section>
        </div>
      )}

    </>
  )
}



export default Home
