/*
  Warnings:

  - You are about to drop the `Session` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."Session" DROP CONSTRAINT "Session_userId_fkey";

-- AlterTable
ALTER TABLE "public"."User" ALTER COLUMN "acceptNotifications" SET DEFAULT true;

-- DropTable
DROP TABLE "public"."Session";
