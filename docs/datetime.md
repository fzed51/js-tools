# datetime

Utilitaires pour manipuler les durées temporelles en millisecondes.

## Constantes

```ts
import { SECONDE, MINUTE, HOUR, DAY } from "@fzed51/js-tools";
```

| Constante | Valeur (ms)  | Description |
| --------- | ------------ | ----------- |
| `SECONDE` | `1 000`      | 1 seconde   |
| `MINUTE`  | `60 000`     | 1 minute    |
| `HOUR`    | `3 600 000`  | 1 heure     |
| `DAY`     | `86 400 000` | 1 jour      |

## `millisec(t: StringDelay): number`

Convertit une durée exprimée sous forme de chaîne (ou de nombre) en millisecondes.

### Paramètres

| Paramètre | Type          | Description                           |
| --------- | ------------- | ------------------------------------- |
| `t`       | `StringDelay` | La durée à convertir en millisecondes |

### Type `StringDelay`

```ts
type StringDelay = number | `${number}` | `${number}${Unit}`;
```

Les unités acceptées (insensibles à la casse) :

| Unité | Description                    |
| ----- | ------------------------------ |
| `ms`  | Millisecondes (défaut si omis) |
| `s`   | Secondes                       |
| `m`   | Minutes                        |
| `h`   | Heures                         |
| `d`   | Jours                          |

### Retour

Retourne un `number` représentant la durée en millisecondes.

Lance une `Error` si le format de la chaîne est invalide.

### Exemples

```ts
import { millisec } from "@fzed51/js-tools";

millisec(1500);       // 1500
millisec("1500");     // 1500
millisec("1500ms");   // 1500
millisec("1.5s");     // 1500
millisec("1m");       // 60000
millisec("2h");       // 7200000
millisec("1d");       // 86400000
millisec("-1.5m");    // -90000

// Insensible à la casse
millisec("1S");       // 1000
millisec("1MS");      // 1
```
