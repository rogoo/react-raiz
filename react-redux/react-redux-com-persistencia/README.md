# React Redux Todo

App simples usando redux, com `React 19`, `TypeScript`, and `Redux Toolkit`.

## Persistência

Resolvi salvar os dados do redux usando a lib `redux-persist` + `localStorage`. Para trocar para `sessionStore` (salva dados apenas na tab atual) basta trocar uma linha de código.

```
- import storage from "redux-persist/es/storage";
+ import storage from "redux-persist/es/storage/session";
```

## Tech Stack

- React 19 + TypeScript
- Redux Toolkit + React Redux
- redux-persist
- Vite 8 (Rolldown)
- Oxlint

## Getting Started

```bash
npm install ou (npm i)
npm run dev (para apagar cache `--force`)
```

## Project Structure

```
src/
  components/todo/   # TodoForm, TodoLista, TodoItem
  features/redux/     # store, hooks, todoSlice
```

## Problemas Encontrados

É como dizem,não tem melhor forma de aprender do que enfrentar problemas... rs

Primeira versão não tinha persistência de dados (é o código comentado no **_store.ts_**).

Na refatoração, ambas queridas IA's (Copilot Gemini e Claude Sonnet) geraram código usando o import do storage da `/lib`.

```
import storage from "redux-persist/lib/storage";
```

Ao subir a aplicação, a página não abria, com erro de "uncaught TypeError: storage.getItem is not a function".

Usar **--force** ao subir o vite, apagando cache, não resolveu.

A solução foi corrigir o import e passar a utilizar o storage a partir de `/es`, pois o projeto sua Vite 8 com Rollup, portanto _ESM_ (e não _CommonJS_).

```
import storage from "redux-persist/es/storage";
```

## CLAUDE.local.md

Não gosto do claude torrando meus tokens querendo iniciar/parar servidor. Portanto coloquei uma instrução para ele parar com isso.

Seria uma boa colocar no .gitignore, pois é uma configuração minha e não a ser compartilhada com o lindo time.
