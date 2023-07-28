import "../styles/MainPage.css";

export default function ButtonMain({ text, buttonFunction }) {
  return (
    <button className="MainButton" onClick={buttonFunction}>
      {text}
    </button>
  );
}
