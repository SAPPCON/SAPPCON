import { useState, useRef, useContext, Fragment } from "react";
//import { useRouter } from "next/router";
//import AuthContext from "../../store/auth-context";
//import Loader from "../UI/Loader";
import Image from "next/image";
import logoSiteBlack from "../../../public/logoSiteBlack.png";
//import Footer from "../footers/CopyrightFooter";

import { HiOutlineExclamationTriangle } from "react-icons/hi2";
import LogInForm from "./LogInForrm";
import SignUpForm from "./SignUpForm";

const AuthenticationForm = () => {
  //const router = useRouter();

  const [isLogin, setIsLogin] = useState(true);

  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  //const authCtx = useContext(AuthContext);

  const switchAuthModeHandler2 = () => {
    setIsLogin((prevState) => !prevState);
  };

  //Si desde el LOGIN ponen usuario correcto (inexistente) y buena password, se abre el FORM de Registrarse, y le pasamos desde el padre (este) la password ingresada en el login para compararla en el signup y actualizamos el form
  const correctPassword = (password, email) => {
    setPassword(password);
    setEmail(email);
    setIsLogin((prevState) => !prevState);
  };

  /*
  async function makeRequest(url, bodyObj) {
    try {
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(bodyObj),
        headers: {
          "Content-Type": "application/json",
        },
      });

      setIsLoading(false);

      if (!response.ok) {
        const responseData = await response.json();
        console.log(responseData.message);
        const errorMsg =
          responseData.message ||
          (responseData.errors &&
          responseData.errors[0] &&
          responseData.errors[0].message
            ? responseData.errors[0].message
            : "Something went wrong!");
        throw new Error(errorMsg);
      }

      //Si la request pasa el if anterior, no hay mensaje de error y lo reseteamos por si quedo un error del submit anterior.
      setErrorRequest("");
      const data = await response.json();

      const expirationTime = new Date(
        new Date().getTime() + +data.expiresIn * 1000
      );

      //En este punto sabemos que el usuario esta autentificado, entonces llamamos a login del auth context.
      //Al tenerlo con toISOString el expiration time en auth context parecia ser como de 4 horas de diferencia pero el calculo daba bien igual, lo cambio para q nomas coincida la visual
      authCtx.login(data.token, expirationTime.toLocaleString());
      setTimeout(() => {
        router.push("/");
      }, 500);
    } catch (error) {
      //En lugar de hacer el alert, mandamos el error al estado y se renderiza.
      //Los 2 casos diferenciados son mal contrasenia y mal email, el resto es el msg que salga del validate o el que salga del 500... que en teoria no deberian salir porque los tengo que forzar desde el backend.
      setErrorRequest(error.message);
    }
  }

  async function submitHandler(event) {
    event.preventDefault();
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    //Aca tengo que hacer la validacion del front, ANTES de enviar la request, si sale todo bien pasamos a enviar la request, sino salimos de la funcion y actualizamos el front.
    let isEmailValid = true;
    let isPasswordValid = true;
    let isNameValid = true;

    //Cada vez que se apreta el continue, se ejecuta este Handler, se resetean estos valores para que en caso que esten todos bien en este caso, no quede arrastrado un error de un submit anterior.
    setEnteredEmailErrorFront("");
    setEnteredNameErrorFront("");
    setEnteredPasswordErrorFront("");
    setErrorRequest("");

    //Validacion del EMAIL:

    if (enteredEmail.trim().length < 1) {
      setEnteredEmailErrorFront("Introduce your email");
      isNameValid = false;
    } else if (!enteredEmail.includes("@")) {
      setEnteredEmailErrorFront("Incorrect email format (requires @)");
      isEmailValid = false;
    } else if (!enteredEmail.includes(".com")) {
      setEnteredEmailErrorFront("Incorrect email format (requires .com)");
      isEmailValid = false;
    } else if (!emailFormat(enteredEmail)) {
      setEnteredEmailErrorFront("Incorrect email format (no spaces allowed)");
      isEmailValid = false;
    }

    //Validacion de la PASSWORD:

    if (enteredPassword.trim().length < 1) {
      setEnteredPasswordErrorFront("Introduce your password.");
      isPasswordValid = false;
    } else if (enteredPassword.trim().length < 7) {
      setEnteredPasswordErrorFront("A minimum of 7 characters is required.");
      isPasswordValid = false;
    } else if (!noBlankSpacePass(enteredPassword)) {
      setEnteredPasswordErrorFront(
        "Incorrect password format (no spaces allowed)"
      );
    }

    if (!isLogin) {
      const enteredName = nameInputRef.current.value;

      if (enteredName.trim().length < 1) {
        setEnteredNameErrorFront("Introduce your name.");
        isNameValid = false;
      } else if (!isValidCaracters(enteredName)) {
        setEnteredNameErrorFront("Only alphabetic characters are allowed.");
        isNameValid = false;
      } else if (!noBlankSpace(enteredName)) {
        setEnteredNameErrorFront(
          "No blank spaces allowed at the beginning or end."
        );
        isNameValid = false;
      }
    }

    //Si algunas de las 3 validaciones del front no se cumple, NO se envia la request al backend y se renderiza en funcion de estos valores.
    if (!isEmailValid || !isPasswordValid || !isNameValid) {
      return;
    }

    setIsLoading(true);

    if (isLogin) {
      makeRequest("http://localhost:3000/users/login", {
        email: enteredEmail,
        password: enteredPassword,
      });
    } else {
      const enteredName = nameInputRef.current.value;
      makeRequest("http://localhost:3000/users", {
        name: enteredName,
        email: enteredEmail,
        password: enteredPassword,
      });
    }
  }

  */

  return isLogin ? (
    <LogInForm
      onButtonClick={switchAuthModeHandler2}
      liftUpPassword={correctPassword}
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
