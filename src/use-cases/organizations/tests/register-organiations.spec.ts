import { expect, describe, it, beforeEach } from 'vitest'
import { RegisterOrganizationUseCase } from '../register-organization'
import { InMemoryOrganizationsRepository } from '../../../repositories/in-memory/in-memory-organizations-repository'
import { BcryptEncryptionAdapter } from '../../../adapters/encryption/bcrypt-encryption-adapter'
import { OrganizationData } from '../../../entities/organization-entity'
import { InvalidCredentialsError } from '../../errors/invalid-credentials-error'

let sut: RegisterOrganizationUseCase
let organizationsRepository: InMemoryOrganizationsRepository
let encryptionAdapter: BcryptEncryptionAdapter

const organizationData: OrganizationData = {
  address: 'Address',
  email: 'organization@email.com',
  password: '123123',
  phone: '(99) 99999-9999',
  responsible_name: 'John Lennon',
  zip_code: '99999-99',
  city: 'Natal',
}

describe('Register Organization Use Case', () => {
  beforeEach(async () => {
    encryptionAdapter = new BcryptEncryptionAdapter()
    organizationsRepository = new InMemoryOrganizationsRepository()
    sut = new RegisterOrganizationUseCase(
      organizationsRepository,
      encryptionAdapter,
    )
  })

  it('should be able to register an orgnaization', async () => {
    const { organization } = await sut.execute({
      organization: organizationData,
    })

    expect(organization.id).toEqual(expect.any(String))
    expect(organization.id).toEqual(organizationsRepository.items[0].id)
  })

  it('should hash organization password upon registration', async () => {
    await sut.execute({
      organization: organizationData,
    })

    const isPasswordCorrectlyHashed = await encryptionAdapter.compare(
      organizationData.password,
      organizationsRepository.items[0].password_hash,
    )

    expect(isPasswordCorrectlyHashed).toBe(true)
  })

  it('should not allow duplicate organizations', async () => {
    await sut.execute({
      organization: organizationData,
    })

    await expect(() => {
      return sut.execute({
        organization: organizationData,
      })
    }).rejects.toThrowError(InvalidCredentialsError)
  })
})
