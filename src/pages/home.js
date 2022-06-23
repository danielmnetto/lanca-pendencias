import React from "react"
import moment from "moment"
import Link from "next/link"
import { useRouter } from "next/router"
import { UserContext } from "../components/contexts/UserContext"

export default function Home() {

  const route = useRouter()

  const { usuario } = React.useContext(UserContext)

  const [loading, setLoading] = React.useState(true)
  const [listaPendencias, setListaPendencias] = React.useState([])

  /**
   * Exclui uma pendência
   * @param {number} id ID da pendência
   */
  function requestDeletePendencia (id) {
    async function deletePendencia (id) {
      const req = await fetch(`/api/pendencias/${id}`, { method: 'DELETE' })
      if (req.ok) {
        alert('Pendência excluída com sucesso!')
        route.reload(window.location.pathname)
      } else {
        alert('Ocorreu um erro ao excluir a pendência.')
      }
    }

    if (confirm('Tem certeza que deseja excluir esta pendência? Essa ação não poderá ser desfeita!')) {
      deletePendencia(id)
    }
  }

  /**
   * Redireciona para a página de formulário de 'Nova pendência'
   */
  function goToNovaPendencia () {
    route.push('/pendencia/novo')
  }

  async function handleImports () {
    async function loadPendencias () {
      const req = await fetch(`/api/pendencias/${usuario?.id}`, { method: 'GET' })

      if (req.ok) {
        const res = await req.json()
        res.forEach(pendencia => {
          pendencia.prazo = moment.utc(pendencia.prazo).format('DD/MM/YYYY')
          pendencia.data = moment.utc(pendencia.data).format('DD/MM/YYYY')
          pendencia.horario = moment.utc(pendencia.horario).format('HH:mm')
        })

        res.sort(function(a, b) {
          return Number.parseInt(b.id) - Number.parseInt(a.id)
        });
        
        setListaPendencias(res)
      }
    }

    await loadPendencias()
    setLoading(false)
  }

  React.useEffect(() => {
    handleImports()
  }, [usuario])

  if (loading) {
    return (
      <div className="container">
        <h1>Carregando informações...</h1>
      </div>
    )
  }

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
        {listaPendencias.length > 0 && <table>
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

           <tbody>
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
                    <Link href={{ pathname: '/pendencia/editar/[id]', query: { id: pendencia.id } }}>
                      <input 
                        className="edit" 
                        type='button' 
                        value='Editar' 
                        />
                    </Link>

                    <input 
                      className="delete" 
                      type='button' 
                      value='Excluir' 
                      onClick={() => requestDeletePendencia(pendencia.id)}
                      />
                  </div>}
                </td>
              </tr>
            ))}
          </tbody>
        </table> || <h3>Não há pendencias para mostrar.</h3>}
      </div>
    </div>
  )
}