import {
  PetEntity,
  PetSize,
  PetEnergyLevel,
  PetLifeStage,
  PetSuitableEnvironment,
} from '@/src/entities/pet-entity'
import { PetsRepository } from '@/src/repositories/pets-repository'

interface FetchPetsUseCaseRequest {
  city: string
  petSize?: PetSize
  petLifeStage?: PetLifeStage
  petEnergyLevel?: PetEnergyLevel
  petSuitableEnvironment?: PetSuitableEnvironment
}

interface FetchPetsUseCaseResponse {
  pets: PetEntity[]
}

export class FetchPetsUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    city,
    petEnergyLevel,
    petLifeStage,
    petSize,
    petSuitableEnvironment,
  }: FetchPetsUseCaseRequest): Promise<FetchPetsUseCaseResponse> {
    const pets = await this.petsRepository.fetchPets({
      city,
      petEnergyLevel,
      petLifeStage,
      petSize,
      petSuitableEnvironment,
    })

    return { pets }
  }
}
