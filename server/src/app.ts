import { unless } from 'express-unless'
import { prisma as prismaClient } from './lib'
import { errorHandler, jwt, userValidator } from './middlewares'
import routes from './modules/index'
import cors from 'cors'
import express from 'express'

class App {
  public express: express.Application

  constructor() {
    this.express = express()
    this.init()
  }

  private async init(): Promise<void> {
    this.setMiddlewares()
    this.setRoutes()
    this.setErrorHandler()
    this.connectPrisma()
  }

  private setMiddlewares(): void {
    this.express.use(express.json())
    this.express.use(express.urlencoded({ extended: true }))
    this.express.use(cors())
    this.express.use(jwt())
    this.express.use(
      userValidator.unless({ path: ['/auth/login', '/auth/register'] })
    )
  }

  private setErrorHandler(): void {
    this.express.use(errorHandler)
  }

  private setRoutes(): void {
    this.express.use(routes)
  }

  public async connectPrisma(): Promise<void> {
    await prismaClient.$connect()
  }
}

export default App
