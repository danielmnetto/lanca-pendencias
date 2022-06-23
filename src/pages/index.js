import React from 'react'
import Title from '../components/Title'
import Link from 'next/link'
import { UserContext } from '../components/contexts/UserContext'

export default function Login() {

  const [usuario, setUsuario] = React.useState('')
  const [senha, setSenha] = React.useState('')

  const { signIn } = React.useContext(UserContext)

  async function handleSubmitForm() {
    let message = null
    if (senha === '') message = 'Insira a senha.'
    if (usuario === '') message = 'Insira o nome de usuário.'

    if (message) {
      alert(message)
      return
    }

    await signIn(usuario, senha)
  }

  return (
    <div className='container'>
      <Title>
        Acesse sua conta
      </Title>

      <form autoComplete='off'>
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
        <input
          type='button'
          value='Acessar'
          onClick={() => handleSubmitForm()}
        />
      </form>
      <br />
      <br />
      <Link href='/cadastrar'>
        <a>Não tem uma conta? Cadastre-se já!</a>
      </Link>

    </div>
  )
}
