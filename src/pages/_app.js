import { useRouter } from 'next/router'
import React from 'react'
import Nav from '../components/Nav'
import '../styles/globals.css'

export default function MyApp({ Component, pageProps }) {
  const { asPath } = useRouter()

  const loadNav = asPath !== '/'

  return (
    <div>
      {loadNav && <Nav />}
      <Component {...pageProps} />
    </div>
  )
}