import Icon, { type IconProps } from "./Icon";

function DeleteIcon({ size }: IconProps) {
  return (
    <Icon size={size}>
      <path d="M3 6h18" />
      <path d="M8 6V4h8v2" />
      <path d="M19 6l-1 14H6L5 6" />
      <path d="M10 11v6M14 11v6" />
    </Icon>
  );
}

export default DeleteIcon;
