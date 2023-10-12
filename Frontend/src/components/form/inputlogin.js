import { EyeFilled, EyeInvisibleFilled } from "@ant-design/icons";
import "../../styles/inputlogin.css"
function LoginInput(props) {
  const {
    label,
    onChange,
    error,
    name,
    value,
    showPassword,
    setShowPassword,
    ...otherProps
  } = props;

  const handleShowPasswordToggle = () => {
    setShowPassword(!showPassword);
  };
  return (
    <div className="login-input">
      <label>
        <span>{label}</span>
        {name !== "password" ? (
          <input
          type="text"
          style={{ width: "300px" }}
          value={value}
          onChange={onChange}
          name={name}
          {...otherProps}
          />
        ) :(
          <input
          style={{ width: "300px" }}
          type={showPassword ? "text" : "password"}
          value={value}
          onChange={onChange}
          name={name}
          {...otherProps}
        />
        )}  
        {name === "password" && showPassword && (
          <EyeInvisibleFilled
            onClick={handleShowPasswordToggle}
            style={{
              cursor: "pointer",
              marginLeft: "5px",
              fontSize: "18px",
            }}
          />
        )}  
        {name === "password" && !showPassword &&(
          <EyeFilled
          onClick={handleShowPasswordToggle}
          style={{
            cursor: "pointer",
            marginLeft: "5px",
            fontSize: "18px",
          }}
          />
        )}
      </label>
      {error && (
        <span style={{ color: "red", paddingLeft: "5px" }}>{error}</span>
      )}
    </div>
  );
}

export default LoginInput;
