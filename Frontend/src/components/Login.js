import { useNavigate, Link } from "react-router-dom";
import { useAuthContext } from "../context/authContext";
import { useState, useMemo } from "react";
import axios from "axios";
import LoginInput from "./form/inputlogin";
import { Form, message } from "antd";

const initialValues = {
  email: "",
  password: "",
};
const minLength = (value, length) => {
  if (value.length < length) return `At least ${length} characters`;
  return "";
};

const pattern = (value, regex, message) => {
  if (!regex.test(value)) return message;
  return null;
};

const required = (value) => {
  if (value === null || value === undefined || value === "") {
    return "This field is required!";
  }
  return "";
};

const getEmailError = (value) => {
  return (
    required(value) ||
    pattern(
      value,
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
      "Invalid email format!"
    )
  );
};
const getPasswordError = (value) => {
  return required(value) || minLength(value, 8);
};

function Login(props) {
  let navigate = useNavigate();

  const { setIsAuthenticated } = useAuthContext();

  const [values, SetValues] = useState(initialValues);

  const login = () => {
    let emailInfo = values.email;
    let passwordInfo = values.password;
    axios({
      method: "POST",
      url: "http://localhost:8080/authors/login",
      params: {
        email: emailInfo,
        password: passwordInfo,
      },
    })
      .then((response) => {
        localStorage.setItem("access_token", response.data);
      })
      .then(() => {
        if (localStorage.getItem("access_token") != null) {
          setIsAuthenticated(true);
          navigate("/");
        }
      })
      .catch((error) => {
        if (error.response) {
          message.error("Invalid email or password")
        }
      });
  };

  const emailError = useMemo(() => {
    return getEmailError(values.email);
  }, [values.email]);

  const passwordError = useMemo(() => {
    return getPasswordError(values.password);
  }, [values.password]);
  const isFormValid = !emailError && !passwordError;

  const handleOnChange = (event) => {
    const newValues = {
      ...values,
      [event.target.name]: event.target.value,
    };
    SetValues(newValues);
  };

  const [showPassword, setShowPassword] = useState(false);

  return (
    <div>
      <h1>Log in to your account</h1>
      <br />
      <Form
        labelCol={{
          span: 2,
        }}
        wrapperCol={{
          span: 14,
        }}
      >
        <Form.Item label="Email:">
          <LoginInput
            value={values.email}
            onChange={handleOnChange}
            name="email"
            error={emailError}
          />
        </Form.Item>
        <Form.Item label="Password:">
          <LoginInput
            value={values.password}
            onChange={handleOnChange}
            name="password"
            showPassword = {showPassword}
            setShowPassword = {setShowPassword}
            error={passwordError}
          />
        </Form.Item>
      </Form>
      <button
        style={{marginLeft: "330px"}}
        class="btn btn-outline-primary"
        type="button"
        onClick={login}
        disabled={!isFormValid}
      >
        Sign in
      </button>
      <br/><br/>
      <p style={{paddingLeft: "60px"}}>Don't have an account? <Link to="/register">Register now</Link></p>
    </div>
  );
}

export default Login;
