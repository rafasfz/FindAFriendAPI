import { makeGetPetUseCase } from '@/src/use-cases/pets/factories/make-get-pet-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function getPet(request: FastifyRequest, reply: FastifyReply) {
  const getPetParamsSchema = z.object({
    petId: z.string().nanoid(),
  })

  const { petId } = getPetParamsSchema.parse(request.params)

  const { pet } = await makeGetPetUseCase().execute({
    petId,
  })

  return reply.status(200).send({ pet })
}
