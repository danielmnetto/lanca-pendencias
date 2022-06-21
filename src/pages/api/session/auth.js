import jwt from "jsonwebtoken";
import jsCookie from 'js-cookie'
import { prismaClient } from "../../../components/database/prismaClient"
import { NextApiRequest, NextApiResponse } from "next"

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
    
    return res.status(200).json(usuarioQuery)
  } catch (e) {
    return res.status(500).json(null)
  }
}