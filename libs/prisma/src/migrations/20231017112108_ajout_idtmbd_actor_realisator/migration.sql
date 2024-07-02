/*
  Warnings:

  - Added the required column `idTmdb` to the `Realisator` table without a default value. This is not possible if the table is not empty.
  - Added the required column `idTmdb` to the `Actor` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Realisator" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastName" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "icon" TEXT NOT NULL,
    "idTmdb" INTEGER NOT NULL
);
INSERT INTO "new_Realisator" ("createdAt", "firstName", "icon", "id", "lastName") SELECT "createdAt", "firstName", "icon", "id", "lastName" FROM "Realisator";
DROP TABLE "Realisator";
ALTER TABLE "new_Realisator" RENAME TO "Realisator";
CREATE UNIQUE INDEX "Realisator_idTmdb_key" ON "Realisator"("idTmdb");
CREATE TABLE "new_Actor" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastName" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "icon" TEXT NOT NULL,
    "idTmdb" INTEGER NOT NULL
);
INSERT INTO "new_Actor" ("createdAt", "firstName", "icon", "id", "lastName") SELECT "createdAt", "firstName", "icon", "id", "lastName" FROM "Actor";
DROP TABLE "Actor";
ALTER TABLE "new_Actor" RENAME TO "Actor";
CREATE UNIQUE INDEX "Actor_idTmdb_key" ON "Actor"("idTmdb");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
