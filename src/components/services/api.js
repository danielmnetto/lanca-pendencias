import axios from 'axios'
import Cookies from 'js-cookie'

const token = Cookies.get('lp._token')

export const api = axios.create({
  baseURL: "http://localhost:3000"
})

if (token) {
  api.defaults.headers['Authorization'] = `Bearer ${token}`
}