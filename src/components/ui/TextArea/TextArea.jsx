// import "./TextArea.scss";

const TextArea = ({ placeholder, className = "", rows = 1 }) => {
  return (
    <textarea placeholder={placeholder} className={className} rows={rows} />
  );
};

export default TextArea;
