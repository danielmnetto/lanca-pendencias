import '../styles/globals.css'
import React from 'react'
import Nav from '../components/Nav'
import { useRouter } from 'next/router'
import Cookies from 'js-cookie'

export default function MyApp({ Component, pageProps }) {
  const { asPath } = useRouter()

  const loadNav = asPath !== '/' && asPath !== '/cadastrar'

  React.useEffect(() => {
    if (loadNav) {
      fetch('/api/session/token', { method: 'POST' })
        .then((r) => {
          if (r.status === 401) {
            
          }
        })
    }
  }, [])

  return (
    <div>
      {loadNav && <Nav />}
      <Component {...pageProps} />
    </div>
  )
}