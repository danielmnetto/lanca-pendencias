import React from 'react'
import Title from '../components/Title'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { AuthContext } from '../contexts/AuthContext'

export default function Login() {

  const route = useRouter()

  const { signIn } = React.useContext(AuthContext)

  const [usuario, setUsuario] = React.useState('')
  const [senha, setSenha] = React.useState('')

  function submitForm () {
    signIn(usuario, senha)
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
          onClick={() => submitForm()} 
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
