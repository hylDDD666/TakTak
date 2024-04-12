/*
  Warnings:

  - You are about to drop the column `collectNum` on the `Video` table. All the data in the column will be lost.
  - You are about to drop the column `commentsNum` on the `Video` table. All the data in the column will be lost.
  - You are about to drop the column `likeNum` on the `Video` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Video" DROP COLUMN "collectNum",
DROP COLUMN "commentsNum",
DROP COLUMN "likeNum";
