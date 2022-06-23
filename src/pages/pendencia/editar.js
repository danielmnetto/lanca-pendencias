import Link from 'next/link'
import React from 'react'

export default function NovaPendencia () {

  const [descricao, setDescricao] = React.useState('')
  const [prazo, setPrazo] = React.useState('')
  const [data, setData] = React.useState('')
  const [horario, setHorario] = React.useState('')
  const [responsavel, setResponsavel] = React.useState('')

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
        responsavelId: Number.parseInt(responsavel),
        autorId: Number.parseInt('1')
      })
    }).then((res) => {
      if (res.status === 201) {
        alert('Sucesso!')
      } else {
        alert('Deu errado!')
      }
    })
  }

  return (
    <div className='container'>
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