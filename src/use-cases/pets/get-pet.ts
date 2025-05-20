import { PetEntity } from '@/src/entities/pet-entity'
import { PetsRepository } from '@/src/repositories/pets-repository'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'

interface GetPetUseCaseRequest {
  petId: string
}

interface GetPetUseCaseResponse {
  pet: PetEntity
}

export class GetPetUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    petId,
  }: GetPetUseCaseRequest): Promise<GetPetUseCaseResponse> {
    const petEntity = await this.petsRepository.getPetById(petId)

    if (!petEntity) {
      throw new ResourceNotFoundError('Pet')
    }

    return { pet: petEntity }
  }
}
