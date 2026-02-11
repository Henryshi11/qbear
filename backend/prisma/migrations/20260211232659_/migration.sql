/*
  Warnings:

  - The `mood` column on the `Bear` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Bear" ADD COLUMN     "coins" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "hunger" INTEGER NOT NULL DEFAULT 50,
ADD COLUMN     "hungerMax" INTEGER NOT NULL DEFAULT 100,
ADD COLUMN     "lastCoinAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "moodMax" INTEGER NOT NULL DEFAULT 100,
ADD COLUMN     "staminaMax" INTEGER NOT NULL DEFAULT 10,
DROP COLUMN "mood",
ADD COLUMN     "mood" INTEGER NOT NULL DEFAULT 50;
