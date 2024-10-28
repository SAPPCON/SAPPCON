import { useState } from "react";
import LogInForm from "./LogInForrm";
import SignUpForm from "./SignUpForm";
import ForgotPasswordForm from "./ForgotPasswordForm";

const AuthenticationForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  console.log("FORGOT PASSWORD:", isForgotPassword);

  const switchAuthModeHandler2 = () => {
    setIsLogin((prevState) => !prevState);
  };

  const switchAuthModeHandler3 = () => {
    setIsForgotPassword((prevState) => !prevState);
    console.log("FORGOT PASSWORD 2:", isForgotPassword);
  };

  //Si desde el LOGIN ponen usuario correcto (inexistente) y buena password, se abre el FORM de Registrarse, y le pasamos desde el padre (este) la password ingresada en el login para compararla en el signup y actualizamos el form
  const goToSignUp = (password, email) => {
    setPassword(password);
    setEmail(email);
    setIsLogin((prevState) => !prevState);
  };

  return isForgotPassword ? (
    <ForgotPasswordForm />
  ) : isLogin ? (
    <LogInForm
      onButtonClick={switchAuthModeHandler2}
      onForgotPasswordClick={switchAuthModeHandler3}
      liftUpCredentials={goToSignUp}
    />
  ) : (
    <SignUpForm
      onButtonClick={switchAuthModeHandler2}
      password={password}
      email={email}
    />
  );
};

export default AuthenticationForm;
