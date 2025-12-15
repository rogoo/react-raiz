import IconDeleteImg from "../../assets/icon-delete.gif";

const IconDelete = () => {
  return (
    <img
      src={IconDeleteImg}
      style={{ width: "1.3em" }}
      className="ma-1 cursorPointer"
      alt="Deletar"
      title="Deletar"
    />
  );
};

export default IconDelete;
