import { Module } from '@nestjs/common';
import { UnityService } from './unity.service';
import { UnityController } from './unity.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [UnityController],
  providers: [UnityService, PrismaService],
})
export class UnityModule { }
