import jwt from 'jsonwebtoken'
import { NextApiRequest, NextApiResponse } from 'next'

const JWT_KEY = ".Yv+XT7/2[WkLK6zt&Gb"

/**
 * API utilizado para verificar a autenticação e validade de um token.
 * @param {NextApiRequest} req Request
 * @param {NextApiResponse} res Response
 */
export default function Token(req, res) {
  try {
    if (req.method !== 'POST') return res.status(405).json(null)
    if (!req.body) return res.status(400).json(null)

    const { token } = req.body

    jwt.verify(token, JWT_KEY, function(error, decoded) {
      if (error) {
        console.log(error.message)
        return res.status(401).json(null)
      }

      return res.status(200).json(decoded)
    })
  } catch (error) {
    return res.status(500).json(null)
  }
}