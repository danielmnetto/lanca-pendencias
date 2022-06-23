import React from "react"
import Router from 'next/router'
import Cookies from "js-cookie"
import { api } from "../components/services/api"

export const AuthContext = React.createContext({})

export function AuthProvider({ children }) {

  const [usuario, setUsuario] = React.useState(null)

  const autenticado = !!usuario;

  /**
   * 
   * @param {String} usuario 
   * @param {String} senha 
   */
  async function signIn (usuario, senha) {
    try {
      const auth = await fetch('/api/session/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          usuario, senha
        })
      })
      
      if (auth.status === 200) {
        const { token, id, nome, usuario } = await auth.json()

        Cookies.set('lp._token', token, { expires: 1 })

        api.defaults.headers['Authorization'] = `Bearer ${token}`

        setUsuario({ id, nome, usuario })

        Router.push('/home')
      } else if (r.status === 401) {
        alert('Credenciais inválidas. Verifique se os campos estão corretos.')
      } else {
        alert('Ocorreu um erro. Tente novamente mais tarde!')
      }
        
    } catch (e) {
      alert('Ocorreu um erro. Tente novamente mais tarde!')
    }
  }

  React.useEffect(() => {
    const token = Cookies.get('lp._token')

    if (token) {
      fetch('/api/session/token', { 
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token })
      })
        .then((r) => r.json())
        .then((r) => setUsuario(r))
    }
  }, [])

  return (
    <AuthContext.Provider value={{ usuario, autenticado, signIn }}>
      {children}
    </AuthContext.Provider>
  )
}