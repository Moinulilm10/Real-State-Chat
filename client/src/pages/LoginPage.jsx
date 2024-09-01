import LoginForm from "../components/auth/LoginForm.jsx";
import "../style/login.scss";

const LoginPage = () => {
  return (
    <div className="login">
      <div className="formContainer">
        <LoginForm />
      </div>
      <div className="imgContainer">
        <img src="/bg.png" alt="login-image" />
      </div>
    </div>
  );
};

export default LoginPage;
