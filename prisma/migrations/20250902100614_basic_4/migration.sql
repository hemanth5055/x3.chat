/*
  Warnings:

  - You are about to drop the column `isBookmarked` on the `Message` table. All the data in the column will be lost.
  - Added the required column `name` to the `Chat` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Chat" ADD COLUMN     "name" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "public"."Message" DROP COLUMN "isBookmarked";
