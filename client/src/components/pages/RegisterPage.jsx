import "../../style/register.scss";
import RegisterForm from "../auth/RegisterForm";

const RegisterPage = () => {
  return (
    <div className="register">
      <div className="formContainer">
        <RegisterForm />
      </div>
      <div className="imgContainer">
        <img src="/bg.png" alt="signup-image" />
      </div>
    </div>
  );
};

export default RegisterPage;
