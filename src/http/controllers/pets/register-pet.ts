import { petDataSchema } from '@/src/entities/pet-entity'
import { makeRegisterPetUseCase } from '@/src/use-cases/pets/factories/make-register-pet-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function registerPet(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const petData = petDataSchema.parse(request.body)

  const { pet } = await makeRegisterPetUseCase().execute({
    pet: petData,
    organizationId: request.user.sub,
  })

  return reply.status(201).send({ pet })
}
