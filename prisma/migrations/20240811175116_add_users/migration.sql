/*
  Warnings:

  - You are about to drop the `Product` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserCat` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "UserCat" DROP CONSTRAINT "UserCat_catId_fkey";

-- DropForeignKey
ALTER TABLE "UserCat" DROP CONSTRAINT "UserCat_userId_fkey";

-- DropIndex
DROP INDEX "User_email_key";

-- DropTable
DROP TABLE "Product";

-- DropTable
DROP TABLE "UserCat";
