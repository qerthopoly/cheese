import "../styles/MainPage.css";
import "../styles/Button.css";

export default function ButtonMain({ id, text, buttonFunction, disabled }) {

  return (
    <button
      className="main-button"
      id={id}
      onClick={buttonFunction}
      disabled={disabled}
    >
      {text}
    </button>
  );
}
