import "./Login.css";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = ({ setUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      const response = await axios.post(
        "https://site--marvel-backend--79sf29g9cmjg.code.run/login",
        {
          email: email,
          password: password,
        }
      );
      if (response.data.token) {
        setUser(response.data.token);
        navigate("/");
      } else {
        setErrorMessage("An error occured, please try again");
      }
    } catch (error) {
      if (error.response.status === 400) {
        setErrorMessage(error.response.data.message);
      }
      console.log(error);
    }
  };

  return (
    <div className="loginPage">
      <h1>Login Page</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">
          EMAIL
          <input
            type="email"
            name="email"
            id="email"
            placeholder="jsmith@example.com"
            required
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
            }}
          />
        </label>
        <label htmlFor="password">
          PASSWORD
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Your password"
            required
            value={password}
            onChange={(event) => {
              setPassword(event.target.value);
            }}
          />
        </label>
        <button>LOG IN</button>
      </form>
      <div className="error">{errorMessage}</div>
    </div>
  );
};

export default Login;
