import { Link } from "react-router-dom";
import "../../style/register.scss";

const RegisterForm = () => {
  return (
    <form>
      <h1>Create an Account</h1>
      <input name="username" type="text" placeholder="Username" />
      <input name="email" type="text" placeholder="Email" />
      <input name="password" type="password" placeholder="Password" />
      <button>Register</button>
      <Link to="/login">Do you have an account?</Link>
    </form>
  );
};

export default RegisterForm;
