import type { NextApiRequest, NextApiResponse } from 'next'

import db from '../../../api/lib/db'
import { updateWebhook, createWebhook } from '../../../api/lib/alchemy'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (!Object.keys(req.body).includes('email') || !Object.keys(req.body).includes('addresses')) {
    res.status(400).json({ message: 'request body missing required fields' })
  }

  const { email, addresses } = req.body as { email: string; addresses: string[] }

  const foundUser = await db.users.findByEmail({ email: email })

  // if the user exists and already has a webhook, attempt to update the webhook
  if (foundUser && foundUser.webhookId) {
    const updatedWebhook = await updateWebhook({ webhookId: foundUser.webhookId, addresses: addresses })
    if (!updatedWebhook) {
      return res.status(500).json({ error: 'unable to update webhook' })
    }

    db.alchemy_webhooks.update(updatedWebhook)
    return res.status(200).json({ message: 'success' })
  }

  // attempt to create a new webhook
  const newWebhook = await createWebhook({ addresses: addresses })
  if (!newWebhook) {
    return res.status(500).json({ error: 'unable to create webhook' })
  }

  // send success response
  res.status(200).json({ message: 'success' })

  // insert the successfully created webhook
  await db.alchemy_webhooks.insert(newWebhook)

  // upsert the user
  if (foundUser) {
    await db.users.update({ id: foundUser.id, webhookId: newWebhook.id })
  } else {
    await db.users.insert({ email: email, webhookId: newWebhook.id })
  }
}
