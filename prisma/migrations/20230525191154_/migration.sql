-- CreateTable
CREATE TABLE "Orca" (
    "id" SERIAL NOT NULL,
    "habitat" TEXT NOT NULL,
    "comidaFavorita" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "sexo" TEXT NOT NULL,
    "domestico" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Orca_pkey" PRIMARY KEY ("id")
);
