import { BcryptEncryptionAdapter } from '@/src/adapters/encryption/bcrypt-encryption-adapter'
import { PrismaOrganizationsRepository } from '@/src/repositories/prisma/prisma-organizations-repository'
import { RegisterOrganizationUseCase } from '@/src/use-cases/organizations/register-organization'

export function makeRegisterOrganizationUseCase() {
  const organizationsRepository = new PrismaOrganizationsRepository()
  const encryptionAdapter = new BcryptEncryptionAdapter()
  const authenticateUseCase = new RegisterOrganizationUseCase(
    organizationsRepository,
    encryptionAdapter,
  )

  return authenticateUseCase
}
