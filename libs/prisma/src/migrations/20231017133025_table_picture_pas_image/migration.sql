/*
  Warnings:

  - You are about to drop the `Image` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `imageId` on the `Movie` table. All the data in the column will be lost.
  - You are about to drop the column `imageId` on the `Actor` table. All the data in the column will be lost.
  - You are about to drop the column `imageId` on the `Realisator` table. All the data in the column will be lost.
  - Added the required column `pictureId` to the `Movie` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pictureId` to the `Actor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pictureId` to the `Realisator` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Image_cloudinaryId_key";

-- DropIndex
DROP INDEX "Image_url_key";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Image";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Picture" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "url" TEXT NOT NULL,
    "cloudinaryId" TEXT NOT NULL
);

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
    "pictureId" INTEGER NOT NULL,
    "realisatorId" INTEGER NOT NULL,
    CONSTRAINT "Movie_pictureId_fkey" FOREIGN KEY ("pictureId") REFERENCES "Picture" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Movie_realisatorId_fkey" FOREIGN KEY ("realisatorId") REFERENCES "Realisator" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Movie" ("country", "createdAt", "duration", "genre", "id", "realisatorId", "releaseDate", "synopsis", "title") SELECT "country", "createdAt", "duration", "genre", "id", "realisatorId", "releaseDate", "synopsis", "title" FROM "Movie";
DROP TABLE "Movie";
ALTER TABLE "new_Movie" RENAME TO "Movie";
CREATE TABLE "new_Actor" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,
    "idTmdb" INTEGER NOT NULL,
    "pictureId" INTEGER NOT NULL,
    CONSTRAINT "Actor_pictureId_fkey" FOREIGN KEY ("pictureId") REFERENCES "Picture" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
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
    "pictureId" INTEGER NOT NULL,
    CONSTRAINT "Realisator_pictureId_fkey" FOREIGN KEY ("pictureId") REFERENCES "Picture" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Realisator" ("createdAt", "id", "idTmdb", "name") SELECT "createdAt", "id", "idTmdb", "name" FROM "Realisator";
DROP TABLE "Realisator";
ALTER TABLE "new_Realisator" RENAME TO "Realisator";
CREATE UNIQUE INDEX "Realisator_idTmdb_key" ON "Realisator"("idTmdb");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "Picture_url_key" ON "Picture"("url");

-- CreateIndex
CREATE UNIQUE INDEX "Picture_cloudinaryId_key" ON "Picture"("cloudinaryId");
