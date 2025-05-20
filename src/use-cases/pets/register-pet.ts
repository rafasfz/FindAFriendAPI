import { PetData, PetEntity } from '@/src/entities/pet-entity'
import { PetsRepository } from '@/src/repositories/pets-repository'

interface RegisterPetUseCaseRequest {
  pet: PetData
  organizationId: string
}

interface RegisterPetUseCaseResponse {
  pet: PetEntity
}

export class RegisterPetUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    pet,
    organizationId,
  }: RegisterPetUseCaseRequest): Promise<RegisterPetUseCaseResponse> {
    const petToSave = {
      ...pet,
      organization_id: organizationId,
    }

    const petEntity = await this.petsRepository.create(petToSave)

    return { pet: petEntity }
  }
}
