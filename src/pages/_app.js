import '../styles/globals.css'
import React from 'react'
import Nav from '../components/Nav'
import { useRouter } from 'next/router'
import { AuthProvider } from '../contexts/AuthContext'

export default function MyApp({ Component, pageProps }) {
  const { asPath } = useRouter()

  const loadNav = asPath !== '/' && asPath !== '/cadastrar'

  return (
    <AuthProvider>
      <div>
        {loadNav && <Nav />}
        <Component {...pageProps} />
      </div>
    </AuthProvider>
  )
}