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
  ...props // This accepts any other props
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
      {...props} // We spread the rest of the props here
    />
  );
};

export default Input;
