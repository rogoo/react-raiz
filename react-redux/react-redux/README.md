# React Redux Todo

App simples usando redux, com `React 19`, `TypeScript`, and `Redux Toolkit`.

## Redux DevTools
Se tiver algum erro relacionado a dados, e quiser debugar podend reverter o status para um anterior, partiu.

![Chrome Redux DevTools debug](chrome_redux_debug.jpg)

## Log Middleware

Possui um middleware para logar as chamadas as ações e próximos passos.

## Tech Stack

- React 19 + TypeScript
- Redux Toolkit + React Redux
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
  components/todo/     # TodoForm, TodoLista, TodoItem
  features/redux/
    middleware/         # loggerMiddleware (loga previous state, action e next state no console)
    reducer/            # todoSlice
    store.ts
    hooks.ts
```
