import IconActiveIcon from "../../assets/icon-active.gif";
import IconInactiveIcon from "../../assets/icon-inactive.gif";

interface IconActiveInactiveProps {
  ativo: boolean;
}

const IconActiveInactive = ({ ativo }: IconActiveInactiveProps) => {
  const textoAlt = ativo ? "Situação Ativo" : "Situação Inativo";
  return (
    <img
      src={ativo ? IconActiveIcon : IconInactiveIcon}
      style={{ width: "1.3em" }}
      alt={textoAlt}
      title={textoAlt}
    />
  );
};

export default IconActiveInactive;
