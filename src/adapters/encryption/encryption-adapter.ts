export interface EncryptionAdapter {
  hash(password: string): Promise<string>
  compare(password: string, password_hash: string): Promise<boolean>
}
