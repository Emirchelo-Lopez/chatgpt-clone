import "./form-field.scss";
import Input from "../Input/Input";

const FormField = ({
  label,
  type,
  className,
  value,
  placeholder,
  readOnly,
  required,
  name,
  onChange,
  error,
}) => {
  return (
    <div className="form-field">
      <label className="form-field__label">{label}</label>
      <Input
        type={type}
        className={className}
        value={value}
        placeholder={placeholder}
        readOnly={readOnly}
        required={required}
        name={name}
        onChange={onChange}
      />
      {error && <p className="form-field__error">{error}</p>}
    </div>
  );
};

export default FormField;
