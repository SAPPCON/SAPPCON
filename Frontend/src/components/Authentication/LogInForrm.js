import { useState, useRef } from "react";

const LogInForm = (props) => {
  const [emailError, setEmailError] = useState("");
  const emailRef = useRef();
  const [passwordError, setPasswordError] = useState("");
  const passwordRef = useRef();

  const validateEmail = (email) => {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email);
  };

  const validatePassword = (password) => {
    const passwordPattern = /^(?!.*\s).{8,}$/;
    return passwordPattern.test(password);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    const enteredEmail = emailRef.current.value;
    const enteredPassword = passwordRef.current.value;

    if (!validateEmail(enteredEmail)) {
      setEmailError("Dirección de correo electrónico inválida.");
    } else {
      setEmailError("");
    }

    if (!validatePassword(enteredPassword)) {
      setPasswordError("Mínimo 8 caracteres y sin espacios en blanco.");
    } else {
      setPasswordError("");
      props.liftUpPassword(enteredPassword);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center bg-white text-black font-sans min-w-[1200px] ">
      <h1 className="text-2xl font-bold mt-10 mb-4">SAPPCON</h1>
      <section className="mx-auto border p-7 rounded-md border-gray-300 max-w-96  ">
        <h1 className="font-medium text-xl mb-6 w-full">Iniciar Sesión</h1>
        <form onSubmit={submitHandler} className=" w-full" noValidate>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="text-sm font-semibold block w-72
            "
            >
              Correo Electrónico
            </label>
            <input
              type="email"
              id="email"
              ref={emailRef}
              className={`w-full p-1 border border-gray-500 rounded-md focus:ring ring-blue5  focus:border focus:border-blue6 focus:outline-none    ${
                emailError !== ""
                  ? " border-red5 ring-red3  focus:border-red5 focus:bg-white "
                  : ""
              }`}
            />
            {emailError !== "" && (
              <p className="mr-2  text-xs text-red5">{emailError}</p>
            )}
          </div>

          <div>
            <label htmlFor="password" className="text-sm font-semibold block">
              Contraseña
            </label>
            <input
              type="password"
              id="password"
              ref={passwordRef}
              className={`w-full p-1 border border-gray-500 rounded-md focus:ring ring-blue5  focus:border focus:border-blue6 focus:outline-none    ${
                passwordError !== ""
                  ? " border-red5 ring-red3  focus:border-red5 focus:bg-white "
                  : ""
              }`}
            />
            {passwordError !== "" && (
              <p className="mr-2  text-xs text-red5">{passwordError}</p>
            )}
          </div>

          <button
            className="w-full mt-7 p-2 text-sm font-bold rounded-md   text-white   border border-solid border-white bg-darkblue  ring-blue5  hover:bg-opacity-90 active:border active:border-blue6 active:outline-none active:ring  transition  hover:duration-150"
            //onClick={props.onButtonClick}
            //onClick={submitHandler}
          >
            Iniciar Sesión
          </button>
        </form>
      </section>
    </div>
  );
};

export default LogInForm;
