import "./input.scss";

const Input = ({ type, className, value, placeholder, readOnly, required }) => {
  return (
    <input
      type={type}
      className={className}
      value={value}
      placeholder={placeholder}
      readOnly={readOnly}
      required={required}
    />
  );
};

export default Input;
