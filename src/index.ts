import { config } from 'dotenv'
config()

import swaggerUi from 'swagger-ui-express'
import { app } from './app'
import { db } from './db'
import { swaggerSpec } from './infra/swagger/swagger'
import { swaggerRouter } from './infra/swagger/swagger.router'


const PORT = process.env.PORT || 3000

swaggerRouter.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
  customSiteTitle: 'Simple Application API',
}))

swaggerRouter.get('/docs.json', (_req, res) => {
  res.json(swaggerSpec)
})

async function main() {
  await db.$client.connect()
  console.log('Database connected')

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
}

main().catch((err) => {
  console.error('Failed to start server', err)
  process.exit(1)
})
