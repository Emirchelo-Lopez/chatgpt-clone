import "./input.scss";

const Input = ({
  type,
  className,
  value,
  placeholder,
  readOnly,
  required,
  name,
  onChange,
}) => {
  return (
    <input
      type={type}
      className={className}
      value={value}
      placeholder={placeholder}
      readOnly={readOnly}
      required={required}
      name={name}
      onChange={onChange}
    />
  );
};

export default Input;
