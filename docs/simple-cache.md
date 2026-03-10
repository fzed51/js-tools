# SimpleCache

Cache en mémoire avec support TTL (Time To Live). Gère les requêtes concurrentes pour éviter les exécutions dupliquées sur la même clé.

## Import

```ts
import { SimpleCache } from "@fzed51/js-tools";
```

## Constructeur

```ts
new SimpleCache(ttlMs: number)
```

| Paramètre | Type     | Description                               |
| --------- | -------- | ----------------------------------------- |
| `ttlMs`   | `number` | Durée de vie des entrées en millisecondes |

```ts
import { SimpleCache, millisec } from "@fzed51/js-tools";

const cache = new SimpleCache(millisec("5m")); // TTL de 5 minutes
```

## Méthodes

### `fetch<T>(key, callback): Promise<T>`

Retourne la valeur en cache si elle existe et n'est pas expirée, sinon exécute le callback, met le résultat en cache et le retourne.

Si plusieurs appels concurrents arrivent pour la même clé pendant l'exécution du callback, ils partagent tous la même promesse — le callback n'est exécuté qu'une seule fois.

```ts
async fetch<T>(key: string, callback: () => T | Promise<T>): Promise<T>
```

| Paramètre  | Type                    | Description                          |
| ---------- | ----------------------- | ------------------------------------ |
| `key`      | `string`                | Clé identifiant l'entrée en cache    |
| `callback` | `() => T \| Promise<T>` | Fonction à appeler si cache manquant |

**Retour :** `Promise<T>`

```ts
const data = await cache.fetch("users", () => fetchUsersFromDB());
```

### `has(key): boolean`

Vérifie si une clé existe dans le cache et n'est pas expirée.

```ts
has(key: string): boolean
```

```ts
cache.has("users"); // true ou false
```

### `delete(key): boolean`

Supprime manuellement une entrée du cache (résultat et exécution en cours).

```ts
delete(key: string): boolean
```

Retourne `true` si au moins une entrée a été supprimée.

### `clear(): void`

Vide entièrement le cache (résultats et exécutions en cours).

```ts
cache.clear();
```

## Propriétés

### `size: number`

Nombre d'entrées actuellement dans le cache des résultats (non expirées incluses).

```ts
console.log(cache.size); // 3
```

### `executingCount: number`

Nombre de callbacks actuellement en cours d'exécution.

```ts
console.log(cache.executingCount); // 1
```

## Comportement du TTL

- Les entrées expirées sont automatiquement nettoyées à chaque appel à `fetch`.
- Une entrée expirée mais non encore nettoyée est ignorée (le callback est ré-exécuté).

## Exemple complet

```ts
import { SimpleCache, millisec } from "@fzed51/js-tools";

const cache = new SimpleCache(millisec("10m"));

async function getUser(id: string) {
  return cache.fetch(`user:${id}`, async () => {
    const response = await fetch(`/api/users/${id}`);
    return response.json();
  });
}

// Appels concurrents : le fetch HTTP n'est déclenché qu'une seule fois
const [user1, user2] = await Promise.all([getUser("42"), getUser("42")]);
```
