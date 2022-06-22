import React from "react"
import { useRouter } from 'next/router'
import Title from "../components/Title"

export default function Cadastrar () {

  const route = useRouter()

  const [nome, setNome] = React.useState('')
  const [usuario, setUsuario] = React.useState('')
  const [senha, setSenha] = React.useState('')
  const [confirmarSenha, setConfirmarSenha] = React.useState('')

  function submitForm () {
    let message = ''
    if (confirmarSenha === '') message = 'Confirme sua senha.'
    if (senha === '') message = 'Insira uma senha.'
    if (usuario === '') message = 'Insira um nome de usuário.'
    if (nome === '') message = 'Insira seu nome completo.'
    if (senha !== confirmarSenha) message = 'As senhas não conferem'

    if (message !== '') {
      alert(message)
      return
    }

    fetch('/api/usuarios', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ nome, usuario, senha })
    })
      .then((res) => {
        if (res.status === 201) {
          alert('Cadastrado com sucesso! Utilize as mesmas credencias para acessar.')
          route.push('/')
        } else {
          alert('Ocorreu um erro ao cadastrar. Tente novamente mais tarde')
        }
      })
  }

  return (
    <div className='container'>
      <Title>
        Cadastre-se
      </Title>

      <form autoComplete='off'>
        <label htmlFor='nome-completo'>Nome completo</label>
        <input 
          type='text' 
          name='nome-completo' 
          value={nome} 
          onChange={(val) => setNome(val.target.value)} 
        />
        <br />
        <label htmlFor='user'>Usuário</label>
        <input 
          type='text' 
          name='user' 
          value={usuario} 
          onChange={(val) => setUsuario(val.target.value)} 
        />
        <br />
        <label htmlFor='passwd'>Senha</label>
        <input 
          type='password' 
          name='passwd'
          value={senha} 
          onChange={(val) => setSenha(val.target.value)} 
        />
        <br />
        <label htmlFor='confirm-passwd'>Confirmar senha</label>
        <input 
          type='password' 
          name='confirm-passwd'
          value={confirmarSenha} 
          onChange={(val) => setConfirmarSenha(val.target.value)} 
        />
        <br />
        <input 
          type='button' 
          value='Cadastrar' 
          onClick={() => submitForm()} 
        />
      </form>
    </div>
  )
}