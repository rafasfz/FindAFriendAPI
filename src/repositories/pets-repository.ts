import {
  PetEnergyLevel,
  PetEntity,
  PetLifeStage,
  PetSize,
  PetSuitableEnvironment,
  PetToSave,
} from '@/src/entities/pet-entity'

export interface FecthPetsParams {
  city: string
  petSize?: PetSize
  petLifeStage?: PetLifeStage
  petEnergyLevel?: PetEnergyLevel
  petSuitableEnvironment?: PetSuitableEnvironment
}

export interface PetsRepository {
  create(data: PetToSave): Promise<PetEntity>
  getPetById(id: string): Promise<PetEntity | null>
  fetchPets(filters: FecthPetsParams): Promise<PetEntity[]>
}
