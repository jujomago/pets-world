-- CreateEnum
CREATE TYPE "public"."AgeUnit" AS ENUM ('YEARS', 'MONTHS');

-- CreateEnum
CREATE TYPE "public"."Coin" AS ENUM ('BOLIVIANOS', 'DOLLARS');

-- AlterTable
ALTER TABLE "public"."Pet" ADD COLUMN     "ageUnit" "public"."AgeUnit" NOT NULL DEFAULT 'YEARS',
ADD COLUMN     "rewardCoin" "public"."Coin" DEFAULT 'BOLIVIANOS';
