/*
  Warnings:

  - Made the column `cloudinaryId` on table `Picture` required. This step will fail if there are existing NULL values in that column.
  - Made the column `url` on table `Picture` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Picture" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "url" TEXT NOT NULL,
    "cloudinaryId" TEXT NOT NULL
);
INSERT INTO "new_Picture" ("cloudinaryId", "createdAt", "id", "updatedAt", "url") SELECT "cloudinaryId", "createdAt", "id", "updatedAt", "url" FROM "Picture";
DROP TABLE "Picture";
ALTER TABLE "new_Picture" RENAME TO "Picture";
CREATE UNIQUE INDEX "Picture_url_key" ON "Picture"("url");
CREATE UNIQUE INDEX "Picture_cloudinaryId_key" ON "Picture"("cloudinaryId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;