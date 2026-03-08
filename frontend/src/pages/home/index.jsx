import './style.css'
import { useState } from "react"



function Home() {

  const [pagamentos, setPagamentos] = useState([
    {
      titulo: "Almoço",
      valor: 25,
      data: "2026-03-07",
      categoria: "Comida"
    },
    {
      titulo: "Uber",
      valor: 18,
      data: "2026-03-06",
      categoria: "Transporte"
    }
    
  ])
  return (
    <>
      <div className="cabecalho">
        <h1>Payment Manager</h1>
        <p>Bem-vindo ao sistema de gerenciamento de pagamentos.</p>
      </div>

      <div className='operacao'>
        <div className='formulario'>
          <input type="text" placeholder='Titulo' />
          <input type="number" placeholder='Valor' />
          <input type="date" placeholder='Data' />
          <div className='categorias'>  
            <input type="radio" name="categoria" value="Comida" /> Comida
            <input type="radio" name="categoria" value="Transporte" /> Transporte
            <input type="radio" name="categoria" value="Lazer" /> Lazer
            <input type="radio" name="categoria" value="Saúde" /> Saúde
            <input type="radio" name="categoria" value="Outros" /> Outros
          </div>
          
          <button>Registrar</button>
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
