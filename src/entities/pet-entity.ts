import z from 'zod'
import { organizationEntitySchema } from './organization-entity'

export const petDataSchema = z.object({
  name: z.string().min(3),
  description: z.string().nullable(),
  size: z.enum(['SMALL', 'MEDIUM', 'LARGE']),
  life_stage: z.enum(['YOUNG', 'ADULT', 'SENIOR']),
  energy_level: z.enum(['HIGH', 'MEDIUM', 'LOW']),
  suitable_environment: z.enum(['LARGE', 'SMALL']),
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
  organization: organizationEntitySchema,
})
export type PetEntity = z.infer<typeof petEntitySchema>
