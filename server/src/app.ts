import { jwt, prisma as prismaClient } from './lib'
import errorHandler from './middlewares/error-handler'
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
