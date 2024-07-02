/*
  Warnings:

  - You are about to drop the column `pictureId` on the `Movie` table. All the data in the column will be lost.
  - You are about to drop the column `pictureId` on the `Actor` table. All the data in the column will be lost.
  - You are about to drop the column `pictureId` on the `Realisator` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Movie" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "title" TEXT NOT NULL,
    "genre" TEXT,
    "releaseDate" DATETIME NOT NULL,
    "synopsis" TEXT,
    "duration" INTEGER NOT NULL,
    "country" TEXT,
    "posterId" INTEGER,
    "realisatorId" INTEGER,
    CONSTRAINT "Movie_posterId_fkey" FOREIGN KEY ("posterId") REFERENCES "Picture" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Movie_realisatorId_fkey" FOREIGN KEY ("realisatorId") REFERENCES "Realisator" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Movie" ("country", "createdAt", "duration", "genre", "id", "realisatorId", "releaseDate", "synopsis", "title") SELECT "country", "createdAt", "duration", "genre", "id", "realisatorId", "releaseDate", "synopsis", "title" FROM "Movie";
DROP TABLE "Movie";
ALTER TABLE "new_Movie" RENAME TO "Movie";
CREATE TABLE "new_Actor" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,
    "idTmdb" INTEGER NOT NULL,
    "iconId" INTEGER,
    CONSTRAINT "Actor_iconId_fkey" FOREIGN KEY ("iconId") REFERENCES "Picture" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Actor" ("createdAt", "id", "idTmdb", "name") SELECT "createdAt", "id", "idTmdb", "name" FROM "Actor";
DROP TABLE "Actor";
ALTER TABLE "new_Actor" RENAME TO "Actor";
CREATE UNIQUE INDEX "Actor_idTmdb_key" ON "Actor"("idTmdb");
CREATE TABLE "new_Realisator" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,
    "idTmdb" INTEGER NOT NULL,
    "iconId" INTEGER,
    CONSTRAINT "Realisator_iconId_fkey" FOREIGN KEY ("iconId") REFERENCES "Picture" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Realisator" ("createdAt", "id", "idTmdb", "name") SELECT "createdAt", "id", "idTmdb", "name" FROM "Realisator";
DROP TABLE "Realisator";
ALTER TABLE "new_Realisator" RENAME TO "Realisator";
CREATE UNIQUE INDEX "Realisator_idTmdb_key" ON "Realisator"("idTmdb");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
