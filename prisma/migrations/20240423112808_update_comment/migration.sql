/*
  Warnings:

  - You are about to drop the column `likedNum` on the `Comment` table. All the data in the column will be lost.
  - You are about to drop the column `likedNum` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Comment" DROP COLUMN "likedNum";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "likedNum";

-- CreateTable
CREATE TABLE "_commentLike" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_commentLike_AB_unique" ON "_commentLike"("A", "B");

-- CreateIndex
CREATE INDEX "_commentLike_B_index" ON "_commentLike"("B");

-- AddForeignKey
ALTER TABLE "_commentLike" ADD CONSTRAINT "_commentLike_A_fkey" FOREIGN KEY ("A") REFERENCES "Comment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_commentLike" ADD CONSTRAINT "_commentLike_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
