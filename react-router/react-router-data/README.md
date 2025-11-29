## React Router utilizando Data mode

Um projeto bemsimples utilizando o **modo Data** do **react router**.

Para projetos SPA bem simples ou que serão utilizados em uma intranet - projeto de internet não é muito legal pois vai perder SEO (pra fazer SSR vai ter que adicionar configuração extra).

**Importante:** Neste modo não existe typesafety, e utilizar SSR vai requerer configuração própria.

### Configuração

Componente src/routes define as rotas. O componente principal (index.tsx) precisou ser alterado para utilizar o AppRoutes.

No componente src/App foi utilizado **_Outlet_** para incluir as rotas, que estão mapeadas no children das rotas.

### O que é bacana?

Cositas legais com o Data Mode são:

- **middleware** - codigo executado antes e depois das navegações, bom para gerar log.
- **loader** - carrega dados antes que os componentes sejam renderizados
- **lazy** - lazy loading

Vou arranjar um tempito e implementar furutamente cada uma dessas características.

Isso é. Vamos que vamos galerinhaaaaaa
