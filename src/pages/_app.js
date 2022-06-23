import '../styles/globals.css'
import React from 'react'
import Nav from '../components/Nav'
import { useRouter } from 'next/router'
import { UserProvider } from '../components/contexts/UserContext'

export default function MyApp({ Component, pageProps }) {
  const { asPath } = useRouter()

  const loadNav = asPath !== '/' && asPath !== '/cadastrar'

  return (
    <UserProvider>
      <div>
        {loadNav && <Nav />}
        <Component {...pageProps} />
      </div>
    </UserProvider>
  )
}