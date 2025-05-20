import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryOrganizationsRepository } from '../../../repositories/in-memory/in-memory-organizations-repository'
import { BcryptEncryptionAdapter } from '../../../adapters/encryption/bcrypt-encryption-adapter'
import { OrganizationToSave } from '../../../entities/organization-entity'
import { InvalidCredentialsError } from '../../errors/invalid-credentials-error'
import { AuthenticateUseCase } from '../authenticate'

let sut: AuthenticateUseCase
let organizationsRepository: InMemoryOrganizationsRepository
const encryptionAdapter: BcryptEncryptionAdapter = new BcryptEncryptionAdapter()

describe('Authenticate Use Case', async () => {
  const password = '123123'

  const password_hash = await encryptionAdapter.hash(password)

  const organizationToSave: OrganizationToSave = {
    address: 'Address',
    email: 'organization@email.com',
    password_hash,
    phone: '(99) 99999-9999',
    responsible_name: 'John Lennon',
    zip_code: '99999-99',
    city: 'Natal',
  }

  beforeEach(async () => {
    organizationsRepository = new InMemoryOrganizationsRepository()
    sut = new AuthenticateUseCase(organizationsRepository, encryptionAdapter)
  })

  it('should be able to authenticate', async () => {
    organizationsRepository.create({
      ...organizationToSave,
      password_hash,
    })

    const { organization } = await sut.execute({
      email: organizationToSave.email,
      password,
    })

    expect(organization.id).toEqual(expect.any(String))
    expect(organization).toEqual(
      expect.objectContaining({
        ...organizationToSave,
        password_hash: undefined,
      }),
    )
  })

  it('should not be able to login with non-existent organization', async () => {
    await expect(() => {
      return sut.execute({
        email: organizationToSave.email,
        password,
      })
    }).rejects.toThrowError(InvalidCredentialsError)
  })

  it('should not be able to login with wrong password', async () => {
    organizationsRepository.create({
      ...organizationToSave,
      password_hash: await encryptionAdapter.hash(password),
    })

    await expect(() => {
      return sut.execute({
        email: organizationToSave.email,
        password: 'wrong-password',
      })
    }).rejects.toThrowError(InvalidCredentialsError)
  })
})
