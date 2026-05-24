# React 19

Implementação de novas funções do React 19. Teoria é lindo, mas nada melhor do que a prática.

## useTransition

Permite marcar modificações de estado como tendo prioridade baixa.

Implementei com e sem o hook pra poder ver o paranauê "na vera".

## useStateAction

Maravilhoso na submissão de formulários com função assíncrona.

Na implementação do formulároi, resolvi implementar usando a biblioteca **_Zod_** para garantir a tipagem.

Um grande problema que tive foi manter o status no caso de fala no envio. Não gostei da solução, e preciso voltar aqui e ver uma melhor.

A solução foi adicionar o valor dos campos no **state**, e utilizar o **defaultValue** nos inputs.

```
interface ActionResult {
  . . .
  data?: {
    name?: string;
    email?: string;
  };
}

<input
      . . .
     defaultValue={state.data?.name}
        />
```
