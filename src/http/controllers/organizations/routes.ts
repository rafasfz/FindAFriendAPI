import { FastifyInstance } from 'fastify'
import { authenticate } from './authenticate'
import { registerOrganization } from './register-organization'
import { refresh } from './refresh'

export async function organizationsRoutes(app: FastifyInstance) {
  app.post('/organizations', registerOrganization)
  app.post('/sessions', authenticate)
  app.post('/sessions/refresh', refresh)
}
