import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class TokenBlacklistService {
  constructor(private prisma: PrismaService) {}

  async add(token: string, expiresAt: Date) {
    return this.prisma.tokenBlacklist.create({
      data: { token, expiresAt },
    });
  }

  async isBlacklisted(token: string): Promise<boolean> {
    const found = await this.prisma.tokenBlacklist.findUnique({
      where: { token },
    });

    if (!found) return false;

    if (found.expiresAt < new Date()) {
      await this.prisma.tokenBlacklist.delete({ where: { token } });
      return false;
    }

    return true;
  }

  async remove(token: string) {
    return this.prisma.tokenBlacklist.delete({
      where: { token },
    });
  }

  async listAll() {
    return this.prisma.tokenBlacklist.findMany({
      orderBy: { expiresAt: 'desc' },
    });
  }

  async clearExpired() {
    return this.prisma.tokenBlacklist.deleteMany({
      where: {
        expiresAt: { lt: new Date() },
      },
    });
  }
}
