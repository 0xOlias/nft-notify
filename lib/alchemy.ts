import axios from 'axios'
import db from './db'
import type { Webhook } from './types'

const createWebhook = async ({ addresses }: { addresses: string[] }) => {
  try {
    const response = await axios.post(
      'https://dashboard.alchemyapi.io/api/create-webhook',
      {
        app_id: process.env.ALCHEMY_APP_ID!,
        webhook_type: 4,
        webhook_url: `${process.env.BASE_URL!}/api/webhook`,
        addresses: addresses,
      },
      {
        headers: {
          'X-Alchemy-Token': process.env.ALCHEMY_API_KEY!,
        },
      }
    )

    const receivedWebhookObject = response.data.data as Webhook

    await db.webhooks.insert(receivedWebhookObject)
  } catch (err) {
    console.warn('error while creating webhook: ', err)
  }
}

export { createWebhook }
