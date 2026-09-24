# AlgoLens

> See algorithms think.

An interactive algorithm visualization platform built for a Web Technologies
minor project. Select an algorithm, provide input, and watch it execute one
step at a time — with synchronized pseudocode, live complexity info, and full
playback control (play / pause / step / restart / speed).

## Stack

- React 18 + React Router (client-side only, no backend, no database)
- Vite
- Tailwind CSS

## Getting started

```bash
npm install
npm run dev
```

Then open the printed local URL (typically `http://localhost:5173`).

To produce a production build:

```bash
npm run build
npm run preview
```

## What's implemented

**Sorting** — Bubble Sort, Selection Sort, Insertion Sort, Merge Sort, Quick Sort
**Searching** — Linear Search, Binary Search

Every algorithm:
- Generates an explicit sequence of visualization states (never just the
  final result) — see `src/algorithms/**`
- Shows pseudocode with the executing line highlighted — `src/components/Pseudocode.jsx`
- Shows best/average/worst time complexity and space complexity — `src/components/InfoPanel.jsx`
- Supports Play, Pause, Next, Previous, Restart, and a speed slider — `src/hooks/useStepPlayer.js`
- Accepts random or custom input via `src/components/InputPanel.jsx`

Pages: Home (`/`), Algorithm Library (`/algorithms`), Playground (`/playground`).

## Architecture note

Each algorithm is a pure **step generator** — it never touches the DOM or
animation logic directly:

```
algorithm(input) -> [state, state, state, ...]
```

`useStepPlayer` walks that array; `SortVisualizer` / `SearchVisualizer` just
render whatever state they're handed. This is why adding a new algorithm only
means adding one file under `src/algorithms/` and one entry in
`src/data/algorithmMetadata.js` — the playback engine, controls, pseudocode
panel, and complexity panel don't change.

## Project structure

```
src/
├── algorithms/
│   ├── sorting/     bubbleSort, selectionSort, insertionSort, mergeSort, quickSort
│   └── searching/   linearSearch, binarySearch
├── components/       Navbar, InputPanel, Controls, Pseudocode, InfoPanel,
│                     SortVisualizer, SearchVisualizer
├── data/             algorithmMetadata.js (single source of truth per algorithm)
├── hooks/            useStepPlayer.js
└── pages/            Home, Library, Playground
```

Each algorithm file exports two things: a `pseudocode` array (the lines shown
in the panel) and a step-generator function (e.g. `bubbleSort(array)`) that
returns the full array of visualization states for that run.

## Not included (by design)

Graph algorithms, user accounts, backend/database, AI-generated explanations,
competitive programming features, saved/synced history. Everything runs
entirely client-side, in the browser.
"# AlgoLens" 
