import "./button.scss";

const Button = ({
  children,
  onClick,
  type = "button",
  className,
  disabled = false,
  ...props
}) => {
  return (
    <button
      onClick={onClick}
      type={type}
      className={className}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
