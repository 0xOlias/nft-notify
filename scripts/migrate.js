const { createPool } = require('slonik')
const { SlonikMigrator } = require('@slonik/migrator')

if (!process.env.DB_URL) {
  throw new Error('no db url found, cannot start server')
}

const pool = createPool(process.env.DB_URL)

const migrator = new SlonikMigrator({
  migrationsPath: './migrations',
  migrationTableName: 'migration',
  slonik: pool,
  logger: undefined,
})

migrator.runAsCLI()
