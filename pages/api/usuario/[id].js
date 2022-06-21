import {NextApiRequest, NextApiResponse} from 'next'

/**
 * API que busca a informação de um usuário através do seu ID passado por parâmetro.
 * 
 * Este aceita apenas requisição HTTP `GET`.
 * @param {NextApiRequest} req Request
 * @param {NextApiResponse} res Response
 */
 export default function getUsuarioById(req, res) {
  if (req.method !== 'GET') {
    return res.sendStatus(500).end()
  }

  const { id } = req.query

  return res.status(200).json({
    id, name: 'Daniel', user: 'daniel', password: '123'
  }).end()
}