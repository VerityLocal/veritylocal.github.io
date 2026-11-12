# Verity Local website

Live site: https://veritylocal.github.io/

The project download and illustrated setup website for [Verity Local](https://github.com/VerityLocal/Main).

## Run locally

```sh
python3 -m http.server 8080 --bind 127.0.0.1
```

Open `http://127.0.0.1:8080`. This is a static HTML/CSS/JavaScript website; there is no build step, CDN dependency, analytics, or document-upload endpoint.

## Content

- `index.html`: product overview, screenshots, release downloads, platform-specific setup, and troubleshooting.
- `styles.css`: responsive styling, keyboard focus, and reduced-motion support.
- `site.js`: navigation, accessible OS tabs, command copying, screenshot enlargement, and optional download-size metadata.
- `assets/`: actual extension screenshots and a public synthetic demonstration PDF.
- `release-metadata.json`: exact release asset sizes and SHA-256 hashes.

The screenshots are captured from the real extension using `docs/examples/verity-local-demo.pdf` in the main repository. Tokens remain masked. The source capture utility is `scripts/capture_screenshots.mjs` in `VerityLocal/Main`.

## Deploy

GitHub Pages publishes the root of the `main` branch. `.nojekyll` keeps files unprocessed. Update explicit versioned GitHub release URLs in `index.html` and `release-metadata.json` together when shipping a new version.

Application source: https://github.com/VerityLocal/Main

Organization README: https://github.com/VerityLocal/.github
