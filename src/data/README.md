# Datos de Prueba (normalizados)

Este directorio contiene datos normalizados para poblar la base de datos.

**Ubicación:** `src/data/`

## Archivos de Datos

### `fake_data.json`
Catálogos base con claves alineadas al schema:
- `species[]`: `{ id, name }`
- `breeds[]`: `{ id, name, speciesId }`
- `roles[]`: `{ id, name, description? }`
- `regions[]`: `{ id, countryCode, countryName, department, city, isActive?, activationDate?, latitude?, longitude?, coverageRadiusKm? }`
- `users[]`: `{ id, name, email, phone?, locationDescription?, registrationMethod, isAuthenticated?, avatarUrl? }`
- `userRoles[]`: `{ id, userId, roleId }`

#### Razas disponibles (ejemplos incluidos):
- Labrador, Golden Retriever, Pastor Alemán
- Siamés, Persa, Maine Coon
- Holandés Enano, Canario
- Bulldog, Criollo

#### Roles disponibles:
- admin, usuario, moderador, reporter, rescuer
- vet, shelter, donor, walker, adopter

### `mascotas_data.json`
Mascotas en formato Prisma:
- `pets[]`: `{ id, name?, age?, color?, gender?, description?, status, lostDate, lostLocationLat, lostLocationLon, lostLocationDetails?, rewardAmount?, ownerId?, speciesId?, breedId? }`

### `relaciones_data.json`
Relaciones normalizadas:
- `sightings[]`: `{ id, date, sightingLat, sightingLon, locationDescription?, description?, photoUrl?, petId?, reporterId? }`
- `adoptions[]`: `{ id, petId, requirements?, contactInfo? }`
- `petImages[]`: `{ id, petId, url, isPrimary? }`
- `walkers[]`: `{ id, userId, regionId?, experience?, hourlyRate?, availability?, coverageArea? }`
- `expansions[]`: `{ id, regionId, expansionDate }`

#### Contiene los datos relacionados (resumen legible):
- **15 avistamientos** con fechas, ubicaciones y descripciones
- **10 adopciones** con requisitos e información de contacto
- **20 imágenes** de mascotas (2 por mascota)
- **10 paseadores** con experiencia y tarifas
- **3 expansiones** de regiones

## Imágenes (Dog CEO)
- Si `photoUrl` o `url` están vacíos, el seed obtiene y cachea URLs desde la Dog CEO API al ejecutar.
- Fuente: https://dog.ceo/dog-api/

## Cómo Usar
```bash
pnpm ts-node prisma/cleanup.ts && pnpm ts-node prisma/seed.ts
```

## Notas
- Fechas ISO 8601, UUIDs válidos, y relaciones consistentes.
