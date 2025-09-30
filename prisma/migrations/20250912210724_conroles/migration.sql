-- CreateTable
CREATE TABLE "public"."roles" (
    "id" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "descripcion" TEXT,

    CONSTRAINT "roles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."usuarios_roles" (
    "id" TEXT NOT NULL,
    "usuario_id" TEXT,
    "rol_id" TEXT,

    CONSTRAINT "usuarios_roles_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "usuarios_roles_usuario_id_rol_id_key" ON "public"."usuarios_roles"("usuario_id", "rol_id");

-- AddForeignKey
ALTER TABLE "public"."usuarios_roles" ADD CONSTRAINT "usuarios_roles_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "public"."usuarios"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."usuarios_roles" ADD CONSTRAINT "usuarios_roles_rol_id_fkey" FOREIGN KEY ("rol_id") REFERENCES "public"."roles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
