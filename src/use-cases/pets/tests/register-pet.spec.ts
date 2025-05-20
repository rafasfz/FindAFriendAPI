import { expect, describe, it, beforeEach } from 'vitest'
import { RegisterPetUseCase } from '../register-pet'
import { InMemoryPetsRepository } from '@/src/repositories/in-memory/in-memory-pets-repository'
import { PetData } from '@/src/entities/pet-entity'

let sut: RegisterPetUseCase
let petsRepository: InMemoryPetsRepository

const petData: PetData = {
  name: 'Feliz',
  description: 'Very Happy Dog',
  energy_level: 'MEDIUM',
  life_stage: 'SENIOR',
  size: 'SMALL',
  suitable_environment: 'SMALL',
  photos_url: [],
  requirements: [],
}

describe('Register Pet Use Case', () => {
  beforeEach(async () => {
    petsRepository = new InMemoryPetsRepository()
    sut = new RegisterPetUseCase(petsRepository)
  })

  it('should be able to register a pet', async () => {
    const { pet } = await sut.execute({
      pet: petData,
      organizationId: 'org-id',
    })

    expect(pet.id).toEqual(expect.any(String))
    expect(pet.id).toEqual(petsRepository.items[0].id)
  })
})
