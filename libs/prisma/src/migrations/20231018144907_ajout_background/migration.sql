/*
  Warnings:

  - Added the required column `popularity` to the `Movie` table without a default value. This is not possible if the table is not empty.

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
    "posterId" INTEGER,
    "backgroundId" INTEGER,
    "realisatorId" INTEGER,
    CONSTRAINT "Movie_posterId_fkey" FOREIGN KEY ("posterId") REFERENCES "Picture" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Movie_backgroundId_fkey" FOREIGN KEY ("backgroundId") REFERENCES "Picture" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Movie_realisatorId_fkey" FOREIGN KEY ("realisatorId") REFERENCES "Realisator" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Movie" ("country", "createdAt", "duration", "genre", "id", "posterId", "realisatorId", "releaseDate", "synopsis", "title") SELECT "country", "createdAt", "duration", "genre", "id", "posterId", "realisatorId", "releaseDate", "synopsis", "title" FROM "Movie";
DROP TABLE "Movie";
ALTER TABLE "new_Movie" RENAME TO "Movie";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
