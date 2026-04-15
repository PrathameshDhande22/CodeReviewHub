/*
  Warnings:

  - You are about to drop the column `blobUrl` on the `Post` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Post" DROP COLUMN "blobUrl",
ADD COLUMN     "blobName" TEXT;
