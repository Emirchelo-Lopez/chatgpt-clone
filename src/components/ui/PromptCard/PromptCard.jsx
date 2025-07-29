import "./prompt-card.scss";

const PromptCard = ({ index, icon, title }) => {
  return (
    <div key={index} className="prompt-card">
      <div className="prompt-card__content">
        {icon}
        <p className="prompt-card__text">{title}</p>
      </div>
    </div>
  );
};

export default PromptCard;
