-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Realisator" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,
    "idTmdb" INTEGER NOT NULL,
    "pictureId" INTEGER,
    CONSTRAINT "Realisator_pictureId_fkey" FOREIGN KEY ("pictureId") REFERENCES "Picture" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Realisator" ("createdAt", "id", "idTmdb", "name", "pictureId") SELECT "createdAt", "id", "idTmdb", "name", "pictureId" FROM "Realisator";
DROP TABLE "Realisator";
ALTER TABLE "new_Realisator" RENAME TO "Realisator";
CREATE UNIQUE INDEX "Realisator_idTmdb_key" ON "Realisator"("idTmdb");
CREATE TABLE "new_Actor" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,
    "idTmdb" INTEGER NOT NULL,
    "pictureId" INTEGER,
    CONSTRAINT "Actor_pictureId_fkey" FOREIGN KEY ("pictureId") REFERENCES "Picture" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Actor" ("createdAt", "id", "idTmdb", "name", "pictureId") SELECT "createdAt", "id", "idTmdb", "name", "pictureId" FROM "Actor";
DROP TABLE "Actor";
ALTER TABLE "new_Actor" RENAME TO "Actor";
CREATE UNIQUE INDEX "Actor_idTmdb_key" ON "Actor"("idTmdb");
CREATE TABLE "new_Movie" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "title" TEXT NOT NULL,
    "genre" TEXT,
    "releaseDate" DATETIME NOT NULL,
    "synopsis" TEXT,
    "duration" INTEGER NOT NULL,
    "country" TEXT,
    "pictureId" INTEGER,
    "realisatorId" INTEGER NOT NULL,
    CONSTRAINT "Movie_pictureId_fkey" FOREIGN KEY ("pictureId") REFERENCES "Picture" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Movie_realisatorId_fkey" FOREIGN KEY ("realisatorId") REFERENCES "Realisator" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Movie" ("country", "createdAt", "duration", "genre", "id", "pictureId", "realisatorId", "releaseDate", "synopsis", "title") SELECT "country", "createdAt", "duration", "genre", "id", "pictureId", "realisatorId", "releaseDate", "synopsis", "title" FROM "Movie";
DROP TABLE "Movie";
ALTER TABLE "new_Movie" RENAME TO "Movie";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
