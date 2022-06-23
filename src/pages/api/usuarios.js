import bcrypt from 'bcrypt'
import { NextApiRequest, NextApiResponse } from 'next'
import { prismaClient } from '../../components/database/prismaClient';

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
      const usuarioQuery = await prismaClient.usuario.findMany({
        select: { id: true, nome: true, usuario: true }
      })

      await prismaClient.$disconnect()

      return res.status(200).json(usuarioQuery)
    } else if (req.method === 'POST') {
      if (!req.body) return res.status(400).json(null)

      const { nome, usuario, senha } = req.body
      const saltRounds = 10;
      const senhaCripto = await bcrypt.hash(senha, saltRounds)
      await prismaClient.usuario.create({
        data: { nome, usuario, senha: senhaCripto }
      })

      await prismaClient.$disconnect()
      return res.status(201).json(null)
    } else {
      return res.status(405).json(null)
    }
  } catch (e) {
    return res.status(500).json(e.message)
  }
}