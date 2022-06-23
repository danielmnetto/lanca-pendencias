import moment from 'moment'
import { NextApiRequest, NextApiResponse } from 'next'
import { prismaClient } from '../../../components/database/prismaClient'

/**
 * API que busca a informação de todos os usuários exceto informações confidenciais.
 * 
 * Este aceita apenas requisição HTTP `GET`.
 * @param {NextApiRequest} req Request
 * @param {NextApiResponse} res Response
 */
export default async function (req, res) {
  try {
    if (req.method === 'GET') {
      const { id } = req.query

      const pendencias = await prismaClient.pendencia.findMany({
        where: {
          OR: [
            { autorId: Number.parseInt(id) },
            { responsavelId: Number.parseInt(id) }
          ]
        },
        select: {
          id: true,
          descricao: true,
          prazo: true,
          data: true,
          horario: true,
          responsavel: {
            select: {
              id: true,
              nome: true,
              usuario: true
            },
          },
          autor: {
            select: {
              id: true,
              nome: true,
              usuario: true
            }
          }
        },
      })

      await prismaClient.$disconnect()
      return res.status(200).json(pendencias)

    } else if (req.method === 'PATCH') {

      const { id } = req.query
      const { descricao, prazo, data, horario, responsavelId } = req.body

      const _horario = data + " " + horario

      await prismaClient.pendencia.update({
        data: { 
          descricao, 
          prazo: moment.utc(prazo).format(), 
          data: moment.utc(data).format(), 
          horario: moment.utc(_horario).format(), 
          responsavelId: Number.parseInt(responsavelId) },
        where: { id: Number.parseInt(id) }
      })

      await prismaClient.$disconnect()
      return res.status(200).json(null)

    } else if (req.method === 'DELETE') {

      const { id } = req.query

      await prismaClient.pendencia.delete({
        where: { id: Number.parseInt(id) }
      })

      await prismaClient.$disconnect()
      return res.status(200).json(null)

    } else {
      return res.status(405).json(null)
    }
  } catch (e) {
    return res.status(500).json(null)
  }
}