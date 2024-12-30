import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class UsersService {
  constructor(private databaseService: DatabaseService) {}

  async findOne(find: Prisma.UserWhereUniqueInput): Promise<User | null> {
    try {
      return this.databaseService.user.findUnique({
        where: find,
      });
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async createUser(data: Prisma.UserCreateInput): Promise<any> {
    try {
      const user = await this.databaseService.user.create({
        data: {
          ...data,
        },
      });

      return user;
    } catch (err) {
      throw new Error(err);
    }
  }

  async updateUserRt(rt: string, id: number): Promise<void> {
    try {
      await this.databaseService.user.updateMany({
        where: {
          id,
        },
        data: {
          hashedRt: rt,
        },
      });
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async updateUser(id: number, data: Prisma.UserUpdateInput): Promise<void> {
    try {
      await this.databaseService.user.update({
        where: {
          id,
        },
        data: {
          ...data,
        },
      });
    } catch (err) {
      throw new Error(err.message);
    }
  }
}
