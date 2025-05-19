import { z } from 'zod'

export const organizationDataSchema = z.object({
  responsible_name: z.string().min(3),
  zip_code: z.string(),
  address: z.string(),
  phone: z.string(),
  password: z.string(),
})
export type OrganizationData = z.infer<typeof organizationDataSchema>

export const organizationEntitySchema = organizationDataSchema.omit({
  password: true,
})
export type OrganizationEntity = z.infer<typeof organizationEntitySchema>

export const organizationToSaveSchema = organizationEntitySchema.extend({
  password_hash: z.string(),
})
export type OrganizationToSave = z.infer<typeof organizationToSaveSchema>
