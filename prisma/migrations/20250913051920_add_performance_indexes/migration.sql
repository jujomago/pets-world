/*
  Warnings:

  - The primary key for the `avistamientos` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `avistamientos` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `usuarios_roles` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `usuarios_roles` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "public"."avistamientos" DROP CONSTRAINT "avistamientos_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "avistamientos_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "public"."usuarios_roles" DROP CONSTRAINT "usuarios_roles_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "usuarios_roles_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE INDEX "idx_adopciones_mascota_id" ON "public"."adopciones"("mascota_id");

-- CreateIndex
CREATE INDEX "idx_avistamientos_mascota_id" ON "public"."avistamientos"("mascota_id");

-- CreateIndex
CREATE INDEX "idx_avistamientos_usuario_id" ON "public"."avistamientos"("usuario_id");

-- CreateIndex
CREATE INDEX "idx_avistamientos_fecha" ON "public"."avistamientos"("fecha");

-- CreateIndex
CREATE INDEX "idx_avistamientos_ubicacion" ON "public"."avistamientos"("ubicacion");

-- CreateIndex
CREATE INDEX "idx_imagenes_mascota_id" ON "public"."imagenes_mascotas"("mascota_id");

-- CreateIndex
CREATE INDEX "idx_especie_id" ON "public"."mascotas"("especie_id");

-- CreateIndex
CREATE INDEX "idx_raza_id" ON "public"."mascotas"("raza_id");

-- CreateIndex
CREATE INDEX "idx_esta_perdida" ON "public"."mascotas"("esta_perdida");

-- CreateIndex
CREATE INDEX "idx_fecha_perdida" ON "public"."mascotas"("fecha_perdida");

-- CreateIndex
CREATE INDEX "idx_lugar_perdida" ON "public"."mascotas"("lugar_perdida");

-- CreateIndex
CREATE INDEX "idx_usuario_id" ON "public"."mascotas"("usuario_id");
