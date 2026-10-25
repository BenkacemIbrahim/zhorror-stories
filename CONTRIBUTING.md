# Contributing to Z Horror

Thanks for taking the time to improve the project. This is a static front end,
so the workflow is deliberately simple.

## Getting set up

There is nothing to install or build.

```bash
git clone <repository-url>
cd zhorror-stories
npx serve .
```

Open <http://localhost:3000> and browse to the page you are working on.

## Project conventions

- **One asset file per page.** A page's CSS lives at `assets/css/<same path>.css`
  and its JavaScript at `assets/js/<same path>.js`. If you add a page, add both.
- **No inline `<style>` or `<script>` blocks.** The only exceptions are the
  third-party CDN `<script src>` tags and the Tailwind theme config, which is
  loaded from `assets/js/config/`.
- **Do not merge the Tailwind configs.** The variants in `assets/js/config/`
  are intentionally different. Only reuse a config file for pages that share the
  exact same theme.
- **Keep the markup in Arabic and the document RTL.** `lang="ar" dir="rtl"`.
- **Match the existing style**: 4-space indentation in HTML and CSS, 2 spaces in
  JavaScript, CRLF line endings (see `.editorconfig`).

## Changing styles

Edit `assets/css/...` — never the CDN build. Utility classes in the markup are
fine; anything reusable belongs in the page stylesheet.

## Changing behaviour

Edit `assets/js/pages/<page>.js`. Keep the code framework-free and avoid adding
a build step or a bundler.

## Before you open a pull request

1. Open every page you touched in a browser and confirm nothing moved.
2. Check the browser console for errors on each page.
3. Keep the diff focused — one concern per pull request.

## Commit messages

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```text
feat: add chapter navigation to the story reader
fix: stop the header search dropdown from overflowing
docs: document the tailwind config variants
```

## Reporting issues

Include the page you were on, the browser and version, and what you expected to
happen. A screenshot helps a lot on a design-heavy project.

## Licence

By contributing you agree that your work is released under the
[MIT Licence](LICENSE).
