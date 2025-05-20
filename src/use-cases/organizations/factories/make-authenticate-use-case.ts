import { BcryptEncryptionAdapter } from '@/src/adapters/encryption/bcrypt-encryption-adapter'
import { PrismaOrganizationsRepository } from '@/src/repositories/prisma/prisma-organizations-repository'
import { AuthenticateUseCase } from '@/src/use-cases/organizations/authenticate'

export function makeAuthenticateUseCase() {
  const organizationsRepository = new PrismaOrganizationsRepository()
  const encryptionAdapter = new BcryptEncryptionAdapter()
  const authenticateUseCase = new AuthenticateUseCase(
    organizationsRepository,
    encryptionAdapter,
  )

  return authenticateUseCase
}
