/**
 * Script to run the additional seed file
 */

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Import the seed function
async function runSeed() {
  try {
    // Dynamic import of the seed function
    const { seedAdditionalTemplates } = require('../prisma/seed-additional.ts');
    await seedAdditionalTemplates();
    console.log('✅ Additional seed completed successfully!');
  } catch (error) {
    console.error('❌ Seed failed:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

runSeed();

