import RegisterForm from "../components/auth/RegisterForm.jsx";
import "../style/register.scss";

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
