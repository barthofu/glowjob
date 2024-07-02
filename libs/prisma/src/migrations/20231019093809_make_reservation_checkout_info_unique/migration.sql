/*
  Warnings:

  - You are about to drop the column `price` on the `Screening` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Reservation" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" TEXT NOT NULL,
    "checkoutId" TEXT NOT NULL,
    "checkoutUrl" TEXT NOT NULL,
    "amount" INTEGER NOT NULL DEFAULT 1,
    "userId" INTEGER NOT NULL,
    "screeningId" INTEGER NOT NULL,
    CONSTRAINT "Reservation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Reservation_screeningId_fkey" FOREIGN KEY ("screeningId") REFERENCES "Screening" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Reservation" ("checkoutId", "checkoutUrl", "createdAt", "id", "screeningId", "status", "userId") SELECT "checkoutId", "checkoutUrl", "createdAt", "id", "screeningId", "status", "userId" FROM "Reservation";
DROP TABLE "Reservation";
ALTER TABLE "new_Reservation" RENAME TO "Reservation";
CREATE UNIQUE INDEX "Reservation_checkoutId_key" ON "Reservation"("checkoutId");
CREATE UNIQUE INDEX "Reservation_checkoutUrl_key" ON "Reservation"("checkoutUrl");
CREATE TABLE "new_Screening" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "startTime" DATETIME NOT NULL,
    "room" TEXT NOT NULL,
    "roomCapacity" INTEGER NOT NULL,
    "availableSeats" INTEGER NOT NULL,
    "movieId" INTEGER NOT NULL,
    CONSTRAINT "Screening_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "Movie" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Screening" ("availableSeats", "createdAt", "id", "movieId", "room", "roomCapacity", "startTime") SELECT "availableSeats", "createdAt", "id", "movieId", "room", "roomCapacity", "startTime" FROM "Screening";
DROP TABLE "Screening";
ALTER TABLE "new_Screening" RENAME TO "Screening";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
