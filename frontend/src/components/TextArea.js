import "../styles/Input.css";

export default function TextArea({
  placeholder,
  onChange,
  onBlur,
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
        rows="4"
      ></textarea>
	  <span className="textarea-error-message">{errorMessage}</span>
    </div>
  );
}
