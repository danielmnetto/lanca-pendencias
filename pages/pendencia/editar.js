import Link from 'next/link'
import React from 'react'

export default function NovaPendencia () {

  const [descricao, setDescricao] = React.useState('')
  const [prazo, setPrazo] = React.useState('')
  const [data, setData] = React.useState('')
  const [horario, setHorario] = React.useState('')
  const [responsavel, setResponsavel] = React.useState('')

  async function submitForm () {
    const request = await fetch('/api/pendencia', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: {
        descricao,
        prazo,
        data,
        horario,
        responsavel
      }
    })

    const response = request.status

    if (response === 200) {
      alert('Sucesso!')
    } else {
      alert('Algo deu errado!' + response)
    }
  }

  return (
    <div>
        <h1>Editar pendência</h1>

        <h4>Pendência nº 0</h4>
        <form className='form'>
          <label htmlFor='p-descricao'>Descrição</label>
          <input
            type='text'
            name='p-descricao'
            value={descricao}
            onChange={(val) => setDescricao(val)}
          />
          <br />
          <label htmlFor='p-prazo'>Prazo</label>
          <input
            type='text'
            name='p-prazo'
            value={prazo}
            onChange={(val) => setPrazo(val)}
          />
          <br />
          <label htmlFor='p-data'>Data</label>
          <input
            type='date'
            name='p-data'
            value={data}
            onChange={(val) => setData(val)}
          />
          <br />
          <label htmlFor='p-horario'>Horário</label>
          <input
            type='time'
            name='p-horario'
            value={horario}
            onChange={(val) => setHorario(val)}
          />
          <br />
          <label htmlFor='p-responsavel'>Responsável</label>
          <select name='p-responsavel' >
            <option value='fulano'>Fulanos</option>
          </select>
          <br />
          <br />
          <input
            type='button'
            className='add'
            value='Salvar pendência'
            onClick={() => submitForm()}
          />
        </form>
    </div>
  )
}