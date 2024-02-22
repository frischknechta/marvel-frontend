import { useState } from "react";
import "./Signup.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = ({ setUser }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      const response = await axios.post(
        "https://site--marvel-backend--79sf29g9cmjg.code.run/signup",
        {
          username: username,
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
      if (error.response.status === 409) {
        setErrorMessage("An account with this email address already exists");
      }
      console.log(error.message);
    }
  };

  return (
    <div className="signupPage">
      <h1>Signup Page</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">
          USERNAME
          <input
            type="text"
            name="username"
            id="username"
            placeholder="johnSmith1234"
            value={username}
            required
            onChange={(event) => {
              setUsername(event.target.value);
            }}
          />
        </label>
        <label htmlFor="email">
          EMAIL
          <input
            type="email"
            name="email"
            id="email"
            placeholder="jsmith@example.com"
            value={email}
            required
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
            value={password}
            required
            onChange={(event) => {
              setPassword(event.target.value);
            }}
          />
        </label>
        <button>REGISTER</button>
      </form>
      <div>{errorMessage}</div>
    </div>
  );
};

export default Signup;
