import { Link } from "react-router-dom";
import "../../style/login.scss";

const LoginForm = () => {
  return (
    <form>
      <h1>Welcome back</h1>
      <input name="username" type="text" placeholder="Username" />
      <input name="password" type="password" placeholder="Password" />
      <button>Login</button>
      <Link to="/register">{"Don't"} you have an account?</Link>
    </form>
  );
};

export default LoginForm;
