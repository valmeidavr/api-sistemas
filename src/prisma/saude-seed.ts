import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // 1. Criar o software "Saúde" caso ainda não exista
  const saudeSoftware = await prisma.software.upsert({
    where: { nome: 'Saúde' },  // Aqui, 'nome' deve ser um campo único no seu modelo 'Software'
    update: {},
    create: {
      nome: 'Saúde',
      descricao: 'Sistema de Gestão de Unidades de Saúde',
    },
  });

  // 2. Criar as regras específicas para o sistema "Saúde"
  const regrasSaude = [
    { descricao: 'unidade-create', softwareId: saudeSoftware.id },
    { descricao: 'unidade-list', softwareId: saudeSoftware.id },
    { descricao: 'unidade-show', softwareId: saudeSoftware.id },
    { descricao: 'unidade-delete', softwareId: saudeSoftware.id },
  ];

  for (const regra of regrasSaude) {
    await prisma.regra.upsert({
      where: { descricao: regra.descricao },
      update: {},
      create: regra,
    });
  }

  // 3. Criar um perfil específico para o software "Saúde" (exemplo: "Administrador de Saúde")
  const perfilSaude = await prisma.perfil.upsert({
    where: { descricao: 'Administrador de Saúde' },
    update: {},
    create: {
      descricao: 'Administrador de Saúde',
      softwareId: saudeSoftware.id,
    },
  });

  // 4. Associar as regras ao perfil e definir como autorizadas
  for (const regra of regrasSaude) {
    const regraDb = await prisma.regra.findFirst({
      where: { descricao: regra.descricao },
    });

    if (regraDb) {
      await prisma.regraPerfil.upsert({
        where: {
          perfilId_regraId: {
            perfilId: perfilSaude.id,
            regraId: regraDb.id,
          },
        },
        update: {},
        create: {
          perfilId: perfilSaude.id,
          regraId: regraDb.id,
        },
      });
    }
  }

  // 5. Criar uma unidade de saúde de exemplo para testar
  const unidadeSaude = await prisma.unidade.create({
    data: {
      nome: 'Unidade de Saúde Central',
      endereco: 'Rua Exemplo, 123, Centro',
      telefone: '1234-5678',
    },
  });

  console.log(`Unidade de Saúde ${unidadeSaude.nome} criada com sucesso!`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
