import { PetToSave, PetEntity } from '@/src/entities/pet-entity'
import { FecthPetsParams, PetsRepository } from '../pets-repository'
import { prisma } from '@/src/lib/prisma'

export class PrismaPetsRepository implements PetsRepository {
  async create(data: PetToSave): Promise<PetEntity> {
    const petSaved = await prisma.pet.create({
      data,
    })

    const pet = await prisma.pet.findFirstOrThrow({
      where: {
        id: petSaved.id,
      },
      include: {
        organization: true,
      },
    })

    return pet
  }

  async getPetById(id: string): Promise<PetEntity | null> {
    const pet = await prisma.pet.findFirstOrThrow({
      where: {
        id,
      },
      include: {
        organization: true,
      },
    })

    const petEntity = {
      ...pet,
      organization: {
        ...pet.organization,
        password_hash: undefined,
      },
    }

    return petEntity
  }

  async fetchPets(filters: FecthPetsParams): Promise<PetEntity[]> {
    const pets = await prisma.pet.findMany({
      where: {
        organization: {
          city: {
            equals: filters.city,
            mode: 'insensitive',
          },
        },
        size: filters.petSize ? filters.petSize : undefined,
        life_stage: filters.petLifeStage ? filters.petLifeStage : undefined,
        energy_level: filters.petEnergyLevel
          ? filters.petEnergyLevel
          : undefined,
        suitable_environment: filters.petSuitableEnvironment
          ? filters.petSuitableEnvironment
          : undefined,
        adopted_at: null,
      },
      include: {
        organization: true,
      },
    })

    const petsEntity = pets.map((pet) => {
      return {
        ...pet,
        organization: {
          ...pet.organization,
          password_hash: undefined,
        },
      }
    })

    return petsEntity
  }
}
