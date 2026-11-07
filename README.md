# Verity download website

Live site: https://veritylocal.github.io/

Static organization website, served from the root of `main` with GitHub Pages.
No build system, third-party scripts, analytics, forms or document uploads.
Download links target immutable, explicitly labeled development release assets
in [VerityLocal/Main](https://github.com/VerityLocal/Main).

The shared Chrome/Edge extension ZIP works on macOS and Windows, but analysis
still requires the matching desktop companion. Both companion installers already
include the extension. The website offers all three downloads and their checksums.

Setup downloads permitted hash-pinned Desklib/BGE models where hardware permits;
the full Falcon pair is resource-gated. Code checkpoint/corpus permissions and
independent calibration remain explicit gates, not fabricated setup successes.

When updating a release, update its version and links in `index.html`, and exact
asset sizes/checksums in `downloads.json`. Keep unsigned, platform-validation and
AI-model limitations visible. Checksums are not code signatures.

Preview locally with `python -m http.server 8766`. Download links work without
JavaScript; `downloads.js` only adds same-origin file-size metadata.
