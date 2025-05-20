import { PetEntity, PetToSave } from '@/src/entities/pet-entity'

export interface PetsRepository {
  create(data: PetToSave): Promise<PetEntity>
  getPetById(id: string): Promise<PetEntity | null>
}
