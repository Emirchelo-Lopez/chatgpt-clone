import "./text-area.scss";

const TextArea = ({
  placeholder,
  className = "",
  rows = 1,
  value,
  onChange,
  onKeyDown,
}) => {
  return (
    <textarea
      placeholder={placeholder}
      className={className}
      rows={rows}
      value={value}
      onChange={onChange}
      onKeyDown={onKeyDown}
    />
  );
};

export default TextArea;
