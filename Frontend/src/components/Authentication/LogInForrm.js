import { useState, useRef, useContext } from "react";
import { validateEmail, validatePassword } from "@/utils/validationFunctions";
import { HiOutlineExclamationTriangle } from "react-icons/hi2";
import Loader from "../UI/Loader";
import AuthenticationContext from "@/store/AuthenticationContext";
import { useRouter } from "next/router";

const LogInForm = (props) => {
  const [emailError, setEmailError] = useState("");
  const emailRef = useRef();
  const [passwordError, setPasswordError] = useState("");
  const passwordRef = useRef();
  const [passwordErrorNoMsg, setPasswordErrorNoMsg] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [requestError, setRequestError] = useState("");

  const router = useRouter();
  const authenticationCtx = useContext(AuthenticationContext);

  const submitHandler = async (event) => {
    event.preventDefault();
    const enteredEmail = emailRef.current.value;
    const enteredPassword = passwordRef.current.value;
    setRequestError("");
    setPasswordErrorNoMsg(false);

    if (!validateEmail(enteredEmail)) {
      setEmailError("Dirección de correo electrónico inválida.");
      return;
    } else {
      setEmailError("");
    }

    if (!validatePassword(enteredPassword)) {
      setPasswordError("Mínimo 8 caracteres y sin espacios en blanco.");
      return;
    } else {
      setPasswordError("");
      //props.liftUpPassword(enteredPassword);
    }

    setIsLoading(true);

    //Si ambos campos son correctos, hago la request.
    const url = process.env.NEXT_PUBLIC_LOGIN_URL;

    try {
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify({
          email: enteredEmail,
          password: enteredPassword,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      setIsLoading(false);
      const statusCode = response.status;

      if (!response.ok) {
        const responseData = await response.json();

        switch (statusCode) {
          //Email no registrado
          case 404:
            props.liftUpCredentials(enteredPassword, enteredEmail);
            break;
          //Password incorrecta
          case 403:
            //setRequestError(responseData.error);
            setRequestError({
              message: responseData.message || "Error desconocido",
              messageinfo:
                responseData.messageinfo || "Detalles no disponibles",
            });

            setPasswordErrorNoMsg(true);
            break;
          case 500:
            //Error del servidor
            //setRequestError(responseData.error);
            setRequestError({
              message: responseData.message || "Error desconocido",
              messageinfo:
                responseData.messageinfo || "Detalles no disponibles",
            });
            break;
          default:
            // setRequestError("Ocurrió un error desconocido.");
            setRequestError({
              message: responseData.message || "Error desconocido",
              messageinfo:
                responseData.messageinfo || "Detalles no disponibles",
            });
        }
        return;
      }

      //Token
      const data = await response.json();

      const expirationTime = new Date(
        new Date().getTime() + 60 * 60 * 1000
      ).toISOString(); //hora actual + 1 hora. toISOString() asegura que este en el formato estandar, asi se hace consistente en diferentes entornos.

      authenticationCtx.login(data.token, expirationTime);

      //Aca entran las exepciones que puedan ocurrir durante el Fetch (URL invalida, CORS, tiempo de espera, etc)
    } catch (error) {
      setRequestError({
        message: error.message || "Hubo un problema",
        messageinfo: error.messageinfo || "Detalles no disponibles",
      });
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center bg-white text-black font-sans min-w-[1200px] ">
      <h1 className="text-2xl font-bold mt-10 mb-4">SAPPCON</h1>
      {requestError && (
        <div
          className=" mx-auto mb-4 w-full max-w-96 flex h-20  rounded-xl border border-red-600 bg-white p-4 ring-4 ring-inset 	
          ring-red-300 ring-opacity-20 "
        >
          <div className="flex w-full ">
            <div className="flex items-center mr-3">
              <HiOutlineExclamationTriangle className="text-[25px] text-red5"></HiOutlineExclamationTriangle>
            </div>
            <div className="flex flex-col justify-center font-sans   ">
              <h1 className="text-lg  text-red5 ">{requestError.message}</h1>
              <h2 className="  text-xs text-blackText ">
                {requestError.messageinfo}
              </h2>
            </div>
          </div>
        </div>
      )}
      <section className="mx-auto border p-7 rounded-md border-gray-300 w-full max-w-96  ">
        <h1 className="font-medium text-xl mb-6 w-full">Iniciar Sesión</h1>
        <form onSubmit={submitHandler} className=" w-full" noValidate>
          <div className="mb-4 relative">
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
              placeholder="ejemplo@gmail.com"
              className={`w-full p-1 border border-gray-500 rounded-md focus:ring ring-blue5  focus:border focus:border-blue6 focus:outline-none    ${
                emailError !== ""
                  ? " border-red5 ring-red3  focus:border-red5 focus:bg-white "
                  : ""
              }`}
            />
            {emailError !== "" && (
              <p className="mr-2  text-xs text-red5 absolute">{emailError}</p>
            )}
          </div>

          <div className="relative">
            <label htmlFor="password" className="text-sm font-semibold block">
              Contraseña
            </label>
            <input
              type="password"
              id="password"
              ref={passwordRef}
              placeholder="*********"
              className={`w-full p-1 border border-gray-500 rounded-md focus:ring ring-blue5  focus:border focus:border-blue6 focus:outline-none    ${
                passwordError !== "" || passwordErrorNoMsg
                  ? " border-red5 ring-red3  focus:border-red5 focus:bg-white "
                  : ""
              }`}
            />
            {passwordError !== "" && (
              <p className="mr-2  text-xs text-red5 absolute">
                {passwordError}
              </p>
            )}
          </div>

          {!isLoading && (
            <button
              className="w-full mt-7 p-2 text-sm font-bold rounded-md   text-white   border border-solid border-white bg-darkblue  ring-blue5  hover:bg-opacity-90 active:border active:border-blue6 active:outline-none active:ring  transition  hover:duration-150"
              //onClick={props.onButtonClick}
              onClick={submitHandler}
            >
              Iniciar Sesión
            </button>
          )}
          {isLoading && (
            <div className="mt-[26px] ">
              <Loader></Loader>
            </div>
          )}
        </form>
      </section>
    </div>
  );
};

export default LogInForm;
