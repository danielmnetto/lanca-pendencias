import React from 'react'
import styles from '../styles/Home.module.css'
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
    const request = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username, password
      })
    })

    const response = request.json()

    if (response) {
      goToHomePage()
    }
  }

  return (
    <div className={styles.container}>
      <div> 
        <h1>Login</h1>
      </div>

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
          onClick={submitLoginForm} 
        />
      </form>
    </div>
  )
}
