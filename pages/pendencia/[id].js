import { useRouter } from "next/router"
import React from "react"

export default function Description() {
  const route = useRouter();

  const { id } = route.query
  const [descricao, setDescricao] = React.useState('')
  const [prazo, setPrazo] = React.useState('')
  const [data, setData] = React.useState('')
  const [horario, setHorario] = React.useState('')
  const [responsavel, setResponsavel] = React.useState('')

  return (
    <div>
      <div className="d-field">
        <p className="d-label">ID da pendência</p>
        <p className="d-value">{id}</p>
      </div>
      <div className="d-field">
        <p className="d-label">Descrição</p>
        <p className="d-value">{descricao}</p>
      </div>
      <div className="d-field">
        <p className="d-label">Prazo</p>
        <p className="d-value">{prazo}</p>
      </div>
      <div className="d-field">
        <p className="d-label">Data</p>
        <p className="d-value">{data}</p>
      </div>
      <div className="d-field">
        <p className="d-label">Horário</p>
        <p className="d-value">{horario}</p>
      </div>
      <div className="d-field">
        <p className="d-label">Responsável</p>
        <p className="d-value">{responsavel}</p>
      </div>
    </div>
  )
}