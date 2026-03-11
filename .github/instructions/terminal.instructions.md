---
applyTo: "**"
description: "Use when running terminal commands — redirecting output to .output file to work around Copilot console read bug"
---

# Terminal — Contournement de la lecture console

Il existe un bug dans la version actuelle de GitHub Copilot qui empêche de lire correctement la sortie des commandes terminal. Pour y remédier :

## Règles obligatoires

1. **Toujours** rediriger stdout + stderr vers `./.output` :
   ```sh
   some-command > ./.output 2>&1
   ```
2. **Toujours** écraser le fichier (utiliser `>`, pas `>>`) pour ne pas accumuler du contenu.
3. **Toujours** lire `./.output` avec l'outil de lecture de fichier pour obtenir le résultat.
4. Ne jamais supposer qu'une commande a réussi sans avoir lu `./.output`.

## Exemple

```sh
# Lancer les tests et lire le résultat
yarn test > ./.output 2>&1
# → lire ./.output
```

```sh
# Vérifier le build
yarn build > ./.output 2>&1
# → lire ./.output
```
