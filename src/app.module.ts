import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module'; // ajuste conforme sua estrutura de diretórios

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,  // Torna as variáveis de ambiente acessíveis globalmente
    }),
    AuthModule, // seu módulo de autenticação
  ],
})
export class AppModule {}
