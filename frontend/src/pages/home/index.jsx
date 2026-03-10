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

  function totalPagamentos() {
    fetch("http://localhost:8080/payments/total")
      .then(response => response.json())
      .then(valorTotal => setTotal(valorTotal))
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

            <input
              type="radio"
              name="categoria"
              value="Comida"
              onChange={(e) => setCategoria(e.target.value)}
            /> Comida

            <input
              type="radio"
              name="categoria"
              value="Saúde"
              onChange={(e) => setCategoria(e.target.value)}
            /> Saúde

            <input
              type="radio"
              name="categoria"
              value="Transporte"
              onChange={(e) => setCategoria(e.target.value)}
            /> Transporte

            <input
              type="radio"
              name="categoria"
              value="Outros"
              onChange={(e) => setCategoria(e.target.value)}
            /> Outros

          </div>

          <button onClick={registrarPagamento}>
            Registrar
          </button>

        </div>
        <div className='registro'>
          <table>
            <thead>
              <tr>
                <th>Título</th>
                <th>Valor</th>
                <th>Data</th>
                <th>Categoria</th>
              </tr>
            </thead>

            <tbody>
              {pagamentos.map((p, index) => (
                <tr key={index}>
                  <td>{p.titulo}</td>
                  <td>R${p.valor}</td>
                  <td>{p.data}</td>
                  <td>{p.categoria}</td>
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
