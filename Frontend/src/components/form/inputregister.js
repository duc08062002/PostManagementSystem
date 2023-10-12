import { EyeFilled, EyeInvisibleFilled } from "@ant-design/icons";
import "../../styles/inputregister.css";
import { useEffect } from "react";
function RegisterInput(props) {
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
  const today = new Date().toISOString().split("T")[0];

  useEffect(() => {
    const dateInput = document.getElementById("date-input");
    if (dateInput) {
      dateInput.setAttribute("max", today);
    }
  }, [today]);
  return (
    <div className="register-input">
      <label>
        <span>{label}</span>
        {name !== "password" && name !== "dob" && (
          <input
            type="text"
            style={{ width: "300px" }}
            value={value}
            onChange={onChange}
            name={name}
            {...otherProps}
          />
        )}
        {name === "password" && (
          <input
            style={{ width: "300px" }}
            type={showPassword ? "text" : "password"}
            value={value}
            onChange={onChange}
            name={name}
            {...otherProps}
          />
        )}
        {name === "dob" && (
          <input
            type="date"
            id="date-input"
            style={{ width: "300px" }}
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
        {name === "password" && !showPassword && (
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

export default RegisterInput;
