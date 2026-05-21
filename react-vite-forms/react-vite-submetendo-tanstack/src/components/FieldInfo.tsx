import type { AnyFieldApi } from "@tanstack/react-form";

const FieldInfo = ({ field }: { field: AnyFieldApi }) => {
  return (
    <div>
      {!field.state.meta.isValid ? (
        <em className="erro">{field.state.meta.errors.join(", ")}</em>
      ) : (
        <em>&nbsp;</em>
      )}
      {field.state.meta.isValidating ? "Validando..." : null}
    </div>
  );
};

export default FieldInfo;
