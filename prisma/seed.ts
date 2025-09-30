import { PrismaClient } from '@prisma/client'
import fs from 'fs'
import path from 'path'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Iniciando seed de la base de datos...')

  // Leer archivos JSON
  const fakeData = JSON.parse(fs.readFileSync(path.join(__dirname, '../src/data/fake_data.json'), 'utf8'))
  const mascotasData = JSON.parse(fs.readFileSync(path.join(__dirname, '../src/data/mascotas_data.json'), 'utf8'))
  const relacionesData = JSON.parse(fs.readFileSync(path.join(__dirname, '../src/data/relaciones_data.json'), 'utf8'))

  try {

    
    // 1. Crear especies
    console.log('📝 Creando especies...')
    for (const especie of fakeData.especies) {
      await prisma.especies.upsert({
        where: { id: especie.id },
        update: {},
        create: especie
      })
    }

    // 2. Crear razas
    console.log('📝 Creando razas...')
    for (const raza of fakeData.razas) {
      await prisma.razas.upsert({
        where: { id: raza.id },
        update: {},
        create: raza
      })
    }

    // 3. Crear roles
    console.log('📝 Creando roles...')
    for (const rol of fakeData.roles) {
      await prisma.roles.upsert({
        where: { id: rol.id },
        update: {},
        create: rol
      })
    }

    // 4. Crear regiones
    console.log('📝 Creando regiones...')
    for (const region of fakeData.regiones) {
      await prisma.regiones.upsert({
        where: { id: region.id },
        update: {},
        create: region
      })
    }

    // 5. Crear usuarios
    console.log('📝 Creando usuarios...')
    for (const usuario of fakeData.usuarios) {
      await prisma.usuarios.upsert({
        where: { id: usuario.id },
        update: {},
        create: usuario
      })
    }

    // 6. Crear usuarios_roles
    console.log('📝 Creando usuarios_roles...')
    for (const usuarioRol of fakeData.usuarios_roles) {
      await prisma.usuarios_roles.upsert({
        where: { id: usuarioRol.id },
        update: {},
        create: usuarioRol
      })
    }

    // 7. Crear mascotas
    console.log('📝 Creando mascotas...')
    for (const mascota of mascotasData.mascotas) {
      await prisma.mascotas.upsert({
        where: { id: mascota.id },
        update: {},
        create: mascota
      })
    }

    // 8. Crear avistamientos
    console.log('📝 Creando avistamientos...')
    for (const avistamiento of relacionesData.avistamientos) {
      await prisma.avistamientos.upsert({
        where: { id: avistamiento.id },
        update: {},
        create: avistamiento
      })
    }

    // 9. Crear adopciones
    console.log('📝 Creando adopciones...')
    for (const adopcion of relacionesData.adopciones) {
      await prisma.adopciones.upsert({
        where: { id: adopcion.id },
        update: {},
        create: adopcion
      })
    }

    // 10. Crear imágenes de mascotas
    console.log('📝 Creando imágenes de mascotas...')
    for (const imagen of relacionesData.imagenes_mascotas) {
      await prisma.imagenes_mascotas.upsert({
        where: { id: imagen.id },
        update: {},
        create: imagen
      })
    }

    // 11. Crear paseadores
    console.log('📝 Creando paseadores...')
    for (const paseador of relacionesData.paseadores) {
      await prisma.paseadores.upsert({
        where: { id: paseador.id },
        update: {},
        create: paseador
      })
    }

    // 12. Crear expansiones
    console.log('📝 Creando expansiones...')
    for (const expansion of relacionesData.expansiones) {
      await prisma.expansiones.upsert({
        where: { id: expansion.id },
        update: {},
        create: expansion
      })
    }

    console.log('✅ Seed completado exitosamente!')
    console.log('📊 Resumen de datos creados:')
    console.log(`   - ${fakeData.especies.length} especies`)
    console.log(`   - ${fakeData.razas.length} razas`)
    console.log(`   - ${fakeData.roles.length} roles`)
    console.log(`   - ${fakeData.regiones.length} regiones`)
    console.log(`   - ${fakeData.usuarios.length} usuarios`)
    console.log(`   - ${fakeData.usuarios_roles.length} asignaciones de roles`)
    console.log(`   - ${mascotasData.mascotas.length} mascotas`)
    console.log(`   - ${relacionesData.avistamientos.length} avistamientos`)
    console.log(`   - ${relacionesData.adopciones.length} adopciones`)
    console.log(`   - ${relacionesData.imagenes_mascotas.length} imágenes`)
    console.log(`   - ${relacionesData.paseadores.length} paseadores`)
    console.log(`   - ${relacionesData.expansiones.length} expansiones`)

  } catch (error) {
    console.error('❌ Error durante el seed:', error)
    throw error
  }
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
