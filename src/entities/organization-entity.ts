import { z } from 'zod'

export const organizationDataSchema = z.object({
  responsible_name: z.string().min(3),
  zip_code: z.string(),
  address: z.string(),
  phone: z.string(),
  password: z.string().min(6),
  email: z.string().email(),
})
export type OrganizationData = z.infer<typeof organizationDataSchema>

export const organizationEntitySchema = organizationDataSchema
  .omit({
    password: true,
  })
  .extend({
    id: z.string(),
  })
export type OrganizationEntity = z.infer<typeof organizationEntitySchema>

export const organizationToSaveSchema = organizationDataSchema
  .extend({
    password_hash: z.string(),
  })
  .omit({
    password: true,
  })
export type OrganizationToSave = z.infer<typeof organizationToSaveSchema>
