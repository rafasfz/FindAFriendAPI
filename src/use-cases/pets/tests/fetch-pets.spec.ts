import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryPetsRepository } from '@/src/repositories/in-memory/in-memory-pets-repository'
import { FetchPetsUseCase } from '../fetch-pets'
import { PetEntity } from '@/src/entities/pet-entity'
import { nanoid } from 'nanoid'
import { OrganizationEntity } from '@/src/entities/organization-entity'

let sut: FetchPetsUseCase
let petsRepository: InMemoryPetsRepository

const city = 'São Paulo'

const makeOrganization = (orgId: string, city: string): OrganizationEntity => {
  return {
    id: orgId,
    responsible_name: 'John Lennon',
    zip_code: '99999-999',
    phone: '(99) 99999-9999',
    address: 'Address',
    email: 'johnlennon@email.com',
    city,
  }
}

const makePet = (
  orgId: string,
  city: string,
  overrides?: Partial<PetEntity>,
): PetEntity => {
  return {
    id: nanoid(),
    name: 'Feliz',
    description: 'Description',
    energy_level: 'MEDIUM',
    life_stage: 'ADULT',
    size: 'MEDIUM',
    suitable_environment: 'SMALL',
    photos_url: [],
    requirements: [],
    adopted_at: null,
    organization: makeOrganization(orgId, city),
    ...overrides,
  }
}

describe('Fetch Pets Use Case', () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository()
    sut = new FetchPetsUseCase(petsRepository)
  })

  it('should be able to fetch pets by city', async () => {
    petsRepository.items.push(makePet('org-1', city))
    petsRepository.items.push(makePet('org-2', 'Rio'))

    const { pets } = await sut.execute({ city })

    expect(pets).toHaveLength(1)
    expect(pets[0].organization.city).toBe(city)
  })

  it('should filter by size when provided', async () => {
    petsRepository.items.push(makePet('org-1', city, { size: 'SMALL' }))
    petsRepository.items.push(makePet('org-1', city, { size: 'LARGE' }))

    const { pets } = await sut.execute({ city, petSize: 'SMALL' })

    expect(pets).toHaveLength(1)
    expect(pets[0].size).toBe('SMALL')
  })

  it('should filter by energy level when provided', async () => {
    petsRepository.items.push(makePet('org-1', city, { energy_level: 'HIGH' }))
    petsRepository.items.push(makePet('org-1', city, { energy_level: 'LOW' }))

    const { pets } = await sut.execute({ city, petEnergyLevel: 'HIGH' })

    expect(pets).toHaveLength(1)
    expect(pets[0].energy_level).toBe('HIGH')
  })

  it('should filter by life stage when provided', async () => {
    petsRepository.items.push(makePet('org-1', city, { life_stage: 'YOUNG' }))
    petsRepository.items.push(makePet('org-1', city, { life_stage: 'SENIOR' }))

    const { pets } = await sut.execute({ city, petLifeStage: 'YOUNG' })

    expect(pets).toHaveLength(1)
    expect(pets[0].life_stage).toBe('YOUNG')
  })

  it('should filter by suitable environment when provided', async () => {
    petsRepository.items.push(
      makePet('org-1', city, { suitable_environment: 'LARGE' }),
    )
    petsRepository.items.push(
      makePet('org-1', city, { suitable_environment: 'SMALL' }),
    )

    const { pets } = await sut.execute({
      city,
      petSuitableEnvironment: 'SMALL',
    })

    expect(pets).toHaveLength(1)
    expect(pets[0].suitable_environment).toBe('SMALL')
  })

  it('should combine multiple filters', async () => {
    petsRepository.items.push(
      makePet('org-1', city, { size: 'SMALL', energy_level: 'HIGH' }),
    )
    petsRepository.items.push(
      makePet('org-1', city, { size: 'SMALL', energy_level: 'LOW' }),
    )

    const { pets } = await sut.execute({
      city,
      petSize: 'SMALL',
      petEnergyLevel: 'HIGH',
    })

    expect(pets).toHaveLength(1)
    expect(pets[0].size).toBe('SMALL')
    expect(pets[0].energy_level).toBe('HIGH')
  })

  it('should return empty array when no pets match filters', async () => {
    petsRepository.items.push(makePet('org-1', city, { size: 'large' }))

    const { pets } = await sut.execute({ city, petSize: 'SMALL' })

    expect(pets).toHaveLength(0)
  })
})
