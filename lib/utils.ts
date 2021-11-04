// DATABASE UTILS //
import { sql } from 'slonik'
import { toSnakeCase } from 'js-convert-case'

function isPrimitiveType(value: any) {
  return typeof value === 'boolean' || typeof value === 'string' || typeof value === 'number'
}

export function buildUpdateFragment<T>(obj: Partial<T>) {
  const updateList = Object.entries(obj)
  const frags = updateList.map(([key, value]) =>
    isPrimitiveType(value)
      ? sql`${sql.identifier([toSnakeCase(key)])} = ${value as any}`
      : sql`${sql.identifier([toSnakeCase(key)])} = ${sql.json(value as any)}`
  )
  return sql`SET ${sql.join(frags, sql`, `)}`
}

export function buildInsertFragment<T>(obj: Partial<T>) {
  const updateList = Object.entries(obj)
  const keys = updateList.map(([key, _]) => sql.identifier([toSnakeCase(key)]))
  const values = updateList.map(([_, value]) =>
    isPrimitiveType(value) ? sql`${value as any}` : sql`${sql.json(value as any)}`
  )
  return sql`(${sql.join(keys, sql`, `)}) VALUES (${sql.join(values, sql`, `)})`
}

// API UTILS //
import type { NextApiRequest, NextApiResponse } from 'next'
import Cors from 'cors'

export function cors(req: NextApiRequest, res: NextApiResponse) {
  return new Promise((resolve, reject) => {
    Cors()(req, res, (result) => {
      console.log('in cors handler!')
      if (result instanceof Error) {
        console.log('rejected!')
        return reject(result)
      }
      return resolve(result)
    })
  })
}
