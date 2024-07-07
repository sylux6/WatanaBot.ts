-- CreateTable
CREATE TABLE "guilds" (
    "id" SERIAL NOT NULL,
    "birthdayChannelId" TEXT NOT NULL,

    CONSTRAINT "guilds_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "guilds_birthdayChannelId_key" ON "guilds"("birthdayChannelId");
