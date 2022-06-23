import '../styles/globals.css'
import React from 'react'
import Nav from '../components/Nav'
import { useRouter } from 'next/router'
import { UserProvider } from '../components/contexts/UserContext'
import Cookies from 'js-cookie'

export default function MyApp({ Component, pageProps }) {
  const route = useRouter()

  const [loading, setLoading] = React.useState(true)

  const isNotSignInUpPaths = route.asPath !== '/' && route.asPath !== '/cadastrar'

  React.useEffect(() => {
    const token = Cookies.get('lp._token')

    if (!token && isNotSignInUpPaths) {
      route.replace('/')
    }

    setLoading(false)
  }, [])

  if (loading) {
    return (
      <div className='container'>
        <h1>Carregando...</h1>
      </div>
    )
  }

  return (
    <UserProvider>
      <div>
        {isNotSignInUpPaths && <Nav />}
        <Component {...pageProps} />
      </div>
    </UserProvider>
  )
}