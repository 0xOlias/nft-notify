import { NextApiRequest, NextApiResponse } from 'next'

import Cors from 'cors'

function cors(req: NextApiRequest, res: NextApiResponse) {
  return new Promise((resolve, reject) => {
    Cors({
      methods: ['OPTIONS', 'HEAD', 'GET', 'POST'],
    })(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result)
      }
      return resolve(result)
    })
  })
}

export default async (_req: NextApiRequest, res: NextApiResponse) => {
  await cors(_req, res)

  try {
    res.status(200).json({ nice: 'looks great' })
  } catch (err) {
    // res.status(500).json({ statusCode: 500, message: err.message })
  }
}
