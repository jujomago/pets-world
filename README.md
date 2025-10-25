# 🐾 Mascotas Perdidas & Comunidad

> Una plataforma integral para el bienestar animal. Conecta con tu comunidad para encontrar mascotas perdidas, facilitar adopciones responsables y descubrir servicios de confianza para tus compañeros.

## ✨ Características Clave

- **Alertas de Mascotas Perdidas:** Publica y visualiza anuncios de mascotas extraviadas con detalles, fotos y ubicación precisa.
- **Notificaciones por Geolocalización:** Configura tu "zona de alerta" (un punto central y un radio en km) para recibir notificaciones instantáneas sobre mascotas perdidas o encontradas cerca de ti.
- **Reporte de Avistamientos:** ¿Viste un animalito desorientado? Repórtalo con una foto y su ubicación para ayudar a su familia a encontrarlo.
- **Módulo de Adopción:** Publica perfiles de mascotas que buscan un hogar, detallando su historia y los requisitos para su adopción.
- **Directorio de Servicios:** Encuentra profesionales como paseadores de perros en tu área, con perfiles detallados y valoraciones.
- **Gestión de Perfil:** Cada usuario puede gestionar sus mascotas, sus publicaciones y sus preferencias de notificación.

## 🚀 Stack Tecnológico

- **Framework:** Next.js (App Router)
- **Base de Datos:** PostgreSQL
- **ORM:** Prisma
- **Autenticación:** NextAuth.js (con providers de Google y Facebook)
- **Estilos:** Tailwind CSS
- **Lenguaje:** TypeScript
- **Gestión de Imágenes:** Cloudinary

## 🏁 Primeros Pasos (Getting Started)

Sigue estos pasos para levantar el entorno de desarrollo local.

### 1. Prerrequisitos

Asegúrate de tener instalado:

- Node.js (v18 o superior)
- `pnpm` (recomendado), `npm` o `yarn`
- Una base de datos PostgreSQL corriendo localmente o accesible.

### 2. Instalación

```bash
# Clona el repositorio
git clone https://github.com/tu-usuario/tu-repositorio.git
cd tu-repositorio

# Instala las dependencias
pnpm install
```

### 3. Configuración de Entorno

Crea un archivo `.env` en la raíz del proyecto. Puedes copiar `.env.example` si existe, o usar esta plantilla:

```env
# Base de Datos - Prisma
# Reemplaza con tus credenciales de PostgreSQL
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=public"

# Autenticación - NextAuth.js
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="USA_UN_SECRET_SEGURO_AQUI" # Genera uno con: openssl rand -hex 32

# Providers de OAuth (llena los que vayas a usar)
GOOGLE_CLIENT_ID="TU_CLIENT_ID_DE_GOOGLE"
GOOGLE_CLIENT_SECRET="TU_CLIENT_SECRET_DE_GOOGLE"
FACEBOOK_CLIENT_ID="TU_CLIENT_ID_DE_FACEBOOK"
FACEBOOK_CLIENT_SECRET="TU_CLIENT_SECRET_DE_FACEBOOK"

# Almacenamiento de Imágenes - Cloudinary
CLOUDINARY_CLOUD_NAME="TU_CLOUD_NAME"
CLOUDINARY_API_KEY="TU_API_KEY"
CLOUDINARY_API_SECRET="TU_API_SECRET"
```

### 4. Base de Datos

Aplica las migraciones para crear la estructura de la base de datos definida en `schema.prisma`.

```bash
pnpm prisma migrate dev
```

Este comando también generará el cliente de Prisma (`@prisma/client`).

### 5. Iniciar la Aplicación

¡Todo listo! Ejecuta el servidor de desarrollo.

```bash
pnpm dev
```

Abre http://localhost:3000 en tu navegador para ver la aplicación en funcionamiento.
