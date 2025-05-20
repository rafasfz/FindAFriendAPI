import { PetToSave, PetEntity } from '@/src/entities/pet-entity'
import { FecthPetsParams, PetsRepository } from '../pets-repository'
import { nanoid } from 'nanoid'

export class InMemoryPetsRepository implements PetsRepository {
  public items: PetEntity[] = []

  async create(data: PetToSave) {
    const pet = {
      id: nanoid(),
      ...data,
      organization_id: undefined,
      organization: {
        id: data.organization_id,
        responsible_name: 'John Lennon',
        zip_code: '99999-999',
        phone: '(99) 99999-9999',
        address: 'Address',
        email: 'johnlennon@email.com',
        city: 'Natal',
      },
      adopted_at: null,
    }

    this.items.push(pet)

    return pet
  }

  async getPetById(id: string) {
    const pet = this.items.find((item) => item.id === id)

    if (!pet) {
      return null
    }

    return pet
  }

  async fetchPets(filters: FecthPetsParams) {
    let filteredPets = this.items.filter(
      (pet) =>
        pet.organization.city.toLowerCase() === filters.city.toLowerCase() &&
        !pet.adopted_at,
    )

    if (filters.petSize) {
      filteredPets = filteredPets.filter((pet) => pet.size === filters.petSize)
    }

    if (filters.petLifeStage) {
      filteredPets = filteredPets.filter(
        (pet) => pet.life_stage === filters.petLifeStage,
      )
    }

    if (filters.petEnergyLevel) {
      filteredPets = filteredPets.filter(
        (pet) => pet.energy_level === filters.petEnergyLevel,
      )
    }

    if (filters.petSuitableEnvironment) {
      filteredPets = filteredPets.filter(
        (pet) => pet.suitable_environment === filters.petSuitableEnvironment,
      )
    }

    return filteredPets
  }
}
