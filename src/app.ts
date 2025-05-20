import fastify from 'fastify'
import { SECRET_KEY } from './settings'
import fastifyJwt from '@fastify/jwt'
import { ZodError } from 'zod'
import { GlobalHttpError } from './errors/global-http-error'
import fastifyCookie from '@fastify/cookie'
import { organizationsRoutes } from './http/controllers/organizations/routes'
import { petsRoutes } from './http/controllers/pets/routes'

export const app = fastify()

app.register(fastifyJwt, {
  secret: SECRET_KEY,
  cookie: {
    cookieName: 'refreshToken',
    signed: false,
  },
  sign: {
    expiresIn: '10m',
  },
})
app.register(fastifyCookie)

app.register(organizationsRoutes)
app.register(petsRoutes)

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply.status(400).send({
      message: 'Validation error.',
      issues: error.format(),
    })
  }

  if (error instanceof GlobalHttpError) {
    return reply.status(error.statusCode).send({
      message: error.message,
    })
  }

  console.error(error)

  return reply.status(500).send({ message: 'Internal server error.' })
})
