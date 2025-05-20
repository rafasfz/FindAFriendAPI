import { OrganizationToSave } from '@/src/entities/organization-entity'
import { OrganizationsRepository } from '../organizations-repository'
import { prisma } from '@/src/lib/prisma'

export class PrismaOrganizationsRepository implements OrganizationsRepository {
  async create(data: OrganizationToSave) {
    const organization = await prisma.organization.create({
      data,
    })

    const organizationEntity = {
      ...organization,
      password_hash: undefined,
    }

    return organizationEntity
  }

  async getPasswordHashByEmail(email: string) {
    const organization = await prisma.organization.findFirst({
      where: {
        email,
      },
    })

    if (!organization) {
      return null
    }

    return organization.password_hash
  }

  async findByEmail(email: string) {
    const organization = await prisma.organization.findFirst({
      where: {
        email,
      },
    })

    if (!organization) {
      return null
    }

    const organizationEntity = {
      ...organization,
      password_hash: undefined,
    }

    return organizationEntity
  }
}
