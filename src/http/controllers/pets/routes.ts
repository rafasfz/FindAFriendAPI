import { FastifyInstance } from 'fastify'
import { registerPet } from './register-pet'
import { verifyJwt } from '../../middlewares/verifiy-jwt'
import { getPet } from './get-pet'
import { fetchPets } from './fetch-pets'

async function authenticatedPetsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJwt)
  app.post('/pets', registerPet)
}

export async function petsRoutes(app: FastifyInstance) {
  app.get('/pets/:petId', getPet)
  app.get('/pets', fetchPets)

  app.register(authenticatedPetsRoutes)
}
