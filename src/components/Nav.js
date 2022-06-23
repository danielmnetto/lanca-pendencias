import Cookies from "js-cookie";
import { useRouter } from 'next/router'

export default function Nav () {

  const route = useRouter()

  function goToHome() {
    route.push('/home')
  }

  function goToLogin() {
    if (confirm('Tem certeza que deseja sair de sua sessão?')) {
      Cookies.remove('lp._token')
      route.push('/')
    }
  }

  return (
    <nav>
      <h1>Lança-Pendências</h1>
      <div className="navbuttons">
        <input 
          type="button"
          className="nav"
          value='Início'
          onClick={() => goToHome()} />

          &emsp;
          &emsp;
          &emsp;

        <input 
          type="button"
          className="nav"
          value='Sair'
          onClick={() => goToLogin()} />
      </div>
    </nav>
  )
}