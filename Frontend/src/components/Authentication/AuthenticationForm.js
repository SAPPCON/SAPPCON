import { useState } from "react";
import LogInForm from "./LogInForrm";
import SignUpForm from "./SignUpForm";

const AuthenticationForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const switchAuthModeHandler2 = () => {
    setIsLogin((prevState) => !prevState);
  };

  //Si desde el LOGIN ponen usuario correcto (inexistente) y buena password, se abre el FORM de Registrarse, y le pasamos desde el padre (este) la password ingresada en el login para compararla en el signup y actualizamos el form
  const goToSignUp = (password, email) => {
    setPassword(password);
    setEmail(email);
    setIsLogin((prevState) => !prevState);
  };

  return isLogin ? (
    <LogInForm
      onButtonClick={switchAuthModeHandler2}
      liftUpCredentials={goToSignUp}
    ></LogInForm>
  ) : (
    <SignUpForm
      onButtonClick={switchAuthModeHandler2}
      password={password}
      email={email}
    ></SignUpForm>
  );
};

export default AuthenticationForm;
