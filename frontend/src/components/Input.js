import "../styles/Input.css";

export default function Input({
  type,
  placeholder,
  onChange,
  onBlur,
  errorMessage,
}) {
  return (
    <div className="input-wrapper">
      <input
        className={`input-simple ${errorMessage ? "input-error" : ""}`}
        type={type}
        placeholder={placeholder}
        onChange={onChange}
        onBlur={onBlur}
      />
      {errorMessage && (
        <span className="input-error-message">{errorMessage}</span>
      )}
    </div>
  );
}
