import Cookies from "js-cookie";
import Router from "next/router";
import React from "react";

export const UserContext = React.createContext({})

export function UserProvider({ children }) {

  const [ usuarioId, setUsuarioId ] = React.useState('')
  const [ usuarioNome, setUsuarioNome ] = React.useState('')
  const [ usuarioUser, setUsuarioUser ] = React.useState('')

  /**
   * Gerencia a verificação das credenciais (usuário e senha)
   * e envia o usuário para a próxima página se a verificação
   * se suceder.
   * @param {String} usuario Nome de usuário
   * @param {String} senha Senha do usuário
   */
   async function signIn(usuario, senha) {
    try {
      const auth = await fetch('/api/session/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ usuario, senha })
      })

      if (auth.ok) {
        const { token, id, nome, usuario } = await auth.json()

        Cookies.set('lp._token', token, { expires: 1 })

        setUsuarioId(id)
        setUsuarioNome(nome)
        setUsuarioUser(usuario)

        Router.replace('/home', 'home')
      } else if (auth.status === 401) {
        alert('Credenciais inválidas. Verifique se os campos estão corretos.')
      } else {
        alert('Ocorreu um erro. Tente novamente mais tarde!')
      }
    } catch (e) {
      console.log(e)
      alert('Ocorreu um erro. Contate o administrador sobre este problema!')
    }
  }

  React.useEffect(() => {
    async function token() {

      const token = Cookies.get('lp._token')

      const req = await fetch('/api/session/token', { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ token })
      })
      
      if (req.ok) {
        const token = await req.json()
        setUsuarioId(token.id)
        setUsuarioNome(token.nome)
        setUsuarioUser(token.usuario)
      }
    }

    token()
  }, [])

  return (
    <UserContext.Provider value={ { usuario: { id: usuarioId, nome: usuarioNome, usuario: usuarioUser }, signIn } }>
      {children}
    </UserContext.Provider>
  )
}