/*
  Warnings:

  - A unique constraint covering the columns `[descricao]` on the table `Regra` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Regra_descricao_key` ON `Regra`(`descricao`);
