import "../../style/login.scss";
import LoginForm from "../auth/LoginForm";

const LoginPage = () => {
  return (
    <div className="login">
      <div className="formContainer">
        <LoginForm />
      </div>
      <div className="imgContainer">
        <img src="/bg.png" alt="" />
      </div>
    </div>
  );
};

export default LoginPage;
