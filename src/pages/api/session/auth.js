import jwt from "jsonwebtoken"
import bcrypt from 'bcrypt'
import { prismaClient } from "../../../components/database/prismaClient"
import { NextApiRequest, NextApiResponse } from "next"

const JWT_KEY = ".Yv+XT7/2[WkLK6zt&Gb"
/**
 * API que faz a autenticação do usuário.
 * @param {NextApiRequest} req Request
 * @param {NextApiResponse} res Response
 */
export default async function Auth(req, res) {

  try {
    if (req.method !== 'POST') return res.status(405).json(null)
    if (!req.body) return res.status(400).json(null)
    
    const { usuario, senha } = req.body
  
    const usuarioQuery = await prismaClient.usuario.findFirst({
      where: { usuario }
    })

    const checkPass = await bcrypt.compare(senha, usuarioQuery.senha)

    if (checkPass) {
      const token = jwt.sign({
        id: usuarioQuery.id,
        nome: usuarioQuery.nome,
        usuario: usuarioQuery.usuario
      }, JWT_KEY)

      return res.status(200).json({
        token,
        id: usuarioQuery.id,
        nome: usuarioQuery.nome,
        usuario: usuarioQuery.usuario
      })
    }

    await prismaClient.$disconnect()

    return res.status(401).json(null)
  } catch (e) {
    return res.status(500).json(null)
  }
}