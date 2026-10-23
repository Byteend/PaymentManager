import './style.css'
import { useState, useEffect } from "react"



function Home() {

  const [pagamentos, setPagamentos] = useState([])
  const [total, setTotal] = useState(0)

  useEffect(() => {
    fetch("http://localhost:8080/payments")
      .then(response => response.json())
      .then(data => setPagamentos(data))

    totalPagamentos();
  }, [])

  const [titulo, setTitulo] = useState("")
  const [valor, setValor] = useState("")
  const [data, setData] = useState("")
  const [categoria, setCategoria] = useState("")

  function registrarPagamento() {

    const pagamento = {
      titulo,
      valor: parseFloat(valor),
      data,
      categoria
    }

    fetch("http://localhost:8080/payments", {
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
      const response = await fetch(`http://localhost:8080/payments/${id}`, {
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

  function totalPagamentos() {
    fetch("http://localhost:8080/payments/total")
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
                    <button onClick={() => deletarPagamento(p.id)}>Deletar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>


    </>
  )
}



export default Home
