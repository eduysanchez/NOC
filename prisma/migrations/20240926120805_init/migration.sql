-- CreateEnum
CREATE TYPE "SeverityLevel" AS ENUM ('LOW', 'MEDIUM', 'HIGH');

-- CreateTable
CREATE TABLE "LogModel" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "level" "SeverityLevel" NOT NULL,
    "message" TEXT NOT NULL,
    "origin" TEXT NOT NULL,

    CONSTRAINT "LogModel_pkey" PRIMARY KEY ("id")
);
