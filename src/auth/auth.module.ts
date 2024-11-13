// src/auth/auth.module.ts
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.strategy';  // Importe a estratégia
import { PrismaService } from '../prisma/prisma.service';  // Caso você esteja usando o Prisma

@Module({
  imports: [JwtModule.register({ secret: process.env.JWT_SECRET, signOptions: { expiresIn: '60m' } })],  // Configure o JWT
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, PrismaService],  // Adicione todos os provedores necessários
  exports: [AuthService],  // Exporte o AuthService caso queira usá-lo em outros módulos
})
export class AuthModule {}
