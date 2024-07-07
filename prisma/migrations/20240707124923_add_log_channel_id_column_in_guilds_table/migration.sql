/*
  Warnings:

  - A unique constraint covering the columns `[logsChannelId]` on the table `guilds` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "guilds" ADD COLUMN     "logsChannelId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "guilds_logsChannelId_key" ON "guilds"("logsChannelId");
