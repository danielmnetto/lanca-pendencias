import { NextApiRequest, NextApiResponse } from 'next'
import { prismaClient } from '../../../components/database/prismaClient'

/**
 * API que busca a informação de um usuário através do seu ID passado por parâmetro.
 * 
 * Este aceita apenas requisição HTTP `GET`.
 * @param {NextApiRequest} req Request
 * @param {NextApiResponse} res Response
 */
export default async function getUsuarioById(req, res) {
  try {
    if (req.method !== 'GET') return res.status(405).json(null)
    if (!req.query) return res.status(400).json(null)

    const { id } = req.query

    const usuarioQuery = await prismaClient.usuario.findFirst({
      where: { id: Number.parseInt(id) },
      select: {
        id: true,
        nome: true,
        usuario: true
      }
    })

    await prismaClient.$disconnect()

    return res.status(200).json(usuarioQuery)
  } catch (e) {
    return res.status(500).json(null)
  }
}