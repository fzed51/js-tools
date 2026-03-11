# Conventions du projet js-tools

Bibliothèque d'utilitaires TypeScript publiée sous `@fzed51/js-tools`.

## Stack

- **TypeScript** strict (~5.x), target ES2022, `verbatimModuleSyntax`
- **Bundler resolution**, Node ≥ 18
- **Biome** pour le lint et le formatage
- **Jest** + ts-jest pour les tests
- **Yarn** 4.x comme gestionnaire de paquets
- Build dual : ESM + CommonJS + déclarations de types

## Nommage et langue

- **Langue du code** : anglais — noms de variables, fonctions, classes, types, constantes
- **Commentaires** : anglais, français autorisé (les commentaires `//` et `/* */` sont en anglais mais peuvent être en français)
- **Variables / fonctions** : `camelCase`
- **Classes / interfaces / types** : `PascalCase`
- **Constantes** : `UPPER_SNAKE_CASE`
- **Fichiers** : `kebab-case` (ex : `simple-cache.ts`, `millisec.types.ts`)

## Style de code (Biome)

- Indentation : **espaces** (pas de tabulations)
- Longueur de ligne max : **80 caractères**
- Guillemets : **doubles** (`"`)
- Virgules finales : **toujours**
- Points-virgules : **toujours**
- Imports : organisés automatiquement

## Structure des modules

Chaque module suit ce schéma :

```
src/<module>/
  index.ts          ← exports nommés (barrel)
  <module>.ts       ← implémentation
  <module>.types.ts ← interfaces / types séparés
  <module>.spec.ts  ← tests
```

- Fonctions **pures**, petites, ciblées
- Exports nommés uniquement (pas d'exports par défaut)
- Les types complexes vont dans un fichier `*.types.ts` dédié

## Tests

- Extension : `*.spec.ts`
- **Descriptions en anglais** (`describe`, `it`, `test`)
- Pattern Arrange → Act → Assert
- Couvrir les cas limites : chaînes vides, accents, caractères spéciaux, espaces
- Plusieurs assertions par `it()` quand elles testent la même logique

## Documentation

- Langue : **français**
- README et `docs/*.md` en français
- JSDoc sur les méthodes publiques des classes

## Commandes utiles

```sh
yarn test          # lancer les tests
yarn build         # ESM + CJS + types en parallèle
yarn check         # lint Biome (vérification)
yarn check:w       # lint Biome (correction automatique)
```
