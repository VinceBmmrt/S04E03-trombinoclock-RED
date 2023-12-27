## CRUD

Ce sont les opérations courantes que l'on va vouloir effectuer sur des données :

- Create -> ?
- Read -> SELECT
- Update -> ?
- Delete -> ?

## Psql en local - Création DB

1. Se connecter au super utilisateur de psql sur la VM :

```bash
sudo -i -u postgres psql
```

2. Créer un utilisateur avec un mdp :

```sql
CREATE USER nom_user WITH PASSWORD 'password';
```

3. Créer une DB

```sql
CREATE DATABASE nom_de_la_db OWNER nom_du_user_propriétaire;
```

4. Se connecter avec un utilisateur sur une DB

Après être sorti de psql ('ctrl + d' / 'q') et en étant sur le terminal "classique"

```bash
psql -U nom_user -d nom_db
```

5. Créer une table

```sql
CREATE TABLE IF NOT EXISTS "nom_table" (
    "colonne1" TYPE CONTRAINTE1 CONTRAINTE2....,
    "id" INT UNIQUE NOT NULL PRIMARY KEY,
    "name" TEXT,
);
```

6. Supprimer définitivement une table

```sql
DROP TABLE "nom_table;
```

7. Alimenter une DB via un fichier .sql

?? Le plus simple étant de se positionner ave cle temrinal dans le dossier où se trouve le fichier sql en question, le chemin à indiquer sera alors juste le nom du fichier (ne pas oublier l'extension)

```bash
psql -U nom_user -d nom_db -f chemin_vers_fichier_sql
```


## Lire de la donnée - Read - SELECT

### SELECT

- Permet d'afficher de la donnée

```sql
SELECT colonnes_à_afficher, colonne1, colonne2 FROM table_ou_aller_chercher_les_enregistrements;
```

```sql
SELECT * (pour afficher toute les colonnes) FROM student;
```

### CLAUSE WHERE

- Permet de filtrer les résultats

```sql
SELECT * FROM student WHERE id = 2;
```

### OPERATEUR LIKE/ILIKE

- Permet de faire de la correspondance de texte (pattern matching)
- S'utilise avec des patterns de chaînes de caractère (regex)

LIKE = Case sensitive
ILIKE = Case Insensitive

```sql
SELECT * FROM student WHERE first_name LIKE 'Li%';
```

Retourne tous les enregistrements de la table/relation student, dont le prénom commence par 'Li'

### OPERATEURS OR/AND

- Permettent de spécifier plusieurs clauses WHERE

```sql
SELECT * FROM student WHERE first_name LIKE 'Li%' AND id < 406;
```

### LIMIT

- Permet de spécifier le nombre de résultats à retourner 
- Toujours en fin de requete !!

```sql
SELECT * FROM student WHERE first_name LIKE 'Li%' LIMIT 3;
```


## Créer un enregistrement - Create - INSERT INTO

### INSERT INTO

Permet de créer un OU plusieurs nouveaux enregistrement dans une table

```sql

INSERT INTO nom_table ("colonne1", "colonne2", etc...) 
VALUES 
-- 1er enregistrement 
(value_colonne1, value_colonne2), 
-- 2eme enregistrement
(value_colonne1, value_colonne2);


INSERT INTO promo ("id", "name") 
VALUES 
-- 1er enregistrement 
(900, 'Zavatta');

-- créer un étudiant dans la promo Zavatta
INSERT INTO student ("first_name", "last_name","promo_id")
VALUES ('Jean', 'Petit', 900);

```

## Supprimer un enregistrement - Delete - DELETE

```sql
DELETE FROM nom_table WHERE condition;
```

!! Si pas de clause WHERE, supprime tous les enregistrements de la table 

```sql
DELETE FROM nom_table;
```

### Vider entièrement une table

```sql
TRUNCATE TABLE nom_table;
```

## Modifier un enregistrement - Update - UPDATE

```sql
UPDATE nom_table SET nom_colonne = nouvelle_valeur_colonne WHERE condition;
```

!! Si on omet la condition, ce sont TOUTES les lignes de la table qui seront modifiées

```sql
UPDATE student SET last_name = 'Petit' WHERE id = 7161;
```

### Modifier la structure d'un table - ALTER

!! peu recommandé de modifier la structure d'une table uen fois qu'elle contient des données (ajout, suppression de colonne ou de contraintes)

- Ajouter une colonne 

```sql
ALTER TABLE nom_table ADD nom_colonne contraintes...
```

```sql
ALTER TABLE student ADD "age" SMALLINT;
```

- Ajouter une contrainte à une colonne

```sql
ALTER TABLE student ALTER "age" SET NOT NULL;
```

