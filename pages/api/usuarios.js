import {NextApiRequest, NextApiResponse} from 'next'

/**
 * API que busca a informação de todos os usuários exceto informações confidenciais.
 * 
 * Este aceita apenas requisição HTTP `GET`.
 * @param {NextApiRequest} req Request
 * @param {NextApiResponse} res Response
 */
export default function getUsuarios(req, res) {
  if (req.method !== 'GET') {
    return res.sendStatus(500).end()
  }

  return res.status(200).json([
    {id, name: 'Daniel', user: 'daniel', password: '123'}
  ]).end()
}