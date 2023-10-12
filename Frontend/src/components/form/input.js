import "../../styles/input.css"
function Input(props) {
  const { label, onChange, error, name, value, ...otherProps } = props;
  return (
    <div className="input">
      <label>
        <span>{label}</span>
        <textarea
          style={{ width: "500px" }}
          value={value}
          onChange={onChange}
          name={name}
          {...otherProps}
        />
      </label>
      <i>
        {error && (
          <span style={{ color: "red", paddingLeft: "5px" }}>{error}</span>
        )}
      </i>
    </div>
  );
}

export default Input;
