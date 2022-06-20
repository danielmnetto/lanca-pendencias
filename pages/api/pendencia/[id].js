/**
 * @param {NextApiRequest} req Request
 * @param {NextApiResponse} res Response
 */
export default function (req, res) {
  const { id } = req.query
  return res.status(200).send(id).end()
}