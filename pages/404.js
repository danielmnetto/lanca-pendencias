import Link from "next/link";

export default function PageNotFound() {
  return (
    <div className="404body">
      <h1>[ -- 404 -- ]</h1>
      <h4>Parece que não há nada aqui.<br />Que tal voltar para o início?</h4>
      <br />
      <br />
      <Link href='/'>
        <a>Voltar ao início</a>
      </Link>
    </div>
  )
}