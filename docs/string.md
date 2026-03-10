# string

Utilitaires de manipulation de chaînes de caractères.

## `unaccented(str: string): string`

Supprime tous les diacritiques (accents, trémas, cédilles…) d'une chaîne en utilisant la décomposition Unicode NFD.

### Paramètres

| Paramètre | Type     | Description         |
| --------- | -------- | ------------------- |
| `str`     | `string` | La chaîne à traiter |

### Retour

Retourne un `string` sans diacritiques.

### Exemples

```ts
import { unaccented } from "@fzed51/js-tools";

unaccented("café")                          // "cafe"
unaccented("à bientôt")                     // "a bientot"
unaccented("Ça, c'est très intéressant !")  // "Ca, c'est tres interessant !"
unaccented("Héllo Wörld")                   // "Hello World"
unaccented("hello")                         // "hello"  (inchangé)
```

---

## `slugify(str: string): string`

Convertit une chaîne en slug URL-compatible : suppression des accents, mise en minuscules, remplacement des caractères non alphanumériques par des tirets.

Utilise `unaccented` en interne.

### Paramètres

| Paramètre | Type     | Description           |
| --------- | -------- | --------------------- |
| `str`     | `string` | La chaîne à convertir |

### Retour

Retourne un `string` sous forme de slug.

### Règles de transformation

1. Suppression des diacritiques
2. Mise en minuscules
3. Suppression des espaces en début/fin
4. Remplacement de toute séquence de caractères non alphanumériques par un seul tiret `-`
5. Suppression des tirets en début et fin de résultat

### Exemples

```ts
import { slugify } from "@fzed51/js-tools";

slugify("Hello World")                  // "hello-world"
slugify("café")                         // "cafe"
slugify("à bientôt")                    // "a-bientot"
slugify("Ça va très bien")              // "ca-va-tres-bien"
slugify("hello, world!")                // "hello-world"
slugify("foo@bar.baz")                  // "foo-bar-baz"
slugify("100% réussi")                  // "100-reussi"
slugify("  hello  ")                    // "hello"
slugify("--hello--")                    // "hello"
slugify("hello---world")               // "hello-world"
slugify("  L'été, c'est très agréable ! ")  // "l-ete-c-est-tres-agreable"
slugify("")                             // ""
```
