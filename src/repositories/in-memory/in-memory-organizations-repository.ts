import {
  OrganizationEntity,
  OrganizationToSave,
} from '@/src/entities/organization-entity'
import { OrganizationsRepository } from '../organizations-repository'
import { nanoid } from 'nanoid'

interface Organization extends OrganizationToSave {
  id: string
}

export class InMemoryOrganizationsRepository
  implements OrganizationsRepository
{
  public items: Organization[] = []

  async create(data: OrganizationToSave): Promise<OrganizationEntity> {
    const organizationToSave = {
      id: nanoid(),
      ...data,
    }
    this.items.push(organizationToSave)

    const organization = {
      ...organizationToSave,
      password_hash: undefined,
    }

    return organization
  }

  async findByEmail(email: string) {
    const organizationSaved = this.items.find((item) => item.email === email)

    if (!organizationSaved) {
      return null
    }

    const organization = {
      ...organizationSaved,
      password_hash: undefined,
    }

    return organization
  }
}
