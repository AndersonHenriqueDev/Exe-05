import Fastify from "fastify";
import cors from "@fastify/cors";
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client"

dotenv.config();
const port: any = process.env.PORT;

const prisma = new PrismaClient();

const server = Fastify();

server.register(cors, {
    // Opções
});

server.get('/', (request, reply) => {
    return "Servidor Exemplo on line...";
});

server.post('/', Add);


server.listen({ port }, (error, address) => {
if (error) {
    console.error(error);
    process.exit(1);
} else {
    console.log(`Servidor rodando em ${address}`);
}
});

async function Add(request: any, response: any) {
    const { habitat, comidaFavorita, descricao, sexo, domestico } = request.body;

}