import { Form } from "react-bootstrap";
import { FieldValues, Path, UseFormRegister } from "react-hook-form";

type TInputProps<TFormInputs extends FieldValues> = {
  label: string;
  type?: string;
  name: Path<TFormInputs>;
  error?: string;
  register: UseFormRegister<TFormInputs>;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  formText?: string;
  success?: string;
  disable?: boolean;
  as?: "input" | "textarea";
};

export default function Input<TFormInputs extends FieldValues>({
  label,
  register,
  type = "text",
  error,
  name,
  onBlur,
  formText,
  success,
  disable,
  as = "input",
}: TInputProps<TFormInputs>) {
  const onblurHandler = (e: React.FocusEvent<HTMLInputElement>) => {
    if (onBlur) {
      onBlur(e);
      register(name).onBlur(e);
    } else {
      register(name).onBlur(e);
    }
  };

  return (
    <Form.Group className="mb-3">
      <Form.Label>{label}</Form.Label>
      <Form.Control
        type={type}
        {...register(name)}
        isInvalid={!!error}
        onBlur={onblurHandler}
        isValid={success ? true : false}
        disabled={disable}
        as={as}
      />
      <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
      <Form.Control.Feedback type="valid">{success}</Form.Control.Feedback>
      <Form.Text muted>{formText}</Form.Text>
    </Form.Group>
  );
}
