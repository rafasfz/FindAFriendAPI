import {
  petEnergyLevel,
  petLifeStageSchema,
  petSizeSchema,
  petSuitableEnvironment,
} from '@/src/entities/pet-entity'
import { makeFetchPetsUseCase } from '@/src/use-cases/pets/factories/make-fetch-pets-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function fetchPets(request: FastifyRequest, reply: FastifyReply) {
  const getPetQuerySchema = z.object({
    size: petSizeSchema.nullable().default(null),
    life_stage: petLifeStageSchema.nullable().default(null),
    energy_level: petEnergyLevel.nullable().default(null),
    suitable_environment: petSuitableEnvironment.nullable().default(null),
    city: z.string(),
  })

  const { city, energy_level, life_stage, size, suitable_environment } =
    getPetQuerySchema.parse(request.query)

  const { pets } = await makeFetchPetsUseCase().execute({
    city,
    petEnergyLevel: energy_level ?? undefined,
    petLifeStage: life_stage ?? undefined,
    petSize: size ?? undefined,
    petSuitableEnvironment: suitable_environment ?? undefined,
  })

  return reply.status(200).send({ pets })
}
