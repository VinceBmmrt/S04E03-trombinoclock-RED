# PostgresSQL

C'est un SGBDR

Utilise le langage SQL

!! Pour se connecter à la db distante Oclock sur la VM :

```bash
psql -h pg.oclock.lan -U etudiant -d trombi
```

Mdp : `js4life`

## SQL

= Structured Query Language

Un language de base de données, nous permet de communiquer avec la BDD.

Il fonctionne avec des instructions que l'on écrit en MAJUSCULES et chaque commande SQL doit se terminer par un ';'

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

### Postgres + NodeJS

- On va utiliser le package 'pg' qui est un client postgreSQL pour NodeJS.

[doc](https://node-postgres.com/)

On se connecte via une string de connexion qui prend la structure suivante :

'sgbd://user:mdp@host/nom_db'

Pour la db sur le serveur oclock : 
'postgresql://etudiant:js4life@pg.oclock.lan/trombi'