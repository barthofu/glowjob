/*
  Warnings:

  - You are about to alter the column `room` on the `Screening` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.
  - Added the required column `day` to the `Screening` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Screening" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "startTime" DATETIME NOT NULL,
    "day" INTEGER NOT NULL,
    "room" INTEGER NOT NULL,
    "roomCapacity" INTEGER NOT NULL,
    "availableSeats" INTEGER NOT NULL,
    "handicapFriendly" BOOLEAN NOT NULL DEFAULT true,
    "language" TEXT NOT NULL DEFAULT 'VF',
    "movieId" INTEGER NOT NULL,
    CONSTRAINT "Screening_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "Movie" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Screening" ("availableSeats", "createdAt", "id", "movieId", "room", "roomCapacity", "startTime") SELECT "availableSeats", "createdAt", "id", "movieId", "room", "roomCapacity", "startTime" FROM "Screening";
DROP TABLE "Screening";
ALTER TABLE "new_Screening" RENAME TO "Screening";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
