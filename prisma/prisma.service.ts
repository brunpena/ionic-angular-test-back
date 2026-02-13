import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

declare global {
  // evita recriar Prisma em hot-reload / cold-start
  var prisma: PrismaClient | undefined;
}

const prisma =
  global.prisma ||
  new PrismaClient({
    log: ['error'],
  });

if (process.env.NODE_ENV !== 'production') {
  global.prisma = prisma;
}

@Injectable()
export class PrismaService extends PrismaClient
  implements OnModuleInit {

  constructor() {
    super();
  }

  async onModuleInit() {
    await this.$connect();
  }
}
