# @fzed51/js-tools

Collection d'utilitaires JavaScript/TypeScript : datetime, cache, string.

## Installation

```bash
npm install @fzed51/js-tools
# ou
yarn add @fzed51/js-tools
```

## Compatibilité

- ESM et CommonJS
- Types TypeScript inclus
- Node.js ≥ 18

## Modules

### `datetime`

Utilitaires pour manipuler les durées temporelles.

```ts
import { millisec, SECONDE, MINUTE, HOUR, DAY } from "@fzed51/js-tools";

millisec("1.5h"); // 5400000
millisec("30m");  // 1800000
```

→ [Documentation complète](docs/datetime.md)

---

### `simple-cache`

Cache en mémoire avec TTL et déduplication des requêtes concurrentes.

```ts
import { SimpleCache, millisec } from "@fzed51/js-tools";

const cache = new SimpleCache(millisec("5m"));

const data = await cache.fetch("my-key", () => fetchDataFromAPI());
```

→ [Documentation complète](docs/simple-cache.md)

---

### `string`

Manipulation de chaînes : suppression des accents, génération de slugs.

```ts
import { unaccented, slugify } from "@fzed51/js-tools";

unaccented("café au lait");  // "cafe au lait"
slugify("L'été arrive !");   // "l-ete-arrive"
```

→ [Documentation complète](docs/string.md)

---

## API de référence

| Export        | Module         | Description                                 |
| ------------- | -------------- | ------------------------------------------- |
| `millisec`    | `datetime`     | Convertit une durée en millisecondes        |
| `SECONDE`     | `datetime`     | Constante : 1 seconde en ms (`1 000`)       |
| `MINUTE`      | `datetime`     | Constante : 1 minute en ms (`60 000`)       |
| `HOUR`        | `datetime`     | Constante : 1 heure en ms (`3 600 000`)     |
| `DAY`         | `datetime`     | Constante : 1 jour en ms (`86 400 000`)     |
| `SimpleCache` | `simple-cache` | Cache mémoire avec TTL                      |
| `unaccented`  | `string`       | Supprime les diacritiques d'une chaîne      |
| `slugify`     | `string`       | Convertit une chaîne en slug URL-compatible |

## Développement

```bash
# Tests
yarn test

# Build
yarn build

# Lint / format
yarn check
yarn check:w
```

## Licence

MIT
