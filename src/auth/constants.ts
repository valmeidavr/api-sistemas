// src/auth/constants.ts
import { ConfigService } from '@nestjs/config';

export const jwtConstants = (configService: ConfigService) => ({
  secret: configService.get<string>('JWT_SECRET'),  // Carrega a chave secreta do .env
});
