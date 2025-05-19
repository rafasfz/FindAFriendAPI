import { GlobalHttpError } from '@/src/errors/global-http-error'

export class InvalidCredentialsError extends GlobalHttpError {
  statusCode = 400
  constructor() {
    super('Invalid credentials.')
  }
}
