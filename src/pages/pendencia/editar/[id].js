import React from 'react'
import Title from '../../../components/Title'
import moment from 'moment'
import { useRouter } from 'next/router'

export function getServerSideProps (context) {
  return {
    props: {
      pendenciaId: context.query.id
    }
  }
}

export default function editarPendencia (props) {

  const route = useRouter()

  const { pendenciaId } = props
  const [descricao, setDescricao] = React.useState('')
  const [prazo, setPrazo] = React.useState('')
  const [data, setData] = React.useState('')
  const [horario, setHorario] = React.useState('')
  const [responsavelId, setResponsavel] = React.useState('')
  const [usuarios, setUsuarios] = React.useState([])

  const [loading, setLoading] = React.useState(true)

  async function submitForm () {
    let message = null
    if (!responsavelId) message = "Insira um responsável."
    if (horario === "") message = "Insira um horário."
    if (data === "") message = "Insira uma data."
    if (prazo === "") message = "Insira um prazo."
    if (descricao === "") message = "Insira uma descrição."

    if (message !== null) {
      alert(message)
      return
    }

    const req = await fetch(`/api/pendencias/${pendenciaId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        descricao,
        prazo,
        data,
        horario,
        responsavelId
      })
    })

    if (req.ok) {
      alert('A pendência foi alterada com sucesso.')
      route.replace('/home')
    } else {
      alert('Deu errado!')
    }
  }

  async function handleImports () {
    async function importPendencia () {
      const req = await fetch(`/api/pendencias/info/${pendenciaId}`, { method: 'GET' })
      if (req.ok) {
        const res = await req.json()

        setDescricao(res.descricao)
        setPrazo(moment.utc(res.prazo).format('YYYY-MM-DD'))
        setData(moment.utc(res.data).format('YYYY-MM-DD'))
        setHorario(moment.utc(res.horario).format('HH:mm'))
        setResponsavel(res.responsavel.id)
      }
    }

    async function importUsuarios () {
      const req = await fetch('/api/usuarios', { method: 'GET' })
      if (req.ok) {
        const res = await req.json()
        setUsuarios(res)
      }
    }

    await importPendencia()
    await importUsuarios()
    setLoading(false)
  }

  React.useEffect(() => {
    handleImports()
  }, [pendenciaId])

  if (loading) {
    return (
      <div className='container'>
        <h1>Carregando informações...</h1>
      </div>
    )
  }

  return (
    <div className='container'>
      <div>
        <Title>
          Editar Pendência nº {pendenciaId}
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
          {usuarios.length > 0 && <select value={responsavelId} onChange={(val) => setResponsavel(val.target.value)}>
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
            value='Salvar alterações da pendência'
            onClick={() => submitForm()}
          />
        </form>
      </div>
    </div>
  )
}