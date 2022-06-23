import React from "react"
import { useRouter } from "next/router"
import { UserContext } from "../components/contexts/UserContext"
import moment from "moment"

export default function Home() {

  const route = useRouter()

  const { usuario } = React.useContext(UserContext)

  const [listaPendencias, setListaPendencias] = React.useState([])

  /**
   * Exclui uma pendência
   * @param {number} id ID da pendência
   */
  function deletePedencia (id) {
    if (confirm('Tem certeza que deseja excluir esta pendência? Essa ação não poderá ser desfeita!')) {
      fetch(`/api/pendencias/${id}`, { method: 'DELETE' })
        .then((r) => {
          if (r.status === 200) {
            alert('Pendência excluída com sucesso!')
          } else {
            alert('Ocorreu um erro ao excluir a pendência.')
          }
        })
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

  React.useEffect(() => {
    async function loadPendencias () {
      try {
        // fetch(`/api/pendencias/${usuario.id}`, { method: 'GET' })
        //   .then(res => res.json())
        //   .then(res => {
        //     res.forEach(pendencia => {
        //       pendencia.prazo = moment.utc(pendencia.prazo).format('DD/MM/YYYY')
        //       pendencia.data = moment.utc(pendencia.data).format('DD/MM/YYYY')
        //       pendencia.horario = moment.utc(pendencia.horario).format('HH:mm')
        //     })
            
        //     setListaPendencias(res)
        //   })
        // }

        const req = await fetch(`/api/pendencias/${usuario.id}`, { method: 'GET' })

        if (req.ok) {
          const res = await req.json()
          res.forEach(pendencia => {
            pendencia.prazo = moment.utc(pendencia.prazo).format('DD/MM/YYYY')
            pendencia.data = moment.utc(pendencia.data).format('DD/MM/YYYY')
            pendencia.horario = moment.utc(pendencia.horario).format('HH:mm')
          })
          
          setListaPendencias(res)
        }
    
        
      } catch (error) {
        console.log(error)
      }
    }
    
    loadPendencias()
  }, [usuario])

  return (
    <div className="container">
      <h1>Olá, {usuario?.nome}.</h1>
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
              <th>Autor</th>
              <th>Ações</th>
            </tr>
          </thead>

          {listaPendencias.length > 0 && <tbody>
            {listaPendencias.map((pendencia, index) => (
              <tr key={`r_${index}`}>
                <td>{pendencia.id}</td>
                <td>{pendencia.descricao}</td>
                <td>{pendencia.prazo}</td>
                <td>{pendencia.data}</td>
                <td>{pendencia.horario}</td>
                <td>{pendencia.responsavel.nome}</td>
                <td>{pendencia.autor.nome}</td>
                <td>
                  {usuario.id === pendencia.autor.id && <div className="action-buttons">
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
                      onClick={() => deletePedencia(pendencia.id)} 
                      />
                  </div>}
                </td>
              </tr>
            ))}
          </tbody>}
        </table>
      </div>
    </div>
  )
}