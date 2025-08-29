import { PrismaService } from '../services/prisma.service';

export class DatabaseUtils {
  constructor(private prisma: PrismaService) {}

  async checkExistingUsers() {
    try {
      const users = await this.prisma.user.findMany({
        select: {
          id: true,
          email: true,
          name: true,
          createdAt: true,
        },
      });
      
      console.log('Existing users in database:');
      console.table(users);
      
      return users;
    } catch (error) {
      console.error('Error checking existing users:', error);
      throw error;
    }
  }

  async clearAllUsers() {
    try {
      // Delete all users (this will cascade to categories and cars due to foreign key constraints)
      const deletedUsers = await this.prisma.user.deleteMany();
      
      console.log(`Deleted ${deletedUsers.count} users from database`);
      
      return deletedUsers;
    } catch (error) {
      console.error('Error clearing users:', error);
      throw error;
    }
  }

  async resetDatabase() {
    try {
      // This will delete all data and recreate tables
      await this.prisma.$executeRaw`TRUNCATE TABLE "cars" CASCADE`;
      await this.prisma.$executeRaw`TRUNCATE TABLE "categories" CASCADE`;
      await this.prisma.$executeRaw`TRUNCATE TABLE "users" CASCADE`;
      
      console.log('Database reset successfully');
    } catch (error) {
      console.error('Error resetting database:', error);
      throw error;
    }
  }

  async getDatabaseStats() {
    try {
      const userCount = await this.prisma.user.count();
      const categoryCount = await this.prisma.category.count();
      const carCount = await this.prisma.car.count();
      
      console.log('Database Statistics:');
      console.log(`Users: ${userCount}`);
      console.log(`Categories: ${categoryCount}`);
      console.log(`Cars: ${carCount}`);
      
      return { userCount, categoryCount, carCount };
    } catch (error) {
      console.error('Error getting database stats:', error);
      throw error;
    }
  }
}
