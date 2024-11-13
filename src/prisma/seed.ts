import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const email = 'teste@teste.com.br';
  const password = 'senha123'; // Senha do usuário
  const name = 'Usuário Teste'; // Nome do usuário

  // Criptografa a senha
  const hashedPassword = await bcrypt.hash(password, 10);

  // Cria um usuário básico
  const user = await prisma.usuario.create({
    data: {
      email: email,
      password: hashedPassword,  // Armazena a senha criptografada
      name: name, // Nome do usuário
    },
  });

  console.log('Usuário criado com sucesso:', user);
}

main()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
