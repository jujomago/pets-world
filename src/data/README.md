# Datos de Prueba - Mascotas Perdidas

Este directorio contiene datos fake para poblar la base de datos de la aplicación de mascotas perdidas.

**Ubicación:** `src/data/`

## Archivos de Datos

### `fake_data.json`
Contiene los datos base del sistema:
- **4 especies** (Perro, Gato, Conejo, Ave)
- **8 razas** (Labrador, Golden Retriever, Pastor Alemán, Siamés, Persa, Maine Coon, Holandés Enano, Canario)
- **3 roles** (admin, usuario, moderador)
- **3 regiones** (Bogotá, Medellín, Cali)
- **10 usuarios** con datos completos
- **10 usuarios_roles** (asignaciones de roles)

### `mascotas_data.json`
Contiene las mascotas del sistema:
- **30 mascotas** con datos realistas
- Mezcla de mascotas perdidas y encontradas
- Diferentes especies, razas, edades y colores
- Ubicaciones en las 3 ciudades principales
- Recompensas variadas

### `relaciones_data.json`
Contiene los datos relacionados:
- **15 avistamientos** con fechas, ubicaciones y descripciones
- **10 adopciones** con requisitos e información de contacto
- **20 imágenes** de mascotas (2 por mascota)
- **10 paseadores** con experiencia y tarifas
- **3 expansiones** de regiones

## Cómo Usar

### Opción 1: Script de Seed (Recomendado)
```bash
# Ejecutar solo el seed
npm run db:seed

# Resetear la BD y ejecutar seed
npm run db:reset
```

### Opción 2: Comandos Prisma
```bash
# Generar el cliente de Prisma
npx prisma generate

# Ejecutar migraciones
npx prisma migrate dev

# Ejecutar el seed
npx prisma db seed
```

## Cómo Borrar los Datos Fake

### Opción 1: Limpieza selectiva (Recomendado)
```bash
# Borrar solo los datos fake (mantiene otros datos)
npm run db:cleanup
```

### Opción 2: Reset completo
```bash
# Borra toda la BD y la recrea sin datos
npx prisma migrate reset --force
```

### Opción 3: Borrado manual por tabla
```sql
-- Conectarse a la BD y ejecutar:
DELETE FROM avistamientos WHERE id IN ('id1', 'id2', ...);
DELETE FROM adopciones WHERE id IN ('id1', 'id2', ...);
DELETE FROM imagenes_mascotas WHERE id IN ('id1', 'id2', ...);
-- ... etc
```

## Características de los Datos

✅ **Compatibles con Prisma** - Todos los campos coinciden con el esquema
✅ **Relaciones correctas** - Foreign keys válidos entre tablas
✅ **Datos realistas** - Nombres, ubicaciones y descripciones colombianas
✅ **Variedad** - Diferentes estados, fechas y tipos de datos
✅ **UUIDs válidos** - Formato correcto para PostgreSQL

## Estructura de Datos

Los datos están organizados de manera que respetan las dependencias:
1. **Datos base** (especies, razas, roles, regiones)
2. **Usuarios** y sus roles
3. **Mascotas** (dependen de especies, razas y usuarios)
4. **Datos relacionados** (avistamientos, adopciones, imágenes, paseadores)

## Notas

- Los datos usan UUIDs reales para mantener consistencia
- Las fechas están en formato ISO 8601
- Los precios están en pesos colombianos
- Las ubicaciones son reales de Colombia
