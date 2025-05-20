import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryPetsRepository } from '@/src/repositories/in-memory/in-memory-pets-repository'
import { PetToSave } from '@/src/entities/pet-entity'
import { GetPetUseCase } from '../get-pet'
import { ResourceNotFoundError } from '../../errors/resource-not-found-error'

let sut: GetPetUseCase
let petsRepository: InMemoryPetsRepository

const organization_id = 'org-id'

const petToSave: PetToSave = {
  name: 'Feliz',
  description: 'Very Happy Dog',
  energy_level: 'MEDIUM',
  life_stage: 'SENIOR',
  size: 'SMALL',
  suitable_environment: 'SMALL',
  photos_url: [],
  requirements: [],
  organization_id,
}

describe('Get Pet Use Case', () => {
  beforeEach(async () => {
    petsRepository = new InMemoryPetsRepository()
    sut = new GetPetUseCase(petsRepository)
  })

  it('should be able to get a pet', async () => {
    const petEntity = await petsRepository.create(petToSave)

    const { pet } = await sut.execute({
      petId: petEntity.id,
    })

    expect(pet.id).toEqual(expect.any(String))
    expect(pet).toEqual(petEntity)
  })

  it('should not be able to get a non existent pet', async () => {
    await expect(() => {
      return sut.execute({
        petId: 'non-existent-id',
      })
    }).rejects.toThrowError(ResourceNotFoundError)
  })
})
