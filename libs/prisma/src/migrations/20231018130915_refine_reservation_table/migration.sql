/*
  Warnings:

  - You are about to drop the column `statut` on the `Screening` table. All the data in the column will be lost.
  - Added the required column `checkoutId` to the `Reservation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `checkoutUrl` to the `Reservation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `Reservation` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Reservation" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" TEXT NOT NULL,
    "checkoutId" TEXT NOT NULL,
    "checkoutUrl" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "screeningId" INTEGER NOT NULL,
    CONSTRAINT "Reservation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Reservation_screeningId_fkey" FOREIGN KEY ("screeningId") REFERENCES "Screening" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Reservation" ("createdAt", "id", "screeningId", "userId") SELECT "createdAt", "id", "screeningId", "userId" FROM "Reservation";
DROP TABLE "Reservation";
ALTER TABLE "new_Reservation" RENAME TO "Reservation";
CREATE TABLE "new_Screening" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "startTime" DATETIME NOT NULL,
    "room" TEXT NOT NULL,
    "price" REAL NOT NULL,
    "roomCapacity" INTEGER NOT NULL,
    "availableSeats" INTEGER NOT NULL,
    "movieId" INTEGER NOT NULL,
    CONSTRAINT "Screening_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "Movie" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Screening" ("availableSeats", "createdAt", "id", "movieId", "price", "room", "roomCapacity", "startTime") SELECT "availableSeats", "createdAt", "id", "movieId", "price", "room", "roomCapacity", "startTime" FROM "Screening";
DROP TABLE "Screening";
ALTER TABLE "new_Screening" RENAME TO "Screening";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
