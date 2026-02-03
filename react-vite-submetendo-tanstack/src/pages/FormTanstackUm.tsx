import { useForm, useStore } from "@tanstack/react-form";
import { useRef } from "react";
import FieldInfo from "../components/FieldInfo";
import {
  formatPhone,
  onlyNumbers,
  removeCircularReplacer,
} from "../util/Utils";

interface FormValues {
  primeiroNome: string;
  ultimoNome: string;
  telefone: string;
  idade: string;
  assistirFilme: boolean;
  justificativaFilme: string;
}

const FormTanstackUm = () => {
  console.log("Render FormTanstackUm");
  const inputRefs = useRef<Record<string, HTMLInputElement | null>>({});
  const form = useForm({
    canSubmitWhenInvalid: true,
    defaultValues: {
      primeiroNome: "",
      ultimoNome: "",
      telefone: "",
      idade: "",
      assistirFilme: false,
      justificativaFilme: "",
    },
    validators: {
      onSubmitAsync: ({ value }) => {
        const errors: Partial<Record<keyof FormValues, string>> = {};

        if (!value.primeiroNome || value.primeiroNome.trim() === "") {
          errors.primeiroNome = "Primeiro Nome é obrigatório";
        }
        if (!value.ultimoNome || value.ultimoNome.trim() === "") {
          errors.ultimoNome = "Último Nome é obrigatório";
        }
        if (!value.idade || value.idade === "" || value.idade === "0") {
          errors.idade = "Idade é obrigatória";
        }
        if (Object.keys(errors).length > 0) {
          return { fields: errors };
        }
        return undefined;
      },
    },
    onSubmit: (form) => {
      console.log(
        `OnSubmit Value: ${JSON.stringify(form.value, removeCircularReplacer(), 2)}`,
      );
    },
    onSubmitInvalid(_props) {
      for (const fieldName in _props.value) {
        const field = fieldName as keyof FormValues;
        if (!form.state.fieldMeta[field]?.isValid) {
          const inputElement = inputRefs.current[field];
          if (inputElement) {
            inputElement.focus();
            break;
          }
        }
      }
    },
  });
  const isCheckAssistirFilmeEnabled = useStore(
    form.store,
    (state) => state.values.assistirFilme,
  );
  return (
    <div>
      <p>
        Este lindo form foi uma linda dor de cabeça para fazer (mais detalhes no
        <i>
          <b> README</b>
        </i>
        ).
      </p>
      <p>
        Não gosto de validação de campo obrigatório enquanto o usuário não
        submeteu o formulário (tipo mudou o foco do campo). Então existem
        validações de formulario (ao submeter) e diretamente no campo (alguns
        valem a pena como formatação ou regras).
      </p>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          // Reseta erros para uma nova submissão
          // pois se o usuário criasse um novo erro
          // tanstack não faria nada enquanto os campos
          // com erro não fossem corrigidos (ou touched)
          form.setErrorMap({ onSubmit: { fields: {} } });
          form.handleSubmit();
        }}
      >
        <form.Field name="primeiroNome">
          {(field) => (
            <div>
              <label htmlFor={field.name}>Primeiro Nome:</label>
              <input
                id={field.name}
                name={field.name}
                autoComplete="off"
                value={field.state.value}
                ref={(el) => {
                  inputRefs.current[field.name] = el;
                }}
                onChange={(e) => field.handleChange(e.target.value)}
              />
              <FieldInfo field={field} />
            </div>
          )}
        </form.Field>
        <form.Field name="ultimoNome">
          {(field) => (
            <div>
              <label htmlFor={field.name}>Último Nome:</label>
              <input
                id={field.name}
                name={field.name}
                autoComplete="off"
                value={field.state.value}
                ref={(el) => {
                  inputRefs.current[field.name] = el;
                }}
                onChange={(e) => field.handleChange(e.target.value)}
              />
              <FieldInfo field={field} />
            </div>
          )}
        </form.Field>
        <form.Field
          name="idade"
          validators={{
            onChange: ({ value }) => {
              if (
                value &&
                (parseInt(value, 10) <= 0 || parseInt(value, 10) > 120)
              ) {
                return "Valor deve ser maior do que 0 e menor do que 120";
              }
            },
          }}
        >
          {(field) => (
            <div>
              <label htmlFor={field.name}>Idade:</label>
              <input
                type="text"
                id={field.name}
                name={field.name}
                autoComplete="off"
                maxLength={3}
                value={field.state.value}
                ref={(el) => {
                  inputRefs.current[field.name] = el;
                }}
                onChange={(e) =>
                  field.handleChange(onlyNumbers(e.target.value))
                }
              />
              <FieldInfo field={field} />
            </div>
          )}
        </form.Field>
        <form.Field name="telefone">
          {(field) => (
            <div>
              <label htmlFor={field.name}>Telefone:</label>
              <input
                type="text"
                id={field.name}
                name={field.name}
                autoComplete="off"
                maxLength={15}
                value={field.state.value}
                ref={(el) => {
                  inputRefs.current[field.name] = el;
                }}
                onChange={(e) =>
                  field.handleChange(formatPhone(e.target.value))
                }
              />
              <FieldInfo field={field} />
            </div>
          )}
        </form.Field>
        <form.Field name="assistirFilme">
          {(field) => (
            <div>
              <label htmlFor={field.name}>Assistir Filme:</label>
              <input
                type="checkbox"
                id={field.name}
                name={field.name}
                autoComplete="off"
                checked={field.state.value}
                onBlur={field.handleBlur}
                ref={(el) => {
                  inputRefs.current[field.name] = el;
                }}
                onChange={(e) => field.handleChange(e.target.checked)}
              />
              <FieldInfo field={field} />
            </div>
          )}
        </form.Field>
        {isCheckAssistirFilmeEnabled && (
          <form.Field name="justificativaFilme">
            {(field) => (
              <div>
                <label htmlFor={field.name}>Justificativa Filme:</label>
                <input
                  type="text"
                  id={field.name}
                  name={field.name}
                  onBlur={field.handleBlur}
                  autoComplete="off"
                  value={field.state.value}
                  ref={(el) => {
                    inputRefs.current[field.name] = el;
                  }}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
                <FieldInfo field={field} />
              </div>
            )}
          </form.Field>
        )}
        <button
          style={{ marginRight: "0.5rem" }}
          onClick={() => form.handleSubmit()}
        >
          Submit
        </button>
        <button type="button" onClick={() => form.reset()}>
          Reset
        </button>
      </form>
    </div>
  );
};

export default FormTanstackUm;
