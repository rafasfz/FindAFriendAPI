import { PrismaPetsRepository } from '@/src/repositories/prisma/prisma-pets-repository'
import { FetchPetsUseCase } from '@/src/use-cases/pets/fetch-pets'

export function makeFetchPetsUseCase() {
  const petsRepository = new PrismaPetsRepository()
  const fetchPetsUseCase = new FetchPetsUseCase(petsRepository)

  return fetchPetsUseCase
}
