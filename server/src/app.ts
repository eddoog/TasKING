import prismaClient from './lib/prisma'
import routes from './modules/index'
import cors from 'cors'
import express from 'express'

class App {
  public express: express.Application

  constructor() {
    this.express = express()
  }

  public async init(): Promise<void> {
    this.middlewares()
    this.routes()
    this.connectPrisma()
  }

  private middlewares(): void {
    this.express.use(express.json())
    this.express.use(cors())
  }

  private routes(): void {
    this.express.use(routes)
  }

  public async connectPrisma(): Promise<void> {
    await prismaClient.$connect()
  }
}

export default App
