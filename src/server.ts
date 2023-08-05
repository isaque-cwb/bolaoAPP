import Fastfy from 'fastify'
import { PrismaClient } from '@prisma/client'
import cors from '@fastify/cors'
import { z } from 'zod'
import ShortUniqueId from 'short-unique-id'


const prisma = new PrismaClient({
    log: ['query']
})

async function bootstrap() {
    const fastify = Fastfy({
        logger: true,
    })

    await fastify.register(cors, {
        //aqui define se precisar uma url do front para permissão de acesso.
        origin: true
    })

    fastify.post('/pools', async (request, reply) => {

        const createPoolBody = z.object({
            title: z.string(),
        })
        const { title } = createPoolBody.parse(request.body)
        const generate = new ShortUniqueId({ length: 6 })
        const code = String(generate()).toUpperCase()
        await prisma.pool.create({
            data: {
                title,
                code
            }
        })

        reply.status(201).send({ code })

    })



    await fastify.listen({
        port: 3333,
        //host: '0.0.0.0'
    })


}


bootstrap()