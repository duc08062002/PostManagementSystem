import { useNavigate } from "react-router-dom";
import { useState, useMemo } from "react";
import { Form, message } from "antd";
import RegisterInput from "./form/inputregister";
import AxiosClient from "../axiosClient";

const initialValues = {
  email: "",
  password: "",
  username: "",
  firstName: "",
  lastName: "",
  dob: "",
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

const getUsernameError = (value) => {
  return required(value) || minLength(value, 3);
};

const getFirstNameError = (value) => {
  return (
    required(value) ||
    pattern(value, /^[a-zA-Z\s]*$/, "First Name must contain only characters")
  );
};

const getLastNameError = (value) => {
  return (
    required(value) ||
    pattern(value, /^[a-zA-Z\s]*$/, "Last Name must contain only characters")
  );
};

const getDOBError = (value) => {
  return required(value);
};

function Register(props) {
  let navigate = useNavigate();

  const [values, SetValues] = useState(initialValues);

  const createAuthor = async () => {
    const data = {
      username: values.username,
      password: values.password,
      email: values.email,
      firstName: values.firstName,
      lastName: values.lastName,
      birthDate: values.dob,
    };
    try {
      await AxiosClient.post("/authors", data);
      navigate("/");
      message.success("Your account has been successfully created");
    } catch (error) {
      message.error("Your email or username has already been taken");
    }
  };

  const emailError = useMemo(() => {
    return getEmailError(values.email);
  }, [values.email]);

  const passwordError = useMemo(() => {
    return getPasswordError(values.password);
  }, [values.password]);

  const usernameError = useMemo(() => {
    return getUsernameError(values.username);
  }, [values.username]);

  const firstNameError = useMemo(() => {
    return getFirstNameError(values.firstName);
  }, [values.firstName]);

  const lastNameError = useMemo(() => {
    return getLastNameError(values.lastName);
  }, [values.lastName]);

  const dobError = useMemo(() => {
    return getDOBError(values.dob);
  }, [values.dob]);

  const isFormValid = !emailError && !passwordError;

  const handleOnChange = (event) => {
    const newValues = {
      ...values,
      [event.target.name]: event.target.value,
    };
    SetValues(newValues);
    console.log(newValues);
  };

  const [showPassword, setShowPassword] = useState(false);

  const handleOnSubmit = (evt) => {
    createAuthor();
  };

  return (
    <div>
      <h1>Register your account</h1>
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
          <RegisterInput
            value={values.email}
            onChange={handleOnChange}
            name="email"
            error={emailError}
          />
        </Form.Item>
        <Form.Item label="Password:">
          <RegisterInput
            value={values.password}
            onChange={handleOnChange}
            name="password"
            showPassword={showPassword}
            setShowPassword={setShowPassword}
            error={passwordError}
          />
        </Form.Item>
        <Form.Item label="Username:">
          <RegisterInput
            value={values.username}
            onChange={handleOnChange}
            name="username"
            error={usernameError}
          />
        </Form.Item>
        <Form.Item label="First Name:">
          <RegisterInput
            value={values.firstName}
            onChange={handleOnChange}
            name="firstName"
            error={firstNameError}
          />
        </Form.Item>
        <Form.Item label="Last Name:">
          <RegisterInput
            value={values.lastName}
            onChange={handleOnChange}
            name="lastName"
            error={lastNameError}
          />
        </Form.Item>
        <Form.Item label="Birthdate:">
          <RegisterInput
            value={values.dob}
            onChange={handleOnChange}
            name="dob"
            error={dobError}
          />
        </Form.Item>
      </Form>
      <button
        style={{ marginLeft: "330px" }}
        class="btn btn-outline-primary"
        type="button"
        onClick={handleOnSubmit}
        disabled={!isFormValid}
      >
        Register
      </button>
    </div>
  );
}

export default Register;
