import { NextApiRequest, NextApiResponse } from 'next'

export default async (_req: NextApiRequest, res: NextApiResponse) => {
  try {
    res.status(200).json({ nice: 'looks great' })
  } catch (err) {
    // res.status(500).json({ statusCode: 500, message: err.message })
  }
}
