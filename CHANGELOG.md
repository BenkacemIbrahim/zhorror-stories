# Changelog

All notable changes to this project are documented here.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- README with screenshots, contributing guide and changelog.
- MIT licence, `.gitignore`, `.gitattributes` and `.editorconfig`.

### Changed

- Reorganised the flat file dump into `index.html`, `pages/`, `components/` and
  `assets/`, with descriptive file names throughout.
- Renamed every image to a descriptive, URL-safe name and updated all references.
- Extracted each page's inline `<style>` block into `assets/css/`.
- Extracted each page's inline `<script>` blocks and duplicated Tailwind theme
  into `assets/js/` and `assets/js/config/`.
- Served the previously remote-hosted images from `assets/images/`.

### Removed

- Unreferenced draft files and the stale brand logo variant.

### Fixed

- Stripped Cloudflare email-protection and challenge artefacts that had been
  saved into the original pages.
