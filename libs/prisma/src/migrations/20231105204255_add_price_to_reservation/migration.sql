/*
  Warnings:

  - Added the required column `price` to the `Reservation` table without a default value. This is not possible if the table is not empty.

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
    "price" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "screeningId" INTEGER NOT NULL,
    CONSTRAINT "Reservation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Reservation_screeningId_fkey" FOREIGN KEY ("screeningId") REFERENCES "Screening" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Reservation" ("amount", "checkoutId", "checkoutUrl", "createdAt", "id", "screeningId", "status", "userId") SELECT "amount", "checkoutId", "checkoutUrl", "createdAt", "id", "screeningId", "status", "userId" FROM "Reservation";
DROP TABLE "Reservation";
ALTER TABLE "new_Reservation" RENAME TO "Reservation";
CREATE UNIQUE INDEX "Reservation_checkoutId_key" ON "Reservation"("checkoutId");
CREATE UNIQUE INDEX "Reservation_checkoutUrl_key" ON "Reservation"("checkoutUrl");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
