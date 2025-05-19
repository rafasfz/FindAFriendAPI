-- CreateEnum
CREATE TYPE "PetSize" AS ENUM ('SMALL', 'MEDIUM', 'LARGE');

-- CreateEnum
CREATE TYPE "PetLifeStage" AS ENUM ('YOUNG', 'ADULT', 'SENIOR');

-- CreateEnum
CREATE TYPE "PetEnergyLevel" AS ENUM ('HIGH', 'MEDIUM', 'LOW');

-- CreateEnum
CREATE TYPE "PetSuitableEnviroment" AS ENUM ('LARGE', 'SMALL');

-- CreateTable
CREATE TABLE "pets" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "life_stage" "PetLifeStage" NOT NULL,
    "size" "PetSize" NOT NULL,
    "energy_level" "PetEnergyLevel" NOT NULL,
    "suitable_environment" "PetSuitableEnviroment" NOT NULL,
    "requirements" TEXT[],
    "photos_url" TEXT[],

    CONSTRAINT "pets_pkey" PRIMARY KEY ("id")
);
