import { sql } from 'slonik'

import pool from './pool'
import { buildInsertFragment } from '../utils'
import type { User, Webhook } from '../types'

const users = {
  get: async ({ id }: { id: string }) => {
    return pool.one(sql<User>`
      SELECT * FROM notify.users WHERE id=${id};
    `)
  },
  insert: async (user: Partial<User>) => {
    return pool.one(sql<User>`
      INSERT INTO notify.users ${buildInsertFragment<User>(user)} RETURNING *;
    `)
  },
}

const webhooks = {
  get: async ({ id }: { id: string }) => {
    return pool.one(sql<Webhook>`
      SELECT * FROM notify.webhooks WHERE id=${id};
    `)
  },
  insert: async (webhook: Partial<Webhook>) => {
    return pool.one(sql<Webhook>`
      INSERT INTO notify.webhooks ${buildInsertFragment<Webhook>(webhook)} RETURNING *;
    `)
  },
}

const db = {
  users,
  webhooks,
}

export default db
