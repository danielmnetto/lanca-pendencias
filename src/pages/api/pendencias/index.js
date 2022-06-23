import moment from 'moment-timezone'
import { NextApiRequest, NextApiResponse } from 'next'
import { prismaClient } from '../../../components/database/prismaClient'

/**
 * API que busca a informação de todos os usuários exceto informações confidenciais.
 * 
 * Este aceita apenas requisição HTTP `GET`.
 * @param {NextApiRequest} req Request
 * @param {NextApiResponse} res Response
 */
export default async function getPendencias(req, res) {
  try {
    if (req.method !== 'POST') return res.status(405).json(null)
    if (!req.body) return res.status(400).json(null)

    let { descricao, prazo, data, horario, responsavelId, autorId } = req.body
    const _horario = data + " " + horario
    
    prazo = moment.utc(prazo).format()
    data = moment.utc(data).format()
    horario = moment.utc(_horario).format()

    await prismaClient.pendencia.create({
      data: { 
        descricao, 
        prazo, 
        data, 
        horario, 
        responsavelId: Number.parseInt(responsavelId), 
        autorId: Number.parseInt(autorId) }
    })

    await prismaClient.$disconnect()
    return res.status(201).json(null)

  } catch (e) {
    console.log(e.message)
    return res.status(500).json(null)
  }
}