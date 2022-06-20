import Head from 'next/head'
import Link from 'next/link'
import '../styles/globals.css'
import '../styles/Home.css'

function MyApp({ Component, pageProps }) {
  return (
    <div>
      <Head>
        <div className="header">
          <h1>Lança-Pendências</h1>
          <div className="navbuttons">
            <h3>Início</h3>
            &emsp;
            <Link href='/'>
              <h3>Sair</h3>
            </Link>
          </div>
        </div>
      </Head>

      <Component {...pageProps} />
    </div>
  )
}

export default MyApp
