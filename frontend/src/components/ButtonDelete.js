import "../styles/MainPage.css";
import "../styles/Button.css";

export default function ButtonDelete({ id, text, buttonFunction, disabled }) {

  return (
    <button
      className="delete-button"
      id={id}
      onClick={buttonFunction}
      disabled={disabled}
    >
      {text}
    </button>
  );
}
