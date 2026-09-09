# BASE bilingual portfolio

GitHub Pages entry: https://afay-023.github.io/base-factory/

- `zh/index.html`: Chinese case study
- `en/index.html`: English case study
- `zh/prototype.html`: Chinese interactive prototype
- `en/prototype.html`: English interactive prototype

The root selects an explicit `?lang=zh` / `?lang=en`, then a saved language preference, then the browser language (Chinese for `zh-*`, English otherwise). Locale-specific links always open their specified language. The language bar remembers a manual choice. Prototype navigation is retained on language changes; each language has separate local demo drafts so a switch does not overwrite user content.

The prototype runs entirely in the browser with sample data. It does not connect an inbox, calendar, live collector or model executor. The original Chinese source files are maintained separately and were not modified for this release.

Publish through GitHub Pages from the `main` branch, repository root. All site paths are relative to support the `/base-factory/` prefix.
