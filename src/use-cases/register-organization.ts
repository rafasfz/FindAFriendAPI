import { EncryptionAdapter } from '@/src/adapters/encryption/encryption-adapter'
import {
  OrganizationData,
  OrganizationEntity,
} from '@/src/entities/organization-entity'
import { OrganizationsRepository } from '@/src/repositories/organizations-repository'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'

interface RegisterOrganizationUseCaseRequest {
  organization: OrganizationData
}

interface RegisterOrganizationUseCaseResponse {
  organization: OrganizationEntity
}

export class RegisterOrganizationUseCase {
  constructor(
    private organizationsRepository: OrganizationsRepository,
    private encryptionAdapter: EncryptionAdapter,
  ) {}

  async execute({
    organization,
  }: RegisterOrganizationUseCaseRequest): Promise<RegisterOrganizationUseCaseResponse> {
    const isOrganizationAlreadyExists =
      await this.organizationsRepository.findByEmail(organization.email)

    if (isOrganizationAlreadyExists) {
      throw new InvalidCredentialsError()
    }

    const password_hash = await this.encryptionAdapter.hash(
      organization.password,
    )

    const organizationToSave = {
      ...organization,
      password: undefined,
      password_hash,
    }

    const organizationEntity =
      await this.organizationsRepository.create(organizationToSave)

    return { organization: organizationEntity }
  }
}
