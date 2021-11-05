import type { NextApiRequest, NextApiResponse } from 'next'

import { cors } from '../../../lib/utils'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  await cors(req, res)

  console.log('got request with body:', req.body)

  res.status(200).json({ message: 'success' })
}
