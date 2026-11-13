# Portfolio site

Static site served from this folder.

The skills grid and the Core Expertise list are pre-rendered into `index.html` so crawlers without JavaScript see them.
After editing `skillsDatabase` in `js/scripts.js` or `data/experiences.txt`, regenerate:

```
node scripts/prerender.mjs          # rewrite docs/index.html
node scripts/prerender.mjs --check  # fail if index.html is stale
```
