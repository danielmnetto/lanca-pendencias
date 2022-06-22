import React from 'react'
import Title from '../components/Title'
import Link from 'next/link'
import { useRouter } from 'next/router'

export default function Home() {
  
  const router = useRouter()

  const [usuario, setUsuario] = React.useState('')
  const [senha, setSenha] = React.useState('')

  function goToHomePage () {
    router.push('/home')
  }

  function submitForm () {
    try {
      fetch('/api/session/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ usuario, senha })
      }).then((res) => {
        if (res.status === 200) {
          goToHomePage()
        } else if (res.status === 401) {
          alert('Credenciais inválidas. Verifique se os campos estão corretos.')
        } else {
          alert('Ocorreu um erro. Tente novamente mais tarde!')
        }
      })

    } catch (e) {
      alert('Ocorreu um erro. Tente novamente mais tarde!')
    }
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
