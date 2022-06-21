import Link from "next/link";

/**
 * Página que aparece quando a requisição sobre uma página 
 * retorna 404 (página não encontrada)
 */
export default function PageNotFound() {
  return (
    <div className="container">
      <div className="message">
        <h1>[ 404 ]</h1>
        <br />
        <h4>Parece que o você procura não está aqui.</h4>
        <br />
        <br />
        <Link href='/home'>
          <a>Voltar ao início</a>
        </Link>
      </div>
    </div>
  )
}