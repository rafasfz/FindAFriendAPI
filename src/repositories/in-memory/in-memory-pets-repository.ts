import { PetToSave, PetEntity } from '@/src/entities/pet-entity'
import { PetsRepository } from '../pets-repository'
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
}
