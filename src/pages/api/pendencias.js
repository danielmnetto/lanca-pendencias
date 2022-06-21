import {NextApiRequest, NextApiResponse} from 'next'

/**
 * API que busca a informação de todos os usuários exceto informações confidenciais.
 * 
 * Este aceita apenas requisição HTTP `GET`.
 * @param {NextApiRequest} req Request
 * @param {NextApiResponse} res Response
 */
export default function getPendencias(req, res) {
  if (req.method !== 'GET') {
    return res.sendStatus(500).end()
  }

  return res.status(200).json([
    { id: 1, descricao: 'Arrumar o front-end', prazo: '10 dias', data: '15/10/2021', horario: '10:00', responsavel: 'Daniel' }
  ]).end()
}