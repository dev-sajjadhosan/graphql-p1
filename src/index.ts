import { ApolloServer } from 'apollo-server-express'
import express, { Application } from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'

import typeDefs from './schema/typeDefs'
import resolvers from './schema/resolvers'

dotenv.config()

const startServer = async () => {
  const app: Application = express()
  //   mongodb
  const uri =
    'mongodb+srv://devsajjadhosan1:4QD1mXEKtf84UuQa@mydbv001.jmnjuqq.mongodb.net/?retryWrites=true&w=majority&appName=MyDBv001'
  await mongoose.connect(uri)
  console.log('MongoDB Connected!')

  //   apollo server
  const server = new ApolloServer({ typeDefs, resolvers })
  await server.start()
  server.applyMiddleware({ app: app as any, path: '/gql' })

  const PORT = process.env.PORT || 4000
  app.listen(PORT, () => {
    console.log(`🚀 Server ready at http://localhost:${PORT}/gql`)
  })
}

startServer().catch((err) => console.error(err))
