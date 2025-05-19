import { compare, hash } from 'bcryptjs'
import { EncryptionAdapter } from './encryption-adapter'
import { HASHING_SALT_ROUNDS } from '@/src/settings'

export class BcryptEncryptionAdapter implements EncryptionAdapter {
  async compare(password: string, password_hash: string) {
    return await compare(password, password_hash)
  }

  async hash(password: string) {
    return await hash(password, HASHING_SALT_ROUNDS)
  }
}
