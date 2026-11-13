# mianmuneebajaz.com

Personal portfolio and resume site for Muneeb Ajaz, live at [mianmuneebajaz.com](https://mianmuneebajaz.com).

It is a static, single page site based on the [Start Bootstrap Resume](https://startbootstrap.com/theme/resume) theme (Bootstrap 4, jQuery), with a custom skills section (filterable cards, search, keyboard shortcuts, orbit animation) and a tag cloud.

## Layout

```
docs/                 Deployed site (everything in here is served as is)
  index.html          The page
  css/styles.css      GENERATED: purged + minified build of src/css/styles.css plus icon CSS
  webfonts/           GENERATED: Font Awesome subset fonts (only the icons the page uses)
  js/scripts.js       Theme behaviour, skills section, tag cloud
  assets/JQwcloud.js  jQuery word cloud plugin
  assets/img/         profile.webp (sidebar photo), og-image.jpg (1200x630 social preview)
  data/tags.txt       Words for the tag cloud, one per line
  favicon.ico         16/32/48 px icon
  apple-touch-icon.png
src/css/styles.css    Stylesheet source (Bootstrap + theme + custom sections). Edit this one.
tools/build.mjs       Build script for the generated files above
```

## Branches and deployment

- `site` holds the site code. Open pull requests against `site`; CI/CD deploys it automatically on merge.
- `master` holds this README and the license only.

## Local development

Requirements: Node.js 18 or newer.

```sh
npm install
npm run build   # regenerate docs/css/styles.css and docs/webfonts/
npm run serve   # serve docs/ on http://localhost:5501
```

Any static file server works too, for example `python3 -m http.server 5501 --directory docs`. Serve from `docs/` so that `data/tags.txt` resolves.

### When to rebuild

Run `npm run build` and commit the output whenever you:

- change `src/css/styles.css`,
- add or rename classes in `docs/index.html` or `docs/js/*.js` (unused CSS is purged, so new classes need a rebuild to get their styles),
- use a new Font Awesome icon (`fas fa-*` / `fab fa-*`, v5.13 names). The build scans the HTML and JS for `fa-*` names and only ships those glyphs.

Classes that only appear at runtime and are not written literally in the HTML or JS must be added to the `safelist` in `tools/build.mjs`.

### Performance notes

- Third party scripts (jQuery, Bootstrap, jQuery Easing) load with `defer` and Subresource Integrity hashes. If you bump a version, update its `integrity` attribute (`curl -s URL | openssl dgst -sha384 -binary | openssl base64 -A`).
- Keep images close to their displayed size. The sidebar photo is a 256 px wide WebP with explicit `width`/`height` to avoid layout shift.

## License

GPL-3.0, see [LICENSE](LICENSE). Bootstrap and the Start Bootstrap theme are MIT licensed; Font Awesome Free fonts are SIL OFL 1.1.
