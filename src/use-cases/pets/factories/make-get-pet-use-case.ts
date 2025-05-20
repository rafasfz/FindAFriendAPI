import { PrismaPetsRepository } from '@/src/repositories/prisma/prisma-pets-repository'
import { GetPetUseCase } from '@/src/use-cases/pets/get-pet'

export function makeGetPetUseCase() {
  const petsRepository = new PrismaPetsRepository()
  const getPetUseCase = new GetPetUseCase(petsRepository)

  return getPetUseCase
}
