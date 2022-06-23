import React from "react"
import moment from "moment"
import { useRouter } from "next/router"
import { AuthContext } from "../contexts/AuthContext"
import Cookies from "js-cookie"

export function getServerSideProps (ctx) {
  const { ["lp._token"]: token } = ctx.req.cookies
  
  if (!token) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }

  return {
    props: {}
  }
}

export default function Home() {

  const route = useRouter()

  const { usuario } = React.useContext(AuthContext)

  const [listaPendencias, setListaPendencias] = React.useState([])

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

  React.useEffect(() => {
    function loadPendencias () {
      fetch('/api/pendencias/1', { method: 'GET' })
      .then((res) => res.json())
      .then((res) => {
        try {
          res.forEach(pendencia => {
            let prazo = pendencia.prazo
            let data = pendencia.data
            let horario = pendencia.horario

            let _prazo = moment.utc(prazo).format('DD/MM/YYYY')
            let _data = moment.utc(data).format('DD/MM/YYYY')
            let _horario = moment.utc(horario).format('HH:mm')

            pendencia.prazo = _prazo
            pendencia.data = _data
            pendencia.horario = _horario
          });
          setListaPendencias(res)
        } catch (e) {
          setListaPendencias([])
          alert('Ocorreu um erro ao carregar as informações. Atualize a página mais tarde.')
        }
      })
    }

    // Autentica token
    function tokenAuth() {
      const token = Cookies.get('lp._token')
      fetch('/api/session/token', { method: 'POST' })
        .then((r) => {
          if (r.status === 401 || r.status === 500) {
            route.replace('/')
          }
        })
    }
    tokenAuth()
    loadPendencias()
  }, [])

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
                <td>
                  <div className="action-buttons">

                  </div>
                  {/* <input 
                    className="details" 
                    type='button' 
                    value='Detalhes' 
                    onClick={() => goToPendencia(1)} 
                    /> */}
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