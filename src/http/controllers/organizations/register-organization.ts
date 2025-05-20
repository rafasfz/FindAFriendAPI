import { organizationDataSchema } from '@/src/entities/organization-entity'
import { makeRegisterOrganizationUseCase } from '@/src/use-cases/organizations/factories/make-register-authenticate-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function registerOrganization(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const organizationData = organizationDataSchema.parse(request.body)

  const { organization } = await makeRegisterOrganizationUseCase().execute({
    organization: organizationData,
  })

  return reply.status(201).send({ organization })
}
