import { PrismaClient } from '@prisma/client'
import fs from 'fs'
import path from 'path'
import { randomUUID } from 'crypto'
import https from 'https'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Iniciando seed de la base de datos...')

  // Leer archivos JSON
  const fakePath = path.join(__dirname, '../src/data/fake_data.json')
  const mascotasPath = path.join(__dirname, '../src/data/mascotas_data.json')
  const relacionesPath = path.join(__dirname, '../src/data/relaciones_data.json')
  const fakeData = JSON.parse(fs.readFileSync(fakePath, 'utf8'))
  const mascotasData = JSON.parse(fs.readFileSync(mascotasPath, 'utf8'))
  const relacionesData = JSON.parse(fs.readFileSync(relacionesPath, 'utf8'))

  // Helper to fetch a single Dog CEO image URL
  const fetchDogImage = (): Promise<string> => {
    return new Promise((resolve, reject) => {
      https.get('https://dog.ceo/api/breeds/image/random', (res) => {
        let data = ''
        res.on('data', (chunk) => (data += chunk))
        res.on('end', () => {
          try {
            const json = JSON.parse(data)
            if (json && json.status === 'success' && typeof json.message === 'string') {
              resolve(json.message)
            } else {
              resolve(`https://images.dog.ceo/breeds/hound-afghan/n02088094_1003.jpg`)
            }
          } catch (e) {
            resolve(`https://images.dog.ceo/breeds/hound-afghan/n02088094_1003.jpg`)
          }
        })
      }).on('error', () => resolve(`https://images.dog.ceo/breeds/hound-afghan/n02088094_1003.jpg`))
    })
  }

  // Fill and cache missing image URLs in relaciones_data.json
  const ensureImageUrlsCached = async () => {
    let changed = false
    const rel = relacionesData

    const petImagesArr = Array.isArray(rel.petImages) ? rel.petImages : []
    for (const img of petImagesArr) {
      if (!img.url || typeof img.url !== 'string' || img.url.trim() === '') {
        img.url = await fetchDogImage()
        changed = true
      }
    }

    const sightingsArr = Array.isArray(rel.sightings) ? rel.sightings : []
    for (const s of sightingsArr) {
      if (!s.photoUrl || typeof s.photoUrl !== 'string' || s.photoUrl.trim() === '') {
        s.photoUrl = await fetchDogImage()
        changed = true
      }
    }

    if (changed) {
      fs.writeFileSync(relacionesPath, JSON.stringify(rel, null, 2), 'utf8')
      console.log('📸 Cached Dog CEO image URLs into relaciones_data.json')
    }
  }

  try {
    // Cache images before inserting
    await ensureImageUrlsCached()
    // Utilidades
    const cityCenter: Record<string, { lat: number, lon: number }> = {
      'Bogotá': { lat: 4.711, lon: -74.0721 },
      'Medellín': { lat: 6.2442, lon: -75.5812 },
      'Cali': { lat: 3.4516, lon: -76.532 },
    }
    const pickCityCenter = (text: string): { lat: number, lon: number } => {
      if (!text) return cityCenter['Bogotá']
      if (text.toLowerCase().includes('medell')) return cityCenter['Medellín']
      if (text.toLowerCase().includes('cali')) return cityCenter['Cali']
      return cityCenter['Bogotá']
    }
    const jitter = (value: number, range: number) => value + (Math.random() * 2 - 1) * range
    const toBool = (v: any) => Boolean(v)
    const toNum = (v: any) => (typeof v === 'number' ? v : Number(v))

    // 1) Species
    console.log('📝 Creando especies...')
    const speciesInput = (fakeData.species || []).map((e: any) => ({ id: e.id, name: e.name }))
    // Completar hasta 10 si faltan
    for (let i = speciesInput.length; i < 10; i++) {
      speciesInput.push({ id: randomUUID(), name: `Especie ${i + 1}` })
    }
    for (const s of speciesInput) {
      await prisma.species.upsert({ where: { id: s.id }, update: {}, create: s })
    }

    // 2) Breeds
    console.log('📝 Creando razas...')
    const breedsInput = (fakeData.breeds || []).map((r: any) => ({ id: r.id, name: r.name, speciesId: r.speciesId }))
    for (let i = breedsInput.length; i < 10; i++) {
      // asociar circularmente especies existentes
      const speciesIdx = i % speciesInput.length
      breedsInput.push({ id: randomUUID(), name: `Raza ${i + 1}`, speciesId: speciesInput[speciesIdx].id })
    }
    for (const b of breedsInput) {
      await prisma.breed.upsert({ where: { id: b.id }, update: {}, create: b })
    }

    // 3) Roles
    console.log('📝 Creando roles...')
    const rolesInput = (fakeData.roles || []).map((r: any) => ({ id: r.id, name: r.name, description: r.description }))
    for (let i = rolesInput.length; i < 10; i++) {
      rolesInput.push({ id: randomUUID(), name: `role_${i + 1}`, description: `Rol auto ${i + 1}` })
    }
    for (const r of rolesInput) {
      await prisma.role.upsert({ where: { id: r.id }, update: {}, create: r })
    }

    // 4) Regions
    console.log('📝 Creando regiones...')
    const regionsInput = (fakeData.regions || []).map((rg: any) => ({
      id: rg.id,
      countryCode: rg.countryCode,
      countryName: rg.countryName,
      department: rg.department,
      city: rg.city,
      isActive: toBool(rg.isActive),
      activationDate: rg.activationDate ? new Date(rg.activationDate) : undefined,
      latitude: rg.latitude != null ? toNum(rg.latitude) : undefined,
      longitude: rg.longitude != null ? toNum(rg.longitude) : undefined,
      coverageRadiusKm: rg.coverageRadiusKm != null ? toNum(rg.coverageRadiusKm) : undefined
    }))
    for (let i = regionsInput.length; i < 10; i++) {
      const city = `Ciudad_${i + 1}`
      regionsInput.push({
        id: randomUUID(),
        countryCode: 'CO',
        countryName: 'Colombia',
        department: `Depto_${i + 1}`,
        city,
        isActive: i % 2 === 0,
        activationDate: new Date('2024-01-01T00:00:00Z'),
        latitude: jitter(4.5, 1),
        longitude: jitter(-74.1, 1),
        coverageRadiusKm: 30
      })
    }
    for (const rg of regionsInput) {
      await prisma.region.upsert({ where: { id: rg.id }, update: {}, create: rg })
    }

    // 5) Users
    console.log('📝 Creando usuarios...')
    const usersInput = (fakeData.users || []).map((u: any) => ({
      id: u.id,
      name: u.name,
      email: u.email,
      phone: u.phone,
      locationDescription: u.locationDescription,
      registrationMethod: u.registrationMethod,
      isAuthenticated: toBool(u.isAuthenticated),
      avatarUrl: u.avatarUrl
    }))
    for (let i = usersInput.length; i < 10; i++) {
      usersInput.push({
        id: randomUUID(),
        name: `Usuario ${i + 1}`,
        email: `user${i + 1}@demo.com`,
        phone: `+57 300 ${1000000 + i}`,
        locationDescription: ['Bogotá', 'Medellín', 'Cali'][i % 3],
        registrationMethod: ['GOOGLE', 'FACEBOOK', 'EMAIL', 'TWITTER'][i % 4],
        isAuthenticated: true,
        avatarUrl: `https://i.pravatar.cc/150?u=${i + 1}`
      })
    }
    for (const u of usersInput) {
      await prisma.user.upsert({ where: { id: u.id }, update: {}, create: u })
    }

    // 6) UserRoles
    console.log('📝 Creando usuarios_roles...')
    const userRolesInput = (fakeData.userRoles || []).map((ur: any) => ({ id: ur.id, userId: ur.userId, roleId: ur.roleId }))
    for (let i = userRolesInput.length; i < 10; i++) {
      userRolesInput.push({ id: i + 1, userId: usersInput[i % usersInput.length].id, roleId: rolesInput[i % rolesInput.length].id })
    }
    for (const ur of userRolesInput) {
      await prisma.userRole.upsert({ where: { id: ur.id }, update: {}, create: ur })
    }

    // 7) Pets
    console.log('📝 Creando mascotas...')
    const petsInput = (mascotasData.pets || []).map((m: any, idx: number) => {
      const city = pickCityCenter(m.lostLocationDetails || '')
      const lat = (m.lostLocationLat != null ? Number(m.lostLocationLat) : jitter(city.lat, 0.05))
      const lon = (m.lostLocationLon != null ? Number(m.lostLocationLon) : jitter(city.lon, 0.05))
      const lostDate = m.lostDate ? new Date(m.lostDate) : new Date('2024-01-01T00:00:00Z')
      return {
        id: m.id,
        name: m.name || `Pet ${idx + 1}`,
        age: m.age != null ? toNum(m.age) : undefined,
        color: m.color,
        gender: m.gender || 'UNKNOWN',
        description: m.description,
        status: m.status || 'LOST',
        lostDate,
        lostLocationLat: lat,
        lostLocationLon: lon,
        lostLocationDetails: m.lostLocationDetails || undefined,
        rewardAmount: m.rewardAmount != null ? toNum(m.rewardAmount) : undefined,
        ownerId: m.ownerId || undefined,
        speciesId: m.speciesId || undefined,
        breedId: m.breedId || undefined
      }
    })
    // completar al menos 10 ya se cumple en archivo, por si acaso
    for (const p of petsInput) {
      await prisma.pet.upsert({ where: { id: p.id }, update: {}, create: p })
    }

    // 8) Sightings
    console.log('📝 Creando avistamientos...')
    const sightingsInput = (relacionesData.sightings || []).map((a: any) => ({
      id: a.id,
      date: new Date(a.date),
      sightingLat: a.sightingLat,
      sightingLon: a.sightingLon,
      locationDescription: a.locationDescription,
      description: a.description,
      photoUrl: a.photoUrl || '',
      petId: a.petId,
      reporterId: a.reporterId
    }))
    for (const s of sightingsInput) {
      await prisma.sighting.upsert({ where: { id: s.id }, update: {}, create: s })
    }

    // 9) Adoptions
    console.log('📝 Creando adopciones...')
    const adoptionsInput = (relacionesData.adoptions || []).map((ad: any) => ({
      id: ad.id,
      petId: ad.petId,
      requirements: ad.requirements,
      contactInfo: ad.contactInfo
    }))
    for (let i = adoptionsInput.length; i < 10 && i < petsInput.length; i++) {
      adoptionsInput.push({ id: randomUUID(), petId: petsInput[i].id, requirements: `Req auto ${i + 1}`, contactInfo: `contacto${i + 1}@demo.com` })
    }
    for (const ad of adoptionsInput) {
      await prisma.adoption.upsert({ where: { id: ad.id }, update: {}, create: ad })
    }

    // 10) Pet Images (usar URLs reales)
    console.log('📝 Creando imágenes de mascotas...')
    const petImagesInput = (relacionesData.petImages || []).map((img: any, idx: number) => ({
      id: img.id,
      petId: img.petId,
      url: img.url || '',
      isPrimary: img.isPrimary ?? (idx % 2 === 0)
    }))
    for (let i = petImagesInput.length; i < 10; i++) {
      const pet = petsInput[i % petsInput.length]
      petImagesInput.push({ id: randomUUID(), petId: pet.id, url: `https://picsum.photos/seed/pet-extra-${i}/900/700`, isPrimary: i % 3 === 0 })
    }
    for (const pi of petImagesInput) {
      await prisma.petImage.upsert({ where: { id: pi.id }, update: {}, create: pi })
    }

    // 11) Walkers
    console.log('📝 Creando paseadores...')
    const walkersInput = (relacionesData.walkers || []).map((w: any, idx: number) => ({
      id: w.id,
      userId: w.userId,
      experience: w.experience,
      hourlyRate: w.hourlyRate != null ? toNum(w.hourlyRate) : undefined,
      availability: w.availability,
      coverageArea: w.coverageArea,
      regionId: w.regionId ?? regionsInput[idx % regionsInput.length].id
    }))
    for (let i = walkersInput.length; i < 10; i++) {
      walkersInput.push({
        id: randomUUID(),
        userId: usersInput[i % usersInput.length].id,
        experience: `${1 + (i % 6)} años paseando` ,
        hourlyRate: 15 + (i % 10),
        availability: 'Lunes a Domingo 6AM-8PM',
        coverageArea: ['Bogotá', 'Medellín', 'Cali'][i % 3],
        regionId: regionsInput[i % regionsInput.length].id
      })
    }
    for (const w of walkersInput) {
      await prisma.walker.upsert({ where: { id: w.id }, update: {}, create: w })
    }

    // 12) Expansions
    console.log('📝 Creando expansiones...')
    const expansionsInput = (relacionesData.expansions || []).map((ex: any) => ({ id: ex.id, regionId: ex.regionId, expansionDate: new Date(ex.expansionDate) }))
    for (let i = expansionsInput.length; i < 10; i++) {
      expansionsInput.push({ id: randomUUID(), regionId: regionsInput[i % regionsInput.length].id, expansionDate: new Date('2024-02-01T00:00:00Z') })
    }
    for (const ex of expansionsInput) {
      await prisma.expansion.upsert({ where: { id: ex.id }, update: {}, create: ex })
    }

    console.log('✅ Seed completado exitosamente!')
    console.log('📊 Resumen de datos creados:')
    console.log(`   - ${speciesInput.length} especies`)
    console.log(`   - ${breedsInput.length} razas`)
    console.log(`   - ${rolesInput.length} roles`)
    console.log(`   - ${regionsInput.length} regiones`)
    console.log(`   - ${usersInput.length} usuarios`)
    console.log(`   - ${userRolesInput.length} asignaciones de roles`)
    console.log(`   - ${petsInput.length} mascotas`)
    console.log(`   - ${sightingsInput.length} avistamientos`)
    console.log(`   - ${adoptionsInput.length} adopciones`)
    console.log(`   - ${petImagesInput.length} imágenes`)
    console.log(`   - ${walkersInput.length} paseadores`)
    console.log(`   - ${expansionsInput.length} expansiones`)

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
