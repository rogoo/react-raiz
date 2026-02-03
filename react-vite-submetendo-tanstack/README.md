### Uso do Tanstack Form

Submissão de form usando **Tanstack Form**. Depois volto e adiciono formas diferentes.

Achei que seria rápido, mas deu dor de cabeça para fazer algumas coisas básicas, que é uma crítica minha em relação a documentação do Tanstack. Poderia ser melhor.

Algums exemplos "das dores de cabeça" listadas abaixo.

#### Revalidação do Form

Tanstack Form não revalida os campos do formulário se o form já foi submetido e encontrou erro - o que é uma ideia interessante. Mas digamos que dois campos deram erro na submissão, e resolvi alterar um terceiro campo. O formulário não é mais submetido e não é gerado novas validações.

Tentei utilizar o **_canSubmitWhenInvalid_**, mesmo reiniciando o servidor, nada de "ca-"funcionar.

```
canSubmitWhenInvalid: true
```

A única mudança que resolveu foi resetando os erros do formulário (setErrorMap) antes de submeter novamente.

```
form.setErrorMap({ onSubmit: { fields: {} } });
form.handleSubmit();
```

#### Esconder/Exibir Elemento do Formulário

Coloquei uma checkbox para exibir/esconder elemento do formulário, e só funcionou quando utilizei utilizei o hook useStore, permitindo que o form funcionasse de forma reativa.

Vamos que vamosssss......
