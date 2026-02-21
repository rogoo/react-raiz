## Sobre RecoiLLLLLLL

Um estudo sobre o recoil, uma biblioteca de gerenciamento/compartilhamento de estado entre os components.

Implementei persistence no estado/valor do Recoil via localStorage.

Durante testes tive problemas com a versão mais recente do **_React_** e **_Recoil_**. Tive que fazer um downgrade para poder fazer funcionar corretamente.
<br/>

#### Instalação

Instale:

```
npm install recoil
```

<br/>
####Definição do Root
Para compartilhar os dados entre os componentes e para poder utilizar qualquer rook do **Recoil**, use o **RecoilRoot** no parente mais próximo da raiz. Todos componentes abaixo compartilharam o ***estado***.
```
<RecoilRoot>
    <App />
</RecoilRoot>
```
<br/>
#### atom - Definição da Variável
Crie um local para salvar os **atoms** (em um ***store.ts***). A ***key*** precisa ser única no projeto. E defina um valor inicial. 
```
const contador = atom({
  key: 'contadorState', // identificador
  default: ''  // valor inicial
})
```
Com Typescript, use generics.
```
export const tempFahrenheitState = atom<number>({
  key: "TempFahrenheit",
  default: 32,
});

export const todoListState = atom<ITodo[]>({
key: "TodoList",
default: [],
effects_UNSTABLE: [localStorageEffect("todoList")],
});

```
**Atenção performance:** Todo componente que ler da variável vai ser renderizado a cada atualização da mesma. Se o componente apenas 'seta' a variável, ele não vai ser renderizado novamente.
<br/>
####Leitura/definição do valor
Existem três hooks importantes, e é importante saber que se ler o valor no componente, ele será renderizado a cada mudança, quanto que se pegar apenas o método para definir o valor o componente não será renderizado com a atualização.
- **useRecoilState()** - vai ter acesso a um array com o valor da variável e um método para mudar/setar o seu valor/estado. Componente vai ser renderizado a cada mudança na variável.
```

const [contador, setContador] = useRecoilState();

```
- **useRecoilValue()** - vai ter acesso apenas ao valor da variável. Componente vai ser renderizado a cada mudança na mesma.
```

const contador = useRecoilValue();

```
- **useSetRecoilState()** - vai ter acesso apenas ao método para mudar/setar a variável. Componente ***não*** será rende a cada mudança do estado/variável.
```

const setContador = useSetRecoilState();

```
####Selectors - uma função
Com **selector** você pode fazer transformações em variavies criadas usando **atom**. Com o método ***get*** vai fazer apenas leituras, e com o ***set*** (que é opcional) fazer alterações.
```

export const filteredTodoListState = selector({
key: "FilteredTodoList",
get: ({ get }) => {
const filter = get(todoListFilterState);
const listTodo = get(todoListState);

    switch (filter) {
      case "Show Completed":
        return listTodo.filter((item) => item.isComplete);
      case "Show Uncompleted":
        return listTodo.filter((item) => !item.isComplete);
      default:
        return listTodo;
    }

},
});

```

```

export const todoListStatsState = selector<ITodoStats>({
key: "TodoListStats",
get: ({ get }) => {
const todoList = get(todoListState);
const total = todoList.length;
const totalCompleted = todoList.filter((item) => item.isComplete).length;
const totalUncompleted = todoList.filter((item) => !item.isComplete).length;
const totalPercentCompleted =
total === 0 ? 0 : parseFloat(((totalCompleted / total) \* 100).toFixed(2));

    return {
      total,
      totalCompleted,
      totalUncompleted,
      totalPercentCompleted,
    };

},
});

```

Isso ai galerinha. Boraaaaaaaaa
```
