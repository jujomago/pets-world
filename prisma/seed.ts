import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Iniciando seed v2 de la base de datos...");

  try {
    // 1) Species
    console.log("📝 Creando especies...");
    const speciesData = [
      { name: "Perro" },
      { name: "Gato" },
      { name: "Conejo" },
      { name: "Ave" },
    ];

    const createdSpecies = [];
    for (const s of speciesData) {
      const species = await prisma.species.upsert({
        where: { name: s.name },
        update: {},
        create: s,
      });
      createdSpecies.push(species);
    }

    // 2) Breeds
    console.log("📝 Creando razas...");

    const speciesMap = createdSpecies.reduce((acc, s) => {
      acc[s.name] = s.id;
      return acc;
    }, {} as Record<string, string>);

    const breedsData = [
      // Perro
      { name: "Mestizo", speciesName: "Perro" },
      { name: "Labrador Retriever", speciesName: "Perro" },
      { name: "Golden Retriever", speciesName: "Perro" },
      { name: "Pastor Alemán", speciesName: "Perro" },
      { name: "Bulldog Ingles", speciesName: "Perro" },
      { name: "Bulldog Francés", speciesName: "Perro" },
      { name: "Poodle (Caniche)", speciesName: "Perro" },
      { name: "Chihuahua", speciesName: "Perro" },
      { name: "Yorkshire Terrier", speciesName: "Perro" },
      { name: "Shih Tzu", speciesName: "Perro" },
      { name: "Pug (Carlino)", speciesName: "Perro" },
      { name: "Schnauzer Miniatura", speciesName: "Perro" },
      { name: "Dachshund (Perro Salchicha)", speciesName: "Perro" },
      { name: "Pomerania", speciesName: "Perro" },
      { name: "Bichón Maltés", speciesName: "Perro" },
      { name: "Beagle", speciesName: "Perro" },
      { name: "Border Collie", speciesName: "Perro" },
      { name: "Pit Bull", speciesName: "Perro" },
      { name: "Bull Terrier", speciesName: "Perro" },
      { name: "Basset Hound", speciesName: "Perro" },
      { name: "Husky Siberiano", speciesName: "Perro" },
      { name: "Rottweiler", speciesName: "Perro" },
      { name: "Bóxer", speciesName: "Perro" },
      { name: "Doberman", speciesName: "Perro" },
      { name: "Gran Danés", speciesName: "Perro" },
      { name: "San Bernardo", speciesName: "Perro" },
      { name: "Dogo Argentino", speciesName: "Perro" },
      { name: "Kangal Turco", speciesName: "Perro" },

      // Gato
      { name: "Mestizo", speciesName: "Gato" },
      { name: "Siamés", speciesName: "Gato" },
      { name: "Persa", speciesName: "Gato" },
      { name: "Maine Coon", speciesName: "Gato" },
      { name: "Ragdoll", speciesName: "Gato" },
      { name: "Bengala", speciesName: "Gato" },
      { name: "Sphynx(Gato Esfinge)", speciesName: "Gato" },
      { name: "British Shorthair", speciesName: "Gato" },
      { name: "Azul Ruso", speciesName: "Gato" },
      { name: "Angora", speciesName: "Gato" },

      // Conejo
      { name: "Mestizo", speciesName: "Conejo" },
      { name: "Lop/Mini Lop", speciesName: "Conejo" },
      { name: "Holland Lop", speciesName: "Conejo" },
      { name: "Mini Rex", speciesName: "Conejo" },
      { name: "Lionhead", speciesName: "Conejo" },
      { name: "Angora", speciesName: "Conejo" },

      // Ave
      { name: "Canario", speciesName: "Ave" },
      { name: "Periquito Australiano", speciesName: "Ave" },
      { name: "Ninfa", speciesName: "Ave" },
      { name: "Agapornis", speciesName: "Ave" },
      { name: "Cotorra Argentina", speciesName: "Ave" },
      { name: "Loro", speciesName: "Ave" },
      { name: "Paloma", speciesName: "Ave" },
    ];

    for (const b of breedsData) {
      const speciesId = speciesMap[b.speciesName];
      if (speciesId) {
        await prisma.breed.upsert({
          where: { name_speciesId: { name: b.name, speciesId } },
          update: {},
          create: { name: b.name, speciesId },
        });
      }
    }

    // 3) Regions
    console.log("📝 Creando regiones...");
    const regionsData = [
      {
        department: "Beni",
        city: "Trinidad",
        countryCode: "BO",
        countryName: "Bolivia",
      },
      {
        department: "Chuquisaca",
        city: "Sucre",
        countryCode: "BO",
        countryName: "Bolivia",
      },
      {
        department: "Cochabamba",
        city: "Cochabamba",
        countryCode: "BO",
        countryName: "Bolivia",
      },
      {
        department: "La Paz",
        city: "La Paz",
        countryCode: "BO",
        countryName: "Bolivia",
      },
      {
        department: "Oruro",
        city: "Oruro",
        countryCode: "BO",
        countryName: "Bolivia",
      },
      {
        department: "Pando",
        city: "Cobija",
        countryCode: "BO",
        countryName: "Bolivia",
      },
      {
        department: "Potosí",
        city: "Potosí",
        countryCode: "BO",
        countryName: "Bolivia",
      },
      {
        department: "Santa Cruz",
        city: "Santa Cruz de la Sierra",
        countryCode: "BO",
        countryName: "Bolivia",
      },
      {
        department: "Tarija",
        city: "Tarija",
        countryCode: "BO",
        countryName: "Bolivia",
      },
    ];

    for (const r of regionsData) {
      await prisma.region.upsert({
        where: {
          countryCode_city: { countryCode: r.countryCode, city: r.city },
        },
        update: {},
        create: {
          ...r,
          isActive: true,
          activationDate: new Date(),
        },
      });
    }

    // 4) Roles
    console.log("📝 Creando roles...");
    const rolesData = [
      { name: "Admin", description: "Administrador con todos los permisos" },
      { name: "User", description: "Usuario estándar de la aplicación" },
      {
        name: "Reporter",
        description: "Usuario con permisos para reportar mascotas",
      },
    ];

    for (const role of rolesData) {
      await prisma.role.upsert({
        where: { name: role.name },
        update: {},
        create: role,
      });
    }

    console.log("✅ Seed v2 completado exitosamente!");
    console.log("📊 Resumen de datos creados:");
    console.log(`   - ${speciesData.length} especies`);
    console.log(`   - ${breedsData.length} razas`);
    console.log(`   - ${regionsData.length} regiones`);
    console.log(`   - ${rolesData.length} roles`);
  } catch (error) {
    console.error("❌ Error durante el seed v2:", error);
    throw error;
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
