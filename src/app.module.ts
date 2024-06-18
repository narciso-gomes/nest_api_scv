import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UnityModule } from './unity/unity.module';
import { PrismaService } from './prisma/prisma.service';

@Module({
  imports: [UnityModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
