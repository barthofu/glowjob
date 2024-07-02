/*
  Warnings:

  - You are about to drop the column `firstName` on the `Realisator` table. All the data in the column will be lost.
  - You are about to drop the column `lastName` on the `Realisator` table. All the data in the column will be lost.
  - You are about to drop the column `firstName` on the `Actor` table. All the data in the column will be lost.
  - You are about to drop the column `lastName` on the `Actor` table. All the data in the column will be lost.
  - Added the required column `name` to the `Realisator` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Actor` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Realisator" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,
    "icon" TEXT NOT NULL,
    "idTmdb" INTEGER NOT NULL
);
INSERT INTO "new_Realisator" ("createdAt", "icon", "id", "idTmdb") SELECT "createdAt", "icon", "id", "idTmdb" FROM "Realisator";
DROP TABLE "Realisator";
ALTER TABLE "new_Realisator" RENAME TO "Realisator";
CREATE UNIQUE INDEX "Realisator_idTmdb_key" ON "Realisator"("idTmdb");
CREATE TABLE "new_Actor" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,
    "icon" TEXT NOT NULL,
    "idTmdb" INTEGER NOT NULL
);
INSERT INTO "new_Actor" ("createdAt", "icon", "id", "idTmdb") SELECT "createdAt", "icon", "id", "idTmdb" FROM "Actor";
DROP TABLE "Actor";
ALTER TABLE "new_Actor" RENAME TO "Actor";
CREATE UNIQUE INDEX "Actor_idTmdb_key" ON "Actor"("idTmdb");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
