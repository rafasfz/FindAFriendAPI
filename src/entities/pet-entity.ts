import z from 'zod'
import { organizationEntitySchema } from './organization-entity'

export const petSizeSchema = z.enum(['SMALL', 'MEDIUM', 'LARGE'])
export const petLifeStageSchema = z.enum(['YOUNG', 'ADULT', 'SENIOR'])
export const petEnergyLevel = z.enum(['HIGH', 'MEDIUM', 'LOW'])
export const petSuitableEnvironment = z.enum(['LARGE', 'SMALL'])
export type PetSize = z.infer<typeof petSizeSchema>
export type PetLifeStage = z.infer<typeof petLifeStageSchema>
export type PetEnergyLevel = z.infer<typeof petEnergyLevel>
export type PetSuitableEnvironment = z.infer<typeof petSuitableEnvironment>

export const petDataSchema = z.object({
  name: z.string().min(3),
  description: z.string().nullable(),
  size: petSizeSchema,
  life_stage: petLifeStageSchema,
  energy_level: petEnergyLevel,
  suitable_environment: petSuitableEnvironment,
  requirements: z.array(z.string()),
  photos_url: z.array(z.string()),
})
export type PetData = z.infer<typeof petDataSchema>

export const petToSaveSchema = petDataSchema.extend({
  organization_id: z.string(),
})
export type PetToSave = z.infer<typeof petToSaveSchema>

export const petEntitySchema = petDataSchema.extend({
  id: z.string(),
  adopted_at: z.coerce.date().nullable(),
  organization: organizationEntitySchema,
})
export type PetEntity = z.infer<typeof petEntitySchema>
