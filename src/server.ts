import Fastify from "fastify";
import cors from "@fastify/cors";
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client"


dotenv.config();
const port: any = process.env.PORT;

const prisma = new PrismaClient();

const server = Fastify();

server.register(cors, {});


server.get('/', (request, reply) => {
    return "Servidor Exemplo on line...";
});

server.post("/adicionar", Add);
server.get('/listar', listarTodos);
server.put('/atualizar', editarCaracteristicas);
server.get('/buscar', buscaCaracteristicas);
server.delete('/deletar', deletarCaracteristicas);


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

    const adicionar = await prisma.orca.create({
        data: { 
            habitat,
            comidaFavorita,
            descricao,
            sexo,
            domestico,
        },
    });

    return response.send("Caracteristica salva com sucesso!");

}

async function listarTodos() {
    const listar = await prisma.orca.findMany()
    return listar;

}

async function buscaCaracteristicas(request: any, response: any) {
    const { q, query } = request.params;

    if (typeof q !== "string") {
        throw new Error(response.send("Busca Inválida"));
      }

    const buscaOrca = await prisma.orca.findMany({
        where: {
            OR: [
            {
                habitat: {
                    contains: q,
                    mode: "insensitive",
                },

            },
            {
                comidaFavorita: {
                    contains: q,
                    mode: "insensitive",
                },
            },
            {
                descricao: {
                    contains: q,
                    mode: "insensitive",
                  },
                },
                {
                  sexo: {
                    contains: q,
                    mode: "insensitive",
                  },
                
            },
        ],
     },
    });

    return response.send(buscaOrca);

}

async function editarCaracteristicas(request: any, response: any) {
    const { id } = request.params;
    const {
      habitat,
      comidaFavorita,
      descricao,
      sexo,
      domestico,
    } = request.body;
const editarOrca = await prisma.orca.update({
    where: {
        id: id,
    },
    data:{
            habitat: habitat,
            comidaFavorita: comidaFavorita,
            descricao: descricao,
            sexo: sexo,
            domestico: domestico
    },
});

return response.send("Alterado com sucesso!");
}

async function deletarCaracteristicas(request: any, response: any) {
    const { id } = request.params;
  
    const deletarOrca = await prisma.orca.delete({
      where: {
        id: Number(id),
      },
    });
  
    return response.send("Excluída com sucesso!");
  };
    