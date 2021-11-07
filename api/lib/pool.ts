import { createPool } from 'slonik'
import { createFieldNameTransformationInterceptor } from 'slonik-interceptor-field-name-transformation'
import { createQueryLoggingInterceptor } from 'slonik-interceptor-query-logging'

if (!process.env.DB_URL) {
  throw new Error('no db url found, cannot start server')
}

const pool = createPool(process.env.DB_URL, {
  interceptors: [
    // converts snake_case postgres field names to camelCase
    createFieldNameTransformationInterceptor({
      format: 'CAMEL_CASE',
    }),
    // logs queries using roarr
    createQueryLoggingInterceptor(),
  ],
})

export default pool
