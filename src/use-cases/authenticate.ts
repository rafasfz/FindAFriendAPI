import { EncryptionAdapter } from '@/src/adapters/encryption/encryption-adapter'
import { OrganizationEntity } from '@/src/entities/organization-entity'
import { OrganizationsRepository } from '@/src/repositories/organizations-repository'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'

interface AuthenticateUseCaseRequest {
  email: string
  password: string
}

interface AuthenticateUseCaseResponse {
  organization: OrganizationEntity
}

export class AuthenticateUseCase {
  constructor(
    private organizationsRepository: OrganizationsRepository,
    private encryptionAdapter: EncryptionAdapter,
  ) {}

  async execute({
    email,
    password,
  }: AuthenticateUseCaseRequest): Promise<AuthenticateUseCaseResponse> {
    const password_hash =
      await this.organizationsRepository.getPasswordHashByEmail(email)

    if (!password_hash) {
      throw new InvalidCredentialsError()
    }

    const isPasswordCorrect = await this.encryptionAdapter.compare(
      password,
      password_hash,
    )

    if (!isPasswordCorrect) {
      throw new InvalidCredentialsError()
    }

    const organization = (await this.organizationsRepository.findByEmail(
      email,
    )) as OrganizationEntity

    return { organization }
  }
}
