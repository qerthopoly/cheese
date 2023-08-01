import "../styles/MainPage.css";

export default function ButtonMain({ text, buttonFunction, disabled }) {

  // const jwtToken = sessionStorage.getItem('jwtToken')

  return (
    <button className="MainButton" onClick={buttonFunction} disabled={disabled}>
      {text}
    </button>
  );
}
