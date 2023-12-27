L'étape la plus proche de la BDD, souvent c'est un script SQL de création de BDD :


CREATE TABLE IF NOT EXISTS "promo" (
  "id" INT NOT NULL PRIMARY KEY,
  "name" UNIQUE TEXT,
  "github_organization" TEXT
);

CREATE TABLE IF NOT EXISTS "student" (
  "id" SERIAL PRIMARY KEY,
  "first_name" TEXT,
  "last_name" TEXT,
  "github_username" TEXT,
  "profile_picture_url" TEXT,
  "promo_id" INT REFERENCES "promo"("id")
);