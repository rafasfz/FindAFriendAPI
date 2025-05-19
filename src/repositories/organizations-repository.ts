import {
  OrganizationEntity,
  OrganizationToSave,
} from '@/src/entities/organization-entity'

export interface OrganizationsRepository {
  create(data: OrganizationToSave): Promise<OrganizationEntity>
  getPasswordHashByEmail(email: string): Promise<string | null>
  findByEmail(email: string): Promise<OrganizationEntity | null>
}
