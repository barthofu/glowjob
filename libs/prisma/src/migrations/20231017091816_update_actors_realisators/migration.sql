/*
  Warnings:

  - You are about to drop the column `dateOfBirth` on the `Actor` table. All the data in the column will be lost.
  - You are about to drop the column `firstname` on the `Actor` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Actor` table. All the data in the column will be lost.
  - You are about to drop the column `nationality` on the `Actor` table. All the data in the column will be lost.
  - You are about to drop the column `dateOfBirth` on the `Realisator` table. All the data in the column will be lost.
  - You are about to drop the column `firstname` on the `Realisator` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Realisator` table. All the data in the column will be lost.
  - You are about to drop the column `nationality` on the `Realisator` table. All the data in the column will be lost.
  - Added the required column `firstName` to the `Actor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `icon` to the `Actor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastName` to the `Actor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `firstName` to the `Realisator` table without a default value. This is not possible if the table is not empty.
  - Added the required column `icon` to the `Realisator` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastName` to the `Realisator` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Actor" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastName" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "icon" TEXT NOT NULL
);
INSERT INTO "new_Actor" ("createdAt", "id") SELECT "createdAt", "id" FROM "Actor";
DROP TABLE "Actor";
ALTER TABLE "new_Actor" RENAME TO "Actor";
CREATE TABLE "new_Realisator" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastName" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "icon" TEXT NOT NULL
);
INSERT INTO "new_Realisator" ("createdAt", "id") SELECT "createdAt", "id" FROM "Realisator";
DROP TABLE "Realisator";
ALTER TABLE "new_Realisator" RENAME TO "Realisator";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;