import { useParams } from "react-router";

const LinkUm = () => {
  const { nome } = useParams();
  return (
    <>
      <h2>Link 1</h2>
      <p>O parametro informado no link que direcionou para "acá" foi {nome}</p>
      <p>
        Link 1 e bacana e legal. E preciso escrever mais textos e textos e mais
        conteúdos.
      </p>
    </>
  );
};

export default LinkUm;
