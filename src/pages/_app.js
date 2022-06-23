import '../styles/globals.css'
import React from 'react'
import Nav from '../components/Nav'
import { useRouter } from 'next/router'
import { UserProvider } from '../components/contexts/UserContext'

export function getServerSideProps (context) {
  const token = context.req.headers.cookies

  if (!token) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }

  return {
    props: {}
  }
}

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