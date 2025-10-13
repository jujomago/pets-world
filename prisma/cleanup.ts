import { PrismaClient } from '@prisma/client'
import fs from 'fs'
import path from 'path'

const prisma = new PrismaClient()

async function main() {
  console.log('🧹 Iniciando limpieza de datos fake...')

  

  try {
    // Leer archivos JSON para obtener los IDs de los datos fake
    const fakeData = JSON.parse(fs.readFileSync(path.join(__dirname, '../src/data/fake_data.json'), 'utf8'))
    const mascotasData = JSON.parse(fs.readFileSync(path.join(__dirname, '../src/data/mascotas_data.json'), 'utf8'))
    const relacionesData = JSON.parse(fs.readFileSync(path.join(__dirname, '../src/data/relaciones_data.json'), 'utf8'))

    // Obtener todos los IDs usando SOLO el formato normalizado
    const fakeIds = {
      especies: (fakeData.species || []).map((e: { id: string }) => e.id),
      razas: (fakeData.breeds || []).map((r: { id: string }) => r.id),
      roles: (fakeData.roles || []).map((r: { id: string }) => r.id),
      regiones: (fakeData.regions || []).map((r: { id: string }) => r.id),
      usuarios: (fakeData.users || []).map((u: { id: string }) => u.id),
      usuarios_roles: (fakeData.userRoles || []).map((ur: { id: number }) => ur.id),
      mascotas: (mascotasData.pets || []).map((m: { id: string }) => m.id),
      avistamientos: (relacionesData.sightings || []).map((a: { id: number }) => a.id),
      adopciones: (relacionesData.adoptions || []).map((a: { id: string }) => a.id),
      imagenes_mascotas: (relacionesData.petImages || []).map((i: { id: string }) => i.id),
      paseadores: (relacionesData.walkers || []).map((p: { id: string }) => p.id),
      expansiones: (relacionesData.expansions || []).map((e: { id: string }) => e.id)
    }

    // Borrar en orden inverso (respetando foreign keys)
    console.log('🗑️ Borrando avistamientos...')
    await prisma.sighting.deleteMany({
      where: { id: { in: fakeIds.avistamientos } }
    })

    console.log('🗑️ Borrando adopciones...')
    await prisma.adoption.deleteMany({
      where: { id: { in: fakeIds.adopciones } }
    })

    console.log('🗑️ Borrando imágenes de mascotas...')
    await prisma.petImage.deleteMany({
      where: { id: { in: fakeIds.imagenes_mascotas } }
    })

    console.log('🗑️ Borrando paseadores...')
    await prisma.walker.deleteMany({
      where: { id: { in: fakeIds.paseadores } }
    })

    console.log('🗑️ Borrando expansiones...')
    await prisma.expansion.deleteMany({
      where: { id: { in: fakeIds.expansiones } }
    })

    console.log('🗑️ Borrando mascotas...')
    await prisma.pet.deleteMany({
      where: { id: { in: fakeIds.mascotas } }
    })

    console.log('🗑️ Borrando usuarios_roles...')
    await prisma.userRole.deleteMany({
      where: { id: { in: fakeIds.usuarios_roles } }
    })

    console.log('🗑️ Borrando usuarios...')
    await prisma.user.deleteMany({
      where: { id: { in: fakeIds.usuarios } }
    })

    console.log('🗑️ Borrando razas...')
    await prisma.breed.deleteMany({
      where: { id: { in: fakeIds.razas } }
    })

    console.log('🗑️ Borrando especies...')
    await prisma.species.deleteMany({
      where: { id: { in: fakeIds.especies } }
    })

    console.log('🗑️ Borrando roles...')
    await prisma.role.deleteMany({
      where: { id: { in: fakeIds.roles } }
    })

    console.log('🗑️ Borrando regiones...')
    await prisma.region.deleteMany({
      where: { id: { in: fakeIds.regiones } }
    })

    console.log('✅ Limpieza completada exitosamente!')
    console.log('📊 Datos fake eliminados:')
    console.log(`   - ${fakeIds.especies.length} especies`)
    console.log(`   - ${fakeIds.razas.length} razas`)
    console.log(`   - ${fakeIds.roles.length} roles`)
    console.log(`   - ${fakeIds.regiones.length} regiones`)
    console.log(`   - ${fakeIds.usuarios.length} usuarios`)
    console.log(`   - ${fakeIds.usuarios_roles.length} asignaciones de roles`)
    console.log(`   - ${fakeIds.mascotas.length} mascotas`)
    console.log(`   - ${fakeIds.avistamientos.length} avistamientos`)
    console.log(`   - ${fakeIds.adopciones.length} adopciones`)
    console.log(`   - ${fakeIds.imagenes_mascotas.length} imágenes`)
    console.log(`   - ${fakeIds.paseadores.length} paseadores`)
    console.log(`   - ${fakeIds.expansiones.length} expansiones`)

  } catch (error) {
    console.error('❌ Error durante la limpieza:', error)
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
