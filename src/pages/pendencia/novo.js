import React from 'react'
import Title from '../../components/Title'
import { useRouter } from 'next/router'
import { UserContext } from '../../components/contexts/UserContext'

export default function NovaPendencia () {

  const route = useRouter()

  const { usuario } = React.useContext(UserContext)

  const [descricao, setDescricao] = React.useState('')
  const [prazo, setPrazo] = React.useState('')
  const [data, setData] = React.useState('')
  const [horario, setHorario] = React.useState('')
  const [responsavel, setResponsavel] = React.useState('')
  const [usuarios, setUsuarios] = React.useState([])

  function submitForm () {
    let message = null
    if (!responsavel) message = "Insira um responsável."
    if (horario === "") message = "Insira um horário."
    if (data === "") message = "Insira uma data."
    if (prazo === "") message = "Insira um prazo."
    if (descricao === "") message = "Insira uma descrição."

    if (message !== null) {
      alert(message)
      return
    }

    fetch('/api/pendencias', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        descricao,
        prazo,
        data,
        horario,
        responsavelId: responsavel,
        autorId: usuario.id
      })
    }).then((res) => {
      if (res.status === 201) {
        alert('A pendência foi criada com sucesso.')
        route.replace('/home')
      } else {
        alert('Deu errado!')
      }
    })
  }

  React.useEffect(() => {
    function loadUsuarios () {
      fetch('/api/usuarios', { method: 'GET' })
        .then((res) => res.json())
        .then((res) => setUsuarios(res))
    }

    loadUsuarios()
  }, [])

  return (
    <div className='container'>
      <div>
        <Title>
          Nova Pendência
        </Title>

        <form className='form'>
          <label htmlFor='p-descricao'>Descrição</label>
          <textarea 
            required
            name='p-descricao' 
            rows={4}
            cols={50}
            value={descricao}
            onChange={(val) => setDescricao(val.target.value)}
          ></textarea>
          <br />
          <label htmlFor='p-prazo'>Prazo</label>
          <input
            required
            type='date'
            name='p-prazo'
            value={prazo}
            onChange={(val) => setPrazo(val.target.value)}
          />
          <br />
          <label htmlFor='p-data'>Data</label>
          <input
            required
            type='date'
            name='p-data'
            value={data}
            onChange={(val) => setData(val.target.value)}
          />
          <br />
          <label htmlFor='p-horario'>Horário</label>
          <input
            required
            type='time'
            name='p-horario'
            value={horario}
            onChange={(val) => setHorario(val.target.value)}
          />
          <br />

          <label>Responsável</label>
          {usuarios.length > 0 && <select value={responsavel} onChange={(val) => setResponsavel(val.target.value)}>
            <option value="" disabled>Selecione um responsável...</option>
            {usuarios.map((value) => (
              <option key={value.id} value={value.id}>{value.nome}</option>
            ))}
          </select> || <h4>Carregando...</h4>}

          <br />
          <br />
          <input
            required
            type='button'
            className='add'
            value='Criar nova pendência'
            onClick={() => submitForm()}
          />
        </form>
      </div>
    </div>
  )
}