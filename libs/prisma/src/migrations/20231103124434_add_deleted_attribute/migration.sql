/*
  Warnings:

  - You are about to drop the column `day` on the `Screening` table. All the data in the column will be lost.

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
    "popularity" REAL NOT NULL,
    "featured" BOOLEAN NOT NULL DEFAULT true,
    "deleted" BOOLEAN NOT NULL DEFAULT false,
    "posterId" INTEGER,
    "backgroundId" INTEGER,
    "realisatorId" INTEGER,
    CONSTRAINT "Movie_posterId_fkey" FOREIGN KEY ("posterId") REFERENCES "Picture" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Movie_backgroundId_fkey" FOREIGN KEY ("backgroundId") REFERENCES "Picture" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Movie_realisatorId_fkey" FOREIGN KEY ("realisatorId") REFERENCES "Realisator" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Movie" ("backgroundId", "country", "createdAt", "duration", "featured", "genre", "id", "popularity", "posterId", "realisatorId", "releaseDate", "synopsis", "title") SELECT "backgroundId", "country", "createdAt", "duration", "featured", "genre", "id", "popularity", "posterId", "realisatorId", "releaseDate", "synopsis", "title" FROM "Movie";
DROP TABLE "Movie";
ALTER TABLE "new_Movie" RENAME TO "Movie";
CREATE TABLE "new_Screening" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "startTime" DATETIME NOT NULL,
    "room" INTEGER NOT NULL,
    "roomCapacity" INTEGER NOT NULL,
    "availableSeats" INTEGER NOT NULL,
    "handicapFriendly" BOOLEAN NOT NULL DEFAULT true,
    "language" TEXT NOT NULL DEFAULT 'VF',
    "deleted" BOOLEAN NOT NULL DEFAULT false,
    "movieId" INTEGER NOT NULL,
    CONSTRAINT "Screening_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "Movie" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Screening" ("availableSeats", "createdAt", "handicapFriendly", "id", "language", "movieId", "room", "roomCapacity", "startTime") SELECT "availableSeats", "createdAt", "handicapFriendly", "id", "language", "movieId", "room", "roomCapacity", "startTime" FROM "Screening";
DROP TABLE "Screening";
ALTER TABLE "new_Screening" RENAME TO "Screening";
CREATE TABLE "new_Actor" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,
    "idTmdb" INTEGER NOT NULL,
    "deleted" BOOLEAN NOT NULL DEFAULT false,
    "iconId" INTEGER,
    CONSTRAINT "Actor_iconId_fkey" FOREIGN KEY ("iconId") REFERENCES "Picture" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Actor" ("createdAt", "iconId", "id", "idTmdb", "name") SELECT "createdAt", "iconId", "id", "idTmdb", "name" FROM "Actor";
DROP TABLE "Actor";
ALTER TABLE "new_Actor" RENAME TO "Actor";
CREATE TABLE "new_Realisator" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,
    "idTmdb" INTEGER NOT NULL,
    "deleted" BOOLEAN NOT NULL DEFAULT false,
    "iconId" INTEGER,
    CONSTRAINT "Realisator_iconId_fkey" FOREIGN KEY ("iconId") REFERENCES "Picture" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Realisator" ("createdAt", "iconId", "id", "idTmdb", "name") SELECT "createdAt", "iconId", "id", "idTmdb", "name" FROM "Realisator";
DROP TABLE "Realisator";
ALTER TABLE "new_Realisator" RENAME TO "Realisator";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
