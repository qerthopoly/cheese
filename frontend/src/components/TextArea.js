import "../styles/Input.css";

export default function TextArea({
  placeholder,
  onChange,
  onBlur,
  initialValue,
  errorMessage,
}) {
  return (
    <div className="textarea-wrapper">
      <textarea
        className={`input-textarea ${
          errorMessage ? "input-textarea-error" : ""
        }`}
        placeholder={placeholder}
        onChange={onChange}
        onBlur={onBlur}
        defaultValue={initialValue} 
        rows="4"
      ></textarea>
      {errorMessage && (
        <span className="textarea-error-message">{errorMessage}</span>
      )}
    </div>
  );
}
