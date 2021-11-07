import axios from 'axios'

import type { AlchemyWebhook } from './types'

const config = {
  headers: {
    'X-Alchemy-Token': process.env.ALCHEMY_API_KEY!,
  },
}

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
      config
    )

    return response.data.data as AlchemyWebhook
  } catch (err) {
    console.warn('error while creating webhook: ', err)
    return null
  }
}

const updateWebhook = async ({ webhookId, addresses }: { webhookId: number; addresses: string[] }) => {
  try {
    const response = await axios.put(
      'https://dashboard.alchemyapi.io/api/update-webhook-addresses',
      {
        webhook_id: webhookId,
        addresses: addresses,
      },
      config
    )

    return response.data.data as AlchemyWebhook
  } catch (err) {
    console.warn('error while updating webhook: ', err)
    return null
  }
}

export { createWebhook, updateWebhook }
