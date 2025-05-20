import { makeAuthenticateUseCase } from '@/src/use-cases/organizations/factories/make-authenticate-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function authenticate(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const authenticateBodySchema = z.object({
    email: z.string().email(),
    password: z.string(),
  })

  const authenticateParams = authenticateBodySchema.parse(request.body)

  const { organization } =
    await makeAuthenticateUseCase().execute(authenticateParams)

  const token = await reply.jwtSign(
    {},
    {
      sign: {
        sub: organization.id,
      },
    },
  )

  const refreshToken = await reply.jwtSign(
    {},
    {
      sign: {
        sub: organization.id,
        expiresIn: '7d',
      },
    },
  )

  return reply
    .status(200)
    .setCookie('refreshToken', refreshToken, {
      path: '/',
      secure: true,
      sameSite: true,
      httpOnly: true,
    })
    .send({ token })
}
