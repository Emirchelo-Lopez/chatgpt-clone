import "./button.scss"; // We'll create this next

const Button = ({
  children,
  onClick,
  type = "button",
  className = "",
  disabled = false,
}) => {
  const buttonClassName = `btn ${className}`;

  return (
    <button
      onClick={onClick}
      type={type}
      className={buttonClassName}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
