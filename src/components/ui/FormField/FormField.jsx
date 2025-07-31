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
      />
    </div>
  );
};

export default FormField;
