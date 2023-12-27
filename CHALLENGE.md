# Challenge Épisode 3

## Écrire du SQL (oui, encore !)

Reprendre le fichier de requêtes SQL préparé hier, et ajouter les requêtes suivantes :

- Insérer dans la table "student" un étudiant qui s'appelle "Chuck Norris" appartenant à la promo 5
- Insérer dans la table "promo" une promo qui s'appelle "César" et ne possède pas d'orga
- Mettre à jour la promo 5 pour la renommer "Cleo"
- Supprimer la promo 123

## Bonus : async

Les promesses c'est chouette, mais elles ouvrent la voie à l'utilisation d'un mécanisme encore plus sympa en terme de lisibilité : async/await !

Et si, au lieu de se prendre la tête avec les callback on les supprimait :O.

Objectif, avoir un code qui **ressemble** à

```js
const results = client.query('SQL');
 // faire des trucs avec results

```

au lieu de

```js
client.query('SQL').then((results) => {
  // faire des trucs avec results
});
```

en utilisant les mots clefs `async` et `await`

<details>
<summary>Un coup de main</summary>

async/await sont des mots clefs qui permettent de rendre la promesse complètement transparente. `await` permet de dire à une fonction qui devrait nous renvoyer une promesse : "non, mais en fait je n'en veux pas de ta promesse, je vais directement attendre le résultat, je ne passe pas à la suite tant que je ne l'ai pas !"

```js
client.query('du SQL').then((results) => {
  // faire des trucs avec results
});
```
  
devient
  
```js
const results = await client.query('du SQL');
 ```

Par contre ! Ça n'est pas non plus la fête du slip, on peut passer l'appel asynchrone de la requête SQL en "_synchrone_", mais à la seule condition de passer *toute* la fonction qui contient ce code en asynchrone pour lui spécifier qu'il y aura du code asynchrone à l'intérieur.
  
```js
// on note l'ajout de async avant la fonction
async promoList(req, res) {
  const results = await client.query('du SQL');
  // faire des trucs avec results
}
```
  
Bah, oui, mais et pour l'erreur ? Je vous laisse chercher. Allez, un petit indice : https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Statements/try...catch
  
</details>