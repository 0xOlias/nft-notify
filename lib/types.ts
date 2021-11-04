export interface User {
  id: string
  email?: string
  phone?: string
  wallet?: string
}

export interface Webhook {
  id: string
  alchemy_id: number
  addresses: string[]
  is_active: boolean
  time_created: number

  user_id: string
}
