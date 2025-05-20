import { PrismaPetsRepository } from '@/src/repositories/prisma/prisma-pets-repository'
import { RegisterPetUseCase } from '@/src/use-cases/pets/register-pet'

export function makeRegisterPetUseCase() {
  const petsRepository = new PrismaPetsRepository()
  const registerPetUseCase = new RegisterPetUseCase(petsRepository)

  return registerPetUseCase
}
