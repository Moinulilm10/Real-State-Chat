import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import "../../style/login.scss";
import api from "../lib/axiosInstance";

const LoginForm = () => {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { updateUser } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);
    setError("");

    const formData = new FormData(e.target);

    const username = formData.get("username");
    const password = formData.get("password");

    try {
      const res = await api.post("/auth/login", {
        username,
        password,
      });

      // console.log(res.data);

      updateUser(res.data);

      navigate("/");
    } catch (error) {
      setError(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Welcome back</h1>
      <input
        name="username"
        required
        minLength={3}
        maxLength={20}
        type="text"
        placeholder="Username"
      />
      <input name="password" required type="password" placeholder="Password" />
      <button disabled={isLoading}>Login</button>
      {error && <span>{error}</span>}
      <Link to="/register">{"Don't"} you have an account?</Link>
    </form>
  );
};

export default LoginForm;
