import type { NextApiRequest, NextApiResponse } from 'next'

import { createWebhook } from '../../../lib/alchemy'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  console.log('got request with body:', req.body)

  await createWebhook({ addresses: ['0xd17d1BcDe2A28AaDe2b3B5012f93b8B079d0E86B'] })

  res.status(200).json({ nice: 'looks great' })
}
