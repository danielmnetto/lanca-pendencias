import {NextApiRequest, NextApiResponse} from 'next'

/**
 * API que busca a informação de uma pendência através do seu ID passado por parâmetro.
 * 
 * Este aceita apenas requisição HTTP `GET`.
 * @param {NextApiRequest} req Request
 * @param {NextApiResponse} res Response
 */
 export default function getPendenciaById(req, res) {
  if (req.method !== 'GET') {
    return res.sendStatus(500).end()
  }

  const { id } = req.query
  
  return res.status(200).json({
    id, descricao: 'Arrumar o front-end', prazo: '10 dias', data: '15/10/2021', horario: '10:00', responsavel: 'Daniel'
  }).end()
}