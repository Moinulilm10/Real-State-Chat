import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../style/register.scss";
import api from "../lib/axiosInstance";

const RegisterForm = () => {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setIsLoading(true);

    const formData = new FormData(e.target);

    const username = formData.get("username");
    const email = formData.get("email");
    const password = formData.get("password");

    try {
      const res = await api.post("/auth/register", {
        username,
        email,
        password,
      });

      navigate("/login");

      console.log(res);
      console.log(res.data);
    } catch (error) {
      setError(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <h1>Create an Account</h1>
      <input name="username" type="text" placeholder="Username" />
      <input name="email" type="text" placeholder="Email" />
      <input name="password" type="password" placeholder="Password" />
      <button disabled={isLoading}>Register</button>
      {error && <span>{error}</span>}
      <Link to="/login">Do you have an account?</Link>
    </form>
  );
};

export default RegisterForm;
