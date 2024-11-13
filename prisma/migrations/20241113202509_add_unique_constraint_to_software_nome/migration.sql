/*
  Warnings:

  - A unique constraint covering the columns `[nome]` on the table `Software` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Software_nome_key` ON `Software`(`nome`);
