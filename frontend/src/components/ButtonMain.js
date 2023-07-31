import "../styles/MainPage.css";

export default function ButtonMain({ text, buttonFunction, disabled }) {
  return (
    <button className="MainButton" onClick={buttonFunction} disabled={disabled}>
      {text}
    </button>
  );
}
