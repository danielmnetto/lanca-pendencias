import * as jwt from "jsonwebtoken"
import jsCookie from 'js-cookie'
const JWT_KEY = ".Yv+XT7/2[WkLK6zt&Gb"

/**
 * API que assegura requisições de login.
 * @param {NextApiRequest} req Request
 * @param {NextApiResponse} res Response
 */
export default function (req, res) {
  if (!req.body) return res.sendStatus(400)
  if (req.method !== 'POST') return res.sendStatus(404)

  const { username, password } = req.body

  const token = jwt.sign({ username }, JWT_KEY, { expiresIn: '1h' })

  jsCookie.set('token', token)
  return res.status(200).json({token})
}