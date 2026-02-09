import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import * as admin from 'firebase-admin';

@Injectable()
export class PushService {
  private logger = new Logger(PushService.name);

  constructor(private prisma: PrismaService) {
    this.initFirebase();
  }

  // ================================
  // Firebase Init
  // ================================
  private initFirebase() {
    if (admin.apps.length === 0) {
      try {
        admin.initializeApp({
          credential: admin.credential.applicationDefault(),
        });

        this.logger.log('Firebase initialized');
      } catch {
        this.logger.warn('Firebase NOT configured — running mock mode');
      }
    }
  }

  // ================================
  // Register device token
  // ================================
  async registerToken(
    userId: string,
    token: string,
    platform: 'web' | 'android' | 'ios',
  ) {
    return this.prisma.pushToken.upsert({
      where: {
        userId_token: {
          userId,
          token,
        },
      },
      update: {},
      create: {
        userId,
        token,
        platform,
      },
    });
  }

  // ================================
  // Send push to ONE user
  // ================================
  async sendToUser(
    userId: string,
    notification: { title: string; body: string },
  ) {
    const tokens = await this.prisma.pushToken.findMany({
      where: { userId },
    });

    if (!tokens.length) return;

    for (const t of tokens) {
      await this.send(t.token, notification);
    }
  }

  // ================================
  // Send raw message
  // ================================
  private async send(
    token: string,
    notification: { title: string; body: string },
  ) {
    try {
      await admin.messaging().send({
        token,
        notification,
      });

      this.logger.log(`Push sent -> ${token}`);
    } catch (e) {
      this.logger.warn(`Push failed -> ${token}`);
    }
  }
}
