import React from "react"
import { useRouter } from "next/router"

export default function Home() {

  const route = useRouter()

  const [listaPendencias, setListaPendencias] = React.useState([
    {id: 1, descricao: 'Teste', prazo: '10 dias', data: '12/10/2022', horario: '10:00', responsavel: 'Daniel'},
    {id: 1, descricao: 'Teste', prazo: '10 dias', data: '12/10/2022', horario: '10:00', responsavel: 'Daniel'},
  ])

  /**
   * Exclui uma pendência
   * @param {number} id ID da pendência
   */
  function deletePedencia (id) {
    if (confirm('Tem certeza que deseja excluir esta pendência? Essa ação não poderá ser desfeita!')) {
      alert('Excluído com sucesso!')
    }
  }

  /**
   * Redireciona para a página de formulário de 'Nova pendência'
   */
  function goToNovaPendencia () {
    route.push('/pendencia/novo')
  }

  /**
   * Redireciona para a página de formulário de 'Editar pendência'
   */
  function editPendencia () {
    route.push('/pendencia/editar')
  }

  /**
   * Redireciona para a página de detalhes sobre uma pendência
   * @param {number} id ID da pendência
   */
  function goToPendencia (id) {
    route.push(`/pendencia/${id}`)
  }

  return (
    <div className="container">
      <div className="listaPendencias">
        <div className="home-add">
          <input 
            type='button' 
            className='home-add'
            value='Nova pendência'
            onClick={() => goToNovaPendencia()} 
          />
        </div>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Descrição</th>
              <th>Prazo</th>
              <th>Data</th>
              <th>Horário</th>
              <th>Responsável</th>
              <th>Ações</th>
            </tr>
          </thead>

          {listaPendencias.length > 0 && <tbody>
            {listaPendencias.map((pendencia, index) => (
              <tr>
                <td>{pendencia.id}</td>
                <td>{pendencia.descricao}</td>
                <td>{pendencia.prazo}</td>
                <td>{pendencia.data}</td>
                <td>{pendencia.horario}</td>
                <td>{pendencia.responsavel}</td>
                <td>
                  <div className="action-buttons">

                  </div>
                  <input 
                    className="details" 
                    type='button' 
                    value='Detalhes' 
                    onClick={() => goToPendencia(1)} 
                    />
                  <input 
                    className="edit" 
                    type='button' 
                    value='Editar' 
                    onClick={() => editPendencia()} 
                    />
                  <input 
                    className="delete" 
                    type='button' 
                    value='Excluir' 
                    onClick={() => deletePedencia(1)} 
                  />
                </td>
              </tr>
            ))}
          </tbody>}
        </table>
      </div>
    </div>
  )
}