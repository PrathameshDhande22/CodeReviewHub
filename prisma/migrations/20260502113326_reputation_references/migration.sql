/*
  Warnings:

  - You are about to drop the column `levelno` on the `UserReputation` table. All the data in the column will be lost.
  - Added the required column `reputationid` to the `UserReputation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "UserReputation" DROP COLUMN "levelno",
ADD COLUMN     "reputationid" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "UserReputation" ADD CONSTRAINT "UserReputation_reputationid_fkey" FOREIGN KEY ("reputationid") REFERENCES "Reputation"("id") ON DELETE CASCADE ON UPDATE CASCADE;
