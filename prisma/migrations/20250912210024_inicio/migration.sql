-- CreateEnum
CREATE TYPE "public"."MetodoRegistro" AS ENUM ('GOOGLE', 'FACEBOOK', 'EMAIL', 'TWITTER');

-- CreateTable
CREATE TABLE "public"."adopciones" (
    "id" TEXT NOT NULL,
    "mascota_id" TEXT,
    "requisitos" TEXT,
    "informacion_contacto" TEXT,

    CONSTRAINT "adopciones_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."avistamientos" (
    "id" TEXT NOT NULL,
    "fecha" TIMESTAMPTZ(6) NOT NULL,
    "ubicacion" TEXT NOT NULL,
    "descripcion" TEXT,
    "fotografia" TEXT,
    "mascota_id" TEXT,
    "usuario_id" TEXT,

    CONSTRAINT "avistamientos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."especies" (
    "id" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,

    CONSTRAINT "especies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."expansiones" (
    "id" TEXT NOT NULL,
    "region_id" TEXT,
    "fecha_expansion" DATE NOT NULL,

    CONSTRAINT "expansiones_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."imagenes_mascotas" (
    "id" TEXT NOT NULL,
    "mascota_id" TEXT,
    "url_imagen" TEXT NOT NULL,

    CONSTRAINT "imagenes_mascotas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."mascotas" (
    "id" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "edad" INTEGER,
    "color" TEXT,
    "descripcion" TEXT,
    "fecha_perdida" DATE NOT NULL,
    "lugar_perdida" TEXT NOT NULL,
    "recompensa" DECIMAL,
    "usuario_id" TEXT,
    "especie_id" TEXT,
    "raza_id" TEXT,
    "esta_perdida" BOOLEAN DEFAULT false,
    "detalle_perdida" TEXT,

    CONSTRAINT "mascotas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."paseadores" (
    "id" TEXT NOT NULL,
    "usuario_id" TEXT,
    "experiencia" TEXT,
    "tarifas" TEXT,
    "disponibilidad" TEXT,
    "zona_cobertura" TEXT,

    CONSTRAINT "paseadores_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."razas" (
    "id" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "especie_id" TEXT,

    CONSTRAINT "razas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."regiones" (
    "id" TEXT NOT NULL,
    "pais_codigo" TEXT NOT NULL,
    "pais_nombre" TEXT NOT NULL,
    "departamento" TEXT NOT NULL,
    "ciudad" TEXT NOT NULL,
    "estado" BOOLEAN DEFAULT true,
    "fecha_activacion" DATE,
    "latitud" DECIMAL,
    "longitud" DECIMAL,
    "radio_cobertura_km" DECIMAL,

    CONSTRAINT "regiones_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."usuarios" (
    "id" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "telefono" TEXT,
    "ubicacion" TEXT,
    "metodo_registro" TEXT NOT NULL,
    "autenticado" BOOLEAN DEFAULT false,
    "avatar_url" TEXT,

    CONSTRAINT "usuarios_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "especies_nombre_key" ON "public"."especies"("nombre");

-- CreateIndex
CREATE UNIQUE INDEX "usuarios_email_key" ON "public"."usuarios"("email");

-- AddForeignKey
ALTER TABLE "public"."adopciones" ADD CONSTRAINT "adopciones_mascota_id_fkey" FOREIGN KEY ("mascota_id") REFERENCES "public"."mascotas"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."avistamientos" ADD CONSTRAINT "avistamientos_mascota_id_fkey" FOREIGN KEY ("mascota_id") REFERENCES "public"."mascotas"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."avistamientos" ADD CONSTRAINT "avistamientos_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "public"."usuarios"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."expansiones" ADD CONSTRAINT "expansiones_region_id_fkey" FOREIGN KEY ("region_id") REFERENCES "public"."regiones"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."imagenes_mascotas" ADD CONSTRAINT "imagenes_mascotas_mascota_id_fkey" FOREIGN KEY ("mascota_id") REFERENCES "public"."mascotas"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."mascotas" ADD CONSTRAINT "mascotas_especie_id_fkey" FOREIGN KEY ("especie_id") REFERENCES "public"."especies"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."mascotas" ADD CONSTRAINT "mascotas_raza_id_fkey" FOREIGN KEY ("raza_id") REFERENCES "public"."razas"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."mascotas" ADD CONSTRAINT "mascotas_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "public"."usuarios"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."paseadores" ADD CONSTRAINT "paseadores_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "public"."usuarios"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."razas" ADD CONSTRAINT "razas_especie_id_fkey" FOREIGN KEY ("especie_id") REFERENCES "public"."especies"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
