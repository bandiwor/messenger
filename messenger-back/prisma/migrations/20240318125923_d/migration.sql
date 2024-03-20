-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Account" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "timeCreate" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "passwordHash" TEXT NOT NULL,
    "refreshToken" TEXT NOT NULL,
    "profileCreated" BOOLEAN NOT NULL DEFAULT false,
    "login" TEXT NOT NULL,
    "email" TEXT,
    "telephone" TEXT
);
INSERT INTO "new_Account" ("email", "id", "login", "passwordHash", "refreshToken", "telephone", "timeCreate") SELECT "email", "id", "login", "passwordHash", "refreshToken", "telephone", "timeCreate" FROM "Account";
DROP TABLE "Account";
ALTER TABLE "new_Account" RENAME TO "Account";
CREATE UNIQUE INDEX "Account_id_key" ON "Account"("id");
CREATE UNIQUE INDEX "Account_login_key" ON "Account"("login");
CREATE UNIQUE INDEX "Account_email_key" ON "Account"("email");
CREATE UNIQUE INDEX "Account_telephone_key" ON "Account"("telephone");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
