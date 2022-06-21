import React from 'react'
import jsCookie from 'js-cookie'
import Title from '../components/Title'
import { useRouter } from 'next/router'

export default function Home() {
  
  const router = useRouter()

  const [username, setUsername] = React.useState('')
  const [password, setPassword] = React.useState('')

  const [errMessage, setErrMessage] = React.useState('')

  function goToHomePage () {
    router.push('/home')
  }

  /**
   * Envia o formulário para API de login
   */
  async function submitLoginForm () {
    const request = await fetch('/api/session/auth', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username, password
      })
    })

    const { status } = request
    const response = request.json()

    if (status === 200) {
      jsCookie.set('token', response.token)
      goToHomePage()
    } else {
      alert('Ocorreu um erro. Tente novamente mais tarde!')
    }
  }

  return (
    <div className='container'>
      <Title>
        Acesse sua conta
      </Title>

      <form autoComplete='off' action='/api/login' method='post'>
        <label htmlFor='user'>Usuário</label>
        <input 
          type='text' 
          name='user' 
          value={username} 
          onChange={(val) => setUsername(val.target.value)} 
        />
        <br />
        <label htmlFor='passwd'>Senha</label>
        <input 
          type='password' 
          name='passwd'
          value={password} 
          onChange={(val) => setPassword(val.target.value)} 
        />
        <br />
        <input 
          type='button' 
          value='Acessar' 
          onClick={() => submitLoginForm()} 
        />
      </form>
    </div>
  )
}
