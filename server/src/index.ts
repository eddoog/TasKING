import { config as configDotenv } from 'dotenv'
import server from './server'
import { prisma } from './lib'

configDotenv()

server.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`)
})

process.on('SIGINT', () => {
  // eslint-disable-next-line @typescript-eslint/no-floating-promises
  prisma.$disconnect()
  console.log('Prisma Disconnected.')
  process.exit(0)
})
