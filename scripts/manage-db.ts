#!/usr/bin/env ts-node

import { PrismaService } from '../src/services/prisma.service';
import { DatabaseUtils } from '../src/utils/db-utils';

async function main() {
  const prisma = new PrismaService();
  const dbUtils = new DatabaseUtils(prisma);

  try {
    await prisma.$connect();
    console.log('Connected to database');

    const command = process.argv[2];

    switch (command) {
      case 'check-users':
        await dbUtils.checkExistingUsers();
        break;
      
      case 'clear-users':
        await dbUtils.clearAllUsers();
        break;
      
      case 'reset-db':
        await dbUtils.resetDatabase();
        break;
      
      case 'stats':
        await dbUtils.getDatabaseStats();
        break;
      
      default:
        console.log('Available commands:');
        console.log('  check-users  - Check existing users');
        console.log('  clear-users  - Clear all users');
        console.log('  reset-db     - Reset entire database');
        console.log('  stats        - Show database statistics');
        break;
    }
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
