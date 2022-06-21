import Head from 'next/head'
import Link from 'next/link'
import '../styles/globals.css'
import '../styles/Home.css'
import { useRouter } from 'next/router'
import React from 'react'

export default function MyApp({ Component, pageProps }) {

  const route = useRouter()

  function endSession () {
    if (confirm('Tem certeza que deseja sair?')) {
      route.push('/login')
    }
  }

  return (
    <div>
      <Head>
        <div className="header">
          <h1>Lança-Pendências</h1>
          <div className="navbuttons">
            <h3>
              <Link href="/">
                <a>Início</a>
              </Link>
            </h3>
              &emsp;
              &emsp;
              &emsp;
            <h3>
              <a>Sair</a>
            </h3>
          </div>
        </div>
      </Head>

      <Component {...pageProps} />
    </div>
  )
}