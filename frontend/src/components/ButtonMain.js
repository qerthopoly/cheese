import "../styles/MainPage.css";

export default function ButtonMain({ id, text, buttonFunction, disabled }) {
  // const jwtToken = sessionStorage.getItem('jwtToken')

  return (
    <button
      className="MainButton"
      id={id}
      onClick={buttonFunction}
      disabled={disabled}
    >
      {text}
    </button>
  );
}
