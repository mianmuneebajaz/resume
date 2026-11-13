# mianmuneebajaz.com

Personal portfolio and resume site for Muneeb Ajaz, live at [mianmuneebajaz.com](https://mianmuneebajaz.com).

It is a static, single page site based on the [Start Bootstrap Resume](https://startbootstrap.com/theme/resume) theme (Bootstrap 4, jQuery), with a custom skills section (filterable cards, search, keyboard shortcuts, orbit animation) and a tag cloud.

## Layout

```
docs/                 Deployed site (everything in here is served as is)
  index.html          The page (skills grid and Core Expertise list are pre-rendered into it)
  css/styles.css      GENERATED: purged + minified build of src/css/*.css plus icon CSS
  webfonts/           GENERATED: Font Awesome subset fonts (only the icons the page uses)
  js/scripts.js       Theme behaviour, skills section, tag cloud
  assets/JQwcloud.js  jQuery word cloud plugin
  assets/img/         profile.webp (sidebar photo), og-image.jpg (1200x630 social preview)
  data/tags.txt       Words for the tag cloud, one per line
  data/experiences.txt  Core Expertise items, one per line (pre-rendered into index.html)
  robots.txt, sitemap.xml
  favicon.ico         16/32/48 px icon
  apple-touch-icon.png
src/css/styles.css    Bootstrap 4.5 + Start Bootstrap Resume theme
src/css/custom.css    Site specific styles, applied after the theme. Most edits go here.
scripts/prerender.mjs Writes the skills grid and Core Expertise list into docs/index.html
scripts/build.mjs     Builds docs/css/styles.css and docs/webfonts/
```

## Branches and deployment

- `site` holds the site code. Open pull requests against `site`; CI/CD deploys it automatically on merge.
- `master` holds this README and the license only.

## Local development

Requirements: Node.js 18 or newer.

```sh
npm install
npm run build   # pre-render index.html, then regenerate docs/css/styles.css and docs/webfonts/
npm run serve   # serve docs/ on http://localhost:5501
```

Any static file server works too, for example `python3 -m http.server 5501 --directory docs`. Serve from `docs/` so that `data/tags.txt` resolves.

### When to rebuild

Run `npm run build` and commit the output whenever you:

- edit `skillsDatabase` / `categoryLabels` in `docs/js/scripts.js` or `docs/data/experiences.txt` (the pre-rendered HTML is regenerated so crawlers without JavaScript see the same content; `npm run prerender:check` fails if `index.html` is stale),
- change anything in `src/css/`,
- add or rename classes in `docs/index.html` or `docs/js/*.js` (unused CSS is purged, so new classes need a rebuild to get their styles),
- use a new Font Awesome icon (`fas fa-*` / `fab fa-*`, v5.13 names). The build scans the HTML and JS for `fa-*` names and only ships those glyphs.

Classes that only appear at runtime and are not written literally in the HTML or JS must be added to the `safelist` in `scripts/build.mjs`.

### Performance notes

- Third party scripts (jQuery, Bootstrap, jQuery Easing) load with `defer` and Subresource Integrity hashes. If you bump a version, update its `integrity` attribute (`curl -s URL | openssl dgst -sha384 -binary | openssl base64 -A`).
- Keep images close to their displayed size. The sidebar photo is a 256 px wide WebP with explicit `width`/`height` to avoid layout shift.

## License

GPL-3.0, see [LICENSE](LICENSE). Bootstrap and the Start Bootstrap theme are MIT licensed; Font Awesome Free fonts are SIL OFL 1.1.
