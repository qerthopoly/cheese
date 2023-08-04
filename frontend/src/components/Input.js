import "../styles/Input.css";

export default function Input({
  type,
  placeholder,
  onChange,
  onBlur,
  initialValue,
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
        defaultValue={initialValue} 
      />
      {errorMessage && (
        <span className="input-error-message">{errorMessage}</span>
      )}
    </div>
  );
}
