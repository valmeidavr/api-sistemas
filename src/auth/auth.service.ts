import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.prisma.usuario.findUnique({ where: { email } });
    if (user && await bcrypt.compare(password, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    throw new UnauthorizedException('Credencial inválida!');
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user.id };
    
    // Definir o token com expiração de 7 dias
    const access_token = this.jwtService.sign(payload, {
      expiresIn: '7d', // Definindo expiração de 7 dias
    });

    return {
      access_token,
      user,
    };
  }

  async forgotPassword(email: string) {
    // Lógica de redefinição de senha
  }

  async resetPassword(userId: number, newPassword: string) {
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await this.prisma.usuario.update({
      where: { id: userId },
      data: { password: hashedPassword },
    });
  }

  async getUserPermissions(userId: number) {
    return this.prisma.permissaoUsuario.findMany({
      where: { usuarioId: userId },
      include: {
        perfil: {
          include: {
            software: true,
            regras: {
              include: { regra: true },
            },
          },
        },
      },
    });
  }
}
