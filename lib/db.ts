import { sql } from 'slonik'

import pool from './pool'
import { buildInsertFragment, buildUpdateFragment } from './utils'
import type { User, AlchemyWebhook } from './types'

const users = {
  find: async ({ id }: { id: string }) => {
    return pool.maybeOne(sql<User>`
      SELECT * FROM notify.users WHERE id=${id};
    `)
  },
  findByEmail: async ({ email }: { email: string }) => {
    return pool.maybeOne(sql<User>`
      SELECT * FROM notify.users WHERE email=${email};
    `)
  },
  insert: async (user: Partial<User>) => {
    return pool.one(sql<User>`
      INSERT INTO notify.users ${buildInsertFragment<User>(user)} RETURNING *;
    `)
  },
  update: async ({ id, ...rest }: Partial<User> & { id: string }) => {
    return pool.one(sql<User>`
      UPDATE notify.users ${buildUpdateFragment<User>(rest)} WHERE id=${id} RETURNING *;
    `)
  },
}

const alchemy_webhooks = {
  find: async ({ id }: { id: number }) => {
    return pool.maybeOne(sql<AlchemyWebhook>`
      SELECT * FROM notify.alchemy_webhooks WHERE id=${id};
    `)
  },
  insert: async (webhook: Partial<AlchemyWebhook>) => {
    return pool.maybeOne(sql<AlchemyWebhook>`
      INSERT INTO notify.alchemy_webhooks ${buildInsertFragment<AlchemyWebhook>(webhook)} RETURNING *;
    `)
  },
  update: async ({ id, ...rest }: Partial<AlchemyWebhook> & { id: number }) => {
    return pool.one(sql<AlchemyWebhook>`
      UPDATE notify.alchemy_webhooks ${buildUpdateFragment<AlchemyWebhook>(rest)} WHERE id=${id} RETURNING *;
    `)
  },
}

const db = {
  users,
  alchemy_webhooks,
}

export default db
