/*
  Warnings:

  - You are about to drop the column `lineno` on the `Comment` table. All the data in the column will be lost.
  - Added the required column `startlineno` to the `Comment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Comment" DROP COLUMN "lineno",
ADD COLUMN     "endlineno" INTEGER,
ADD COLUMN     "startlineno" INTEGER NOT NULL;
