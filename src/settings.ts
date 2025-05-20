import { env } from './env'

export const PORT = env.PORT
export const HOST = env.HOST

export const HASHING_SALT_ROUNDS = 6
export const SECRET_KEY = env.SECRET_KEY
