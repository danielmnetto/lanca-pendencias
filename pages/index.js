import React from "react"
import { useRouter } from "next/router"

export default function Home() {

  const route = useRouter()

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
    <div className="body">
      <div className="listaPendencias">
        <div>
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

          <tbody>
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td>
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
          </tbody>
        </table>
      </div>
    </div>
  )
}