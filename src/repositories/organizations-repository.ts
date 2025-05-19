import {
  OrganizationEntity,
  OrganizationToSave,
} from '@/src/entities/organization-entity'

export interface OrganizationsRepository {
  create(data: OrganizationToSave): Promise<OrganizationEntity>
  findByEmail(email: string): Promise<OrganizationEntity | null>
}
