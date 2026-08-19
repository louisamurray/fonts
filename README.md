# Type Case

A font collection and browsable showcase.

## What's here

- **`fonts.jsx`** — a React component ("Type Case") that renders a browsable
  specimen gallery of every font family in the collection, with category
  filters (sans / serif / display / script / mono), search, copy-CSS-stack,
  and dark mode.
- **`fonts/`** — 475 font families as TTF files (~474 MB), one directory per
  family. Stored via [Git LFS](https://git-lfs.com).

## Cloning

This repo uses Git LFS for the font binaries. Install LFS before cloning:

```sh
brew install git-lfs   # or your platform's equivalent
git lfs install
git clone <repo-url>
```

Without LFS you'll get small pointer files instead of the actual fonts.

## Using the showcase component

`fonts.jsx` is a self-contained React component (no props required). Drop it
into any React app:

```jsx
import TypeCase from "./fonts.jsx";

export default function App() {
  return <TypeCase />;
}
```

The component renders specimens using local font stacks, so fonts must be
installed on the viewing machine (or loaded as web fonts) to display as
intended.

## Font licensing — read this

The families in `fonts/` come from mixed sources. Many are open licensed
(Google Fonts / SIL OFL), but a substantial number are **proprietary fonts
that ship with Windows, Microsoft Office, or commercial foundry licenses**
(e.g. Aptos, Segoe, Abadi, Agency FB, Avenir Next LT Pro). Those licenses
generally do **not** permit redistribution.

Anyone using fonts from this collection is responsible for holding the
appropriate license for each font they install or embed.
