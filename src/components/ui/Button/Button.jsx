import "./button.scss";

const Button = ({
  children,
  onClick,
  type = "button",
  className,
  disabled = false,
}) => {
  return (
    <button
      onClick={onClick}
      type={type}
      className={className}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
