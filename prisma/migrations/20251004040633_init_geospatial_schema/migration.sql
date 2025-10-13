/*
  Warnings:

  - You are about to drop the `adopciones` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `avistamientos` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `especies` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `expansiones` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `imagenes_mascotas` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `mascotas` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `paseadores` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `razas` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `regiones` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `roles` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `usuarios` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `usuarios_roles` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "public"."RegistrationMethod" AS ENUM ('GOOGLE', 'FACEBOOK', 'EMAIL', 'TWITTER');

-- CreateEnum
CREATE TYPE "public"."PetStatus" AS ENUM ('LOST', 'FOUND', 'ADOPTION', 'REUNITED');

-- CreateEnum
CREATE TYPE "public"."Gender" AS ENUM ('MALE', 'FEMALE', 'UNKNOWN');

-- DropForeignKey
ALTER TABLE "public"."adopciones" DROP CONSTRAINT "adopciones_mascota_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."avistamientos" DROP CONSTRAINT "avistamientos_mascota_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."avistamientos" DROP CONSTRAINT "avistamientos_usuario_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."expansiones" DROP CONSTRAINT "expansiones_region_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."imagenes_mascotas" DROP CONSTRAINT "imagenes_mascotas_mascota_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."mascotas" DROP CONSTRAINT "mascotas_especie_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."mascotas" DROP CONSTRAINT "mascotas_raza_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."mascotas" DROP CONSTRAINT "mascotas_usuario_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."paseadores" DROP CONSTRAINT "paseadores_usuario_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."razas" DROP CONSTRAINT "razas_especie_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."usuarios_roles" DROP CONSTRAINT "usuarios_roles_rol_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."usuarios_roles" DROP CONSTRAINT "usuarios_roles_usuario_id_fkey";

-- DropTable
DROP TABLE "public"."adopciones";

-- DropTable
DROP TABLE "public"."avistamientos";

-- DropTable
DROP TABLE "public"."especies";

-- DropTable
DROP TABLE "public"."expansiones";

-- DropTable
DROP TABLE "public"."imagenes_mascotas";

-- DropTable
DROP TABLE "public"."mascotas";

-- DropTable
DROP TABLE "public"."paseadores";

-- DropTable
DROP TABLE "public"."razas";

-- DropTable
DROP TABLE "public"."regiones";

-- DropTable
DROP TABLE "public"."roles";

-- DropTable
DROP TABLE "public"."usuarios";

-- DropTable
DROP TABLE "public"."usuarios_roles";

-- DropEnum
DROP TYPE "public"."MetodoRegistro";

-- CreateTable
CREATE TABLE "public"."User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "locationDescription" TEXT,
    "registrationMethod" "public"."RegistrationMethod" NOT NULL,
    "isAuthenticated" BOOLEAN DEFAULT false,
    "avatarUrl" TEXT,
    "acceptNotifications" BOOLEAN NOT NULL DEFAULT false,
    "notificationLat" DECIMAL(10,8),
    "notificationLon" DECIMAL(11,8),
    "notificationRadiusKm" DECIMAL(6,2),

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Role" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "Role_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."UserRole" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "roleId" TEXT NOT NULL,

    CONSTRAINT "UserRole_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Species" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Species_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Breed" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "speciesId" TEXT,

    CONSTRAINT "Breed_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Pet" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "age" INTEGER,
    "color" TEXT,
    "gender" "public"."Gender",
    "description" TEXT,
    "status" "public"."PetStatus" NOT NULL DEFAULT 'LOST',
    "lostDate" DATE NOT NULL,
    "lostLocationLat" DECIMAL(10,8) NOT NULL,
    "lostLocationLon" DECIMAL(11,8) NOT NULL,
    "lostLocationDetails" TEXT,
    "rewardAmount" DECIMAL(10,2),
    "ownerId" TEXT,
    "speciesId" TEXT,
    "breedId" TEXT,

    CONSTRAINT "Pet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."PetImage" (
    "id" TEXT NOT NULL,
    "petId" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "isPrimary" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "PetImage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Sighting" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMPTZ(6) NOT NULL,
    "sightingLat" DECIMAL(10,8) NOT NULL,
    "sightingLon" DECIMAL(11,8) NOT NULL,
    "description" TEXT,
    "photoUrl" TEXT,
    "petId" TEXT,
    "reporterId" TEXT,

    CONSTRAINT "Sighting_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Adoption" (
    "id" TEXT NOT NULL,
    "petId" TEXT NOT NULL,
    "requirements" TEXT,
    "contactInfo" TEXT,

    CONSTRAINT "Adoption_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Walker" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "regionId" TEXT,
    "experience" TEXT,
    "hourlyRate" DECIMAL(5,2),
    "availability" TEXT,
    "coverageArea" TEXT,

    CONSTRAINT "Walker_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Region" (
    "id" TEXT NOT NULL,
    "countryCode" TEXT NOT NULL,
    "countryName" TEXT NOT NULL,
    "department" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "isActive" BOOLEAN DEFAULT false,
    "activationDate" DATE,
    "latitude" DECIMAL(10,8),
    "longitude" DECIMAL(11,8),
    "coverageRadiusKm" DECIMAL(6,2),

    CONSTRAINT "Region_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Expansion" (
    "id" TEXT NOT NULL,
    "regionId" TEXT NOT NULL,
    "expansionDate" DATE NOT NULL,

    CONSTRAINT "Expansion_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "public"."User"("email");

-- CreateIndex
CREATE INDEX "User_email_idx" ON "public"."User"("email");

-- CreateIndex
CREATE INDEX "User_acceptNotifications_idx" ON "public"."User"("acceptNotifications");

-- CreateIndex
CREATE UNIQUE INDEX "Role_name_key" ON "public"."Role"("name");

-- CreateIndex
CREATE INDEX "Role_name_idx" ON "public"."Role"("name");

-- CreateIndex
CREATE INDEX "UserRole_userId_idx" ON "public"."UserRole"("userId");

-- CreateIndex
CREATE INDEX "UserRole_roleId_idx" ON "public"."UserRole"("roleId");

-- CreateIndex
CREATE UNIQUE INDEX "UserRole_userId_roleId_key" ON "public"."UserRole"("userId", "roleId");

-- CreateIndex
CREATE UNIQUE INDEX "Species_name_key" ON "public"."Species"("name");

-- CreateIndex
CREATE INDEX "Breed_speciesId_idx" ON "public"."Breed"("speciesId");

-- CreateIndex
CREATE UNIQUE INDEX "Breed_name_speciesId_key" ON "public"."Breed"("name", "speciesId");

-- CreateIndex
CREATE INDEX "Pet_speciesId_idx" ON "public"."Pet"("speciesId");

-- CreateIndex
CREATE INDEX "Pet_breedId_idx" ON "public"."Pet"("breedId");

-- CreateIndex
CREATE INDEX "Pet_ownerId_idx" ON "public"."Pet"("ownerId");

-- CreateIndex
CREATE INDEX "Pet_status_idx" ON "public"."Pet"("status");

-- CreateIndex
CREATE INDEX "Pet_lostLocationLat_lostLocationLon_idx" ON "public"."Pet"("lostLocationLat", "lostLocationLon");

-- CreateIndex
CREATE INDEX "PetImage_petId_idx" ON "public"."PetImage"("petId");

-- CreateIndex
CREATE INDEX "Sighting_petId_idx" ON "public"."Sighting"("petId");

-- CreateIndex
CREATE INDEX "Sighting_reporterId_idx" ON "public"."Sighting"("reporterId");

-- CreateIndex
CREATE INDEX "Sighting_date_idx" ON "public"."Sighting"("date");

-- CreateIndex
CREATE INDEX "Sighting_sightingLat_sightingLon_idx" ON "public"."Sighting"("sightingLat", "sightingLon");

-- CreateIndex
CREATE UNIQUE INDEX "Adoption_petId_key" ON "public"."Adoption"("petId");

-- CreateIndex
CREATE INDEX "Adoption_petId_idx" ON "public"."Adoption"("petId");

-- CreateIndex
CREATE UNIQUE INDEX "Walker_userId_key" ON "public"."Walker"("userId");

-- CreateIndex
CREATE INDEX "Walker_userId_idx" ON "public"."Walker"("userId");

-- CreateIndex
CREATE INDEX "Walker_regionId_idx" ON "public"."Walker"("regionId");

-- CreateIndex
CREATE INDEX "Region_isActive_idx" ON "public"."Region"("isActive");

-- CreateIndex
CREATE UNIQUE INDEX "Region_countryCode_city_key" ON "public"."Region"("countryCode", "city");

-- CreateIndex
CREATE INDEX "Expansion_regionId_idx" ON "public"."Expansion"("regionId");

-- AddForeignKey
ALTER TABLE "public"."UserRole" ADD CONSTRAINT "UserRole_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."UserRole" ADD CONSTRAINT "UserRole_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "public"."Role"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Breed" ADD CONSTRAINT "Breed_speciesId_fkey" FOREIGN KEY ("speciesId") REFERENCES "public"."Species"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Pet" ADD CONSTRAINT "Pet_speciesId_fkey" FOREIGN KEY ("speciesId") REFERENCES "public"."Species"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Pet" ADD CONSTRAINT "Pet_breedId_fkey" FOREIGN KEY ("breedId") REFERENCES "public"."Breed"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Pet" ADD CONSTRAINT "Pet_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "public"."User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."PetImage" ADD CONSTRAINT "PetImage_petId_fkey" FOREIGN KEY ("petId") REFERENCES "public"."Pet"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Sighting" ADD CONSTRAINT "Sighting_petId_fkey" FOREIGN KEY ("petId") REFERENCES "public"."Pet"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Sighting" ADD CONSTRAINT "Sighting_reporterId_fkey" FOREIGN KEY ("reporterId") REFERENCES "public"."User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Adoption" ADD CONSTRAINT "Adoption_petId_fkey" FOREIGN KEY ("petId") REFERENCES "public"."Pet"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Walker" ADD CONSTRAINT "Walker_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Walker" ADD CONSTRAINT "Walker_regionId_fkey" FOREIGN KEY ("regionId") REFERENCES "public"."Region"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Expansion" ADD CONSTRAINT "Expansion_regionId_fkey" FOREIGN KEY ("regionId") REFERENCES "public"."Region"("id") ON DELETE CASCADE ON UPDATE CASCADE;
