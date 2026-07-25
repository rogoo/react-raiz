# Importante
O conteúdo abaixo foi criado pela minha querida amiga IA (Copilot). Achei muito bom e mantive em inglês mesmo (legal o note no final tipo "tem mensagem em portuguese no código"... haha).

De qualquer forma, quis fazer uns vários testes com mensagens globais sem renderizar os components, então dá-lhe **useMemo**... Te amoooo.

Vamos que vamossssss...

# About

A small React + TypeScript playground exploring **three different patterns for showing messages / notifications** across a component tree, all driven from separate components through shared providers.

## What it demonstrates

The app renders five components, each with a button that triggers a message. They compare three delivery mechanisms:

| Pattern | Provider / library | Used by | What you see |
| --- | --- | --- | --- |
| **Custom Context** | `MessageProvider` (`src/provider/MessageContext.tsx`) | `Comp1`, `Comp2` | A plain inline `<div>` rendered by the provider, auto-cleared after 3s |
| **MUI Dialog** | `MessageMuiProvider` (`src/provider/MessageMuiContext.tsx`) | `Comp3Mui`, `Comp4Mui` | A Material UI modal `<Dialog>` with optional title |
| **Toast** | [Sonner](https://sonner.emilkowal.ski/) `<Toaster />` | `Comp5Toast` | A top-center rich-color toast |

Each provider exposes a `showMessage` function via a typed hook (`useMessage`, `useMessageMui`) that throws if used outside its provider — so any component in the tree can raise a message without prop drilling.

## Tech stack

- [React 19](https://react.dev) + [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vite.dev) (dev server + build, via `@vitejs/plugin-react`)
- [MUI](https://mui.com/material-ui/) with [Emotion](https://emotion.sh/)
- [Sonner](https://sonner.emilkowal.ski/) for toasts
- [Oxlint](https://oxc.rs/docs/guide/usage/linter) for linting

## Getting started

Requires [Node.js](https://nodejs.org/) (18+) and npm.

```bash
npm install
```

## Scripts

```bash
npm run dev       # start the Vite dev server with HMR
npm run build     # type-check (tsc -b) and build for production
npm run preview   # preview the production build locally
npm run lint      # run Oxlint
```

Then open the URL Vite prints (default http://localhost:5173) and click the buttons to compare each message pattern.

## Project structure

```
src/
├── App.tsx                        # wires the providers and mounts all five components
├── main.tsx                       # React entry point
├── components/
│   ├── Comp1.tsx, Comp2.tsx       # use the custom Context message
│   ├── Comp3Mui.tsx, Comp4Mui.tsx # use the MUI Dialog message
│   └── Comp5Toast.tsx             # uses a Sonner toast
└── provider/
    ├── MessageContext.tsx         # custom inline-message context
    └── MessageMuiContext.tsx      # MUI Dialog message context
```

> Note: some UI text and messages are in Portuguese (e.g. "Veio do Comp1Um" — "Came from Comp1Um"), reflecting this project's origin as a learning sandbox.
