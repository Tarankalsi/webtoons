/*
  Warnings:

  - The primary key for the `Character` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Character` table. All the data in the column will be lost.
  - The required column `characterId` was added to the `Character` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- DropForeignKey
ALTER TABLE "Character" DROP CONSTRAINT "Character_webtoonId_fkey";

-- AlterTable
ALTER TABLE "Character" DROP CONSTRAINT "Character_pkey",
DROP COLUMN "id",
ADD COLUMN     "characterId" TEXT NOT NULL,
ADD CONSTRAINT "Character_pkey" PRIMARY KEY ("characterId");

-- AddForeignKey
ALTER TABLE "Character" ADD CONSTRAINT "Character_webtoonId_fkey" FOREIGN KEY ("webtoonId") REFERENCES "Webtoon"("webtoonId") ON DELETE CASCADE ON UPDATE CASCADE;
