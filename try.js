// -- Insérer un étudiant qui s appelle chuck norris dans la table student appartenant a la promo 5
INSERT INTO student (first_name,  last_name ,  promo_id) VALUES ('Chuck',  'Norris', 5);

// -- Insérer une promo César dans la table "promo" et ne possede pas d orga
INSERT INTO promo (name, github_organization, id ) VALUES ('César', 'without' ,'6666');

// -- Mettre à jour la promo 5 pour la renommer en "Cleo"
UPDATE promo SET name = 'Cleo' WHERE id = 5;

// -- Supprimer la promo avec l'ID 123
DELETE FROM student WHERE promo_id = 123; DELETE FROM promo WHERE id = 123;
