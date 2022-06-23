import { NextApiRequest, NextApiResponse } from 'next'
import { prismaClient } from '../../../../components/database/prismaClient'

/**
 * API que busca a informação de todos os usuários exceto informações confidenciais.
 * 
 * Este aceita apenas requisição HTTP `GET`.
 * @param {NextApiRequest} req Request
 * @param {NextApiResponse} res Response
 */
export default async function (req, res) {
  try {
    if (req.method !== 'GET') return res.status(405).json(null)
    const { id } = req.query

    const pendencias = await prismaClient.pendencia.findFirst({
      where: { id: Number.parseInt(id) },
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
  } catch (e) {
    console.log(e.message)
    return res.status(500).json(null)
  }
}