# Comprendre Postgres & ses BDD

## Postgres

C'est un **SGBD** :
- Système de Gestion de Base`s` de Donnée`s`

C'est un **serveur** :
- tourne en tâche de fond sur la machine
- on ne "voit" pas où et comment sont vraiment stockées les données sur la machine (potentiellement vers `/var/lib/pgsql/data` ou `/opt/homebrew/var/postgresql`, mais ça n'a aucune importance !)

## Client Postgres

Pour se **connecter** à Postgres (serveur), il nous faut un **client**. On peut alors visualiser et requêter les données qui s'y trouvent.

Exemples de client :
- `psql` est un client `CLI` (Terminal)
- `pg` est un client `Node.js` (JavaScript)
- `pgAdmin` est un client `GUI` (interface graphique)
- `DBeaver` est un client `GUI` (interface graphique)
- `TablePlus` est un client `GUI` (payant)

## Base de Données

Dans Postgres, on peut créer/gérer **plusieurs BDDs** :
- une **BDD** est un ensemble de **tables** qui contiennent des **enregistrements**. 
  - par exemple : la BDD `trombinoclock` possède une table `teacher` et `student`.
- une **table** contient plusieurs **champs** (ou colonnes).
  - par exemple : le champs `firstname` pour stocker le prénom des enregistrements.

<img width="801" alt="postgres" src="https://user-images.githubusercontent.com/98805541/261988845-4b9c492b-ad1e-46d9-a6cd-1ccaf3ae6831.png">

Nos données sont donc stucturées et stockées dans les différentes tables d'une BDD: 
- une ligne = un enregistrement 

## Utilisateur de base de données

Chaque BDD peut être administrée par un "utilisateur" du SGBD. Généralement, on créé un administrateur par BDD dans notre SGBD, qui porte le même nom que la BDD. 

Par exemple, pour une BDD `trombinoclock`, on créera un utilisateur `trombinoclock` avec tous les droits sur la BDD `trombinoclock`.

## Visualiser notre SGBD via `psql`

Rappel : `psql` est un client pour se connecter à un `SGBD` Postgres via son terminal.

#### Se connecter via `psql`

- `sudo -i -u postgres psql` : on se connecte en tant qu'utilisateur `postgres` sur la BDD `postgres`. C'est un "super user" (admin global) de Postgres. Très pratique pour gérer son SGBD de manière générale.

#### Farfouiller dans son serveur Postgres via `psql`

- `\l` : liste toutes les BDD présentes dans son serveur Postgres.
- `\du` : liste tous les utilisateurs présents dans son serveur Postgres.

- `\conninfo` : précise sur quelle BDD et avec quel utilisateur on est connecté à son serveur Postgres.
- `\c nom_base nom_utilisateur` : pour se connecter à la base `nom_base` avec l'utilisateur `nom_utilisateur`.

- `\dt` : liste les tables de la BDD dans laquelle on est connecté.