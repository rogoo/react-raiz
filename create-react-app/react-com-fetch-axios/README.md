## Testes de bibliotecas de consulta API/backend

React simples mostrando o consumo de API Rest, através de:

- fetch
- axios

No navegador existe uma combo para poder fazer a troca de implementação, via context.

Ia fazer junto também o React Query (agora TanStack Query), mas é uma biblioteca mais robusta e com muitos mais recursos, então vai ficar para um projeto próprio (já vou aproveitar a estrutura deste).

### API/Backend

Neste projeto configurei o backend com banco de dados (MySQL) e API em spring (ambos em docker). O banco de dados contém com uma tabela de Author e outra de Posts (vinculado ao author).

Todas implementações irão acessar a tabela de Author, que com o vinculo aos Posts tornará o detalhamento de um Author interessante.

Existe um menu para cada método. Está implementado o CRUD completo.

Isso ai, vamos que vamos!
