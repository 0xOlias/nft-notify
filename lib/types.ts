export interface User {
  id: string
  email?: string
  phone?: string
  wallet?: string
  webhookId?: number
}

export interface AlchemyWebhook {
  id: number
  app_id: string
  network: number
  webhook_type: number
  webhook_url: string
  is_active: boolean
  time_created: number
  addresses: string[]
}

export interface AlchemyTransaction {
  category: 'internal' | 'external' | 'token'

  blockNum: string
  hash: string
  fromAddress: string
  toAddress: string | null

  value: number | null
  asset: string | null
  erc721TokenId: string | null
  erc1155Metadata: string | null

  rawContract: {
    rawValue: string
    address: string | null
    decimals: number | null
  }

  typeTraceAddress: string | null
  log: any | null
}
