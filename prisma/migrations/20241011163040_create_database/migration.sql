/*
  Warnings:

  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `User` table. All the data in the column will be lost.
  - The primary key for the `Webtoon` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Webtoon` table. All the data in the column will be lost.
  - The required column `userId` was added to the `User` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - The required column `webtoonId` was added to the `Webtoon` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- DropForeignKey
ALTER TABLE "Character" DROP CONSTRAINT "Character_webtoonId_fkey";

-- DropForeignKey
ALTER TABLE "Webtoon" DROP CONSTRAINT "Webtoon_userId_fkey";

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
DROP COLUMN "id",
ADD COLUMN     "userId" TEXT NOT NULL,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("userId");

-- AlterTable
ALTER TABLE "Webtoon" DROP CONSTRAINT "Webtoon_pkey",
DROP COLUMN "id",
ADD COLUMN     "webtoonId" TEXT NOT NULL,
ADD CONSTRAINT "Webtoon_pkey" PRIMARY KEY ("webtoonId");

-- AddForeignKey
ALTER TABLE "Webtoon" ADD CONSTRAINT "Webtoon_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Character" ADD CONSTRAINT "Character_webtoonId_fkey" FOREIGN KEY ("webtoonId") REFERENCES "Webtoon"("webtoonId") ON DELETE RESTRICT ON UPDATE CASCADE;
