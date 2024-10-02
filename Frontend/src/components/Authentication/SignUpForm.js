import { useState, useRef, useContext } from "react";
import { noEmptyValidate } from "@/utils/validationFunctions";
import { HiOutlineExclamationTriangle } from "react-icons/hi2";
import AuthenticationContext from "@/store/AuthenticationContext";
import { useRouter } from "next/router";
import Loader from "../UI/Loader";

const SignUpForm = (props) => {
  const [nameError, setNameError] = useState("");
  const nameRef = useRef();
  const [lastNameError, setlastNameError] = useState("");
  const lastNameRef = useRef();
  const aliasRef = useRef();
  const [password2Error, setPassword2Error] = useState("");
  const password2Ref = useRef();
  const addressRef = useRef();

  const [isLoading, setIsLoading] = useState(false);
  const [requestError, setRequestError] = useState("");

  const router = useRouter();
  const authenticationCtx = useContext(AuthenticationContext);

  const submitHandler = async (event) => {
    event.preventDefault();
    const enteredName = nameRef.current.value;
    const enteredLastName = lastNameRef.current.value;
    const enteredAlias = aliasRef.current.value;
    const enteredPassword2 = password2Ref.current.value;
    const enteredAddress = addressRef.current.value;

    setRequestError("");

    if (!noEmptyValidate(enteredName)) {
      setNameError("Ingresa tu nombre.");
      return;
    } else {
      setNameError("");
    }

    if (!noEmptyValidate(enteredLastName)) {
      setlastNameError("Ingresa tu apellido.");
      return;
    } else {
      setlastNameError("");
    }

    if (enteredPassword2 != props.password) {
      setPassword2Error("Las contraseñas no coinciden.");
      return;
    } else {
      setPassword2Error("");
    }

    setIsLoading(true);

    const body = {
      email: props.email,
      password: props.password,
      name: enteredName,
      surname: enteredLastName,
      ...(enteredAlias !== "" && { alias: enteredAlias }),
      ...(enteredAddress !== "" && { address: enteredAddress }),
    };

    //Si pasa la validacion del front, se hace la request:
    const url = process.env.NEXT_PUBLIC_REGISTER_URL;
    try {
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
        },
      });

      setIsLoading(false);

      const statusCode = response.status;

      if (!response.ok) {
        const responseData = await response.json();

        switch (statusCode) {
          //Usuario ya existe, no deberia pasar porque si estamos aca es porque el email no existe
          case 418:
            setRequestError(responseData.msg);
            break;
          case 500:
            //Error del servidor
            setRequestError(responseData.error);
            break;
          default:
            setRequestError("Ocurrió un error desconocido.");
        }
        return;
      }

      const data = await response.json();

      const expirationTime = new Date(
        new Date().getTime() + 60 * 60 * 1000
      ).toISOString();

      authenticationCtx.login(data.token, expirationTime);
    } catch (error) {
      setRequestError(error.message);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center bg-white text-black font-sans min-w-[1200px]  ">
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
              <h1 className="text-lg  text-red5 ">Hubo un problema</h1>
              <h2 className="  text-xs h-[30px] text-blackText line-clamp-2 ">
                {requestError}
              </h2>
            </div>
          </div>
        </div>
      )}
      <section className="mx-auto border p-7 rounded-md border-gray-300 w-full max-w-96  ">
        <h1 className="font-medium text-xl mb-6 w-full">Registrarse</h1>
        <form className=" w-full " onSubmit={submitHandler}>
          <div className="mb-4 relative">
            <label htmlFor="name" className="text-sm font-semibold block w-72">
              Nombre
            </label>
            <input
              type="name"
              id="name"
              ref={nameRef}
              placeholder="Pedro"
              className={`w-full p-1 border border-gray-500 rounded-md focus:ring ring-blue5  focus:border focus:border-blue6 focus:outline-none    ${
                nameError !== ""
                  ? " border-red5 ring-red3  focus:border-red5 focus:bg-white "
                  : ""
              }`}
            />
            {nameError !== "" && (
              <p className="mr-2  text-xs text-red5 absolute">{nameError}</p>
            )}
          </div>

          <div className="mb-4 relative">
            <label htmlFor="lastName" className="text-sm font-semibold block">
              Apellido
            </label>
            <input
              type="lastName"
              id="lastName"
              ref={lastNameRef}
              placeholder="Pérez"
              className={`w-full p-1 border border-gray-500 rounded-md focus:ring ring-blue5  focus:border focus:border-blue6 focus:outline-none    ${
                lastNameError !== ""
                  ? " border-red5 ring-red3  focus:border-red5 focus:bg-white "
                  : ""
              }`}
            />
            {lastNameError !== "" && (
              <p className="mr-2  text-xs text-red5 absolute">
                {lastNameError}
              </p>
            )}
          </div>

          <div className="mb-4 relative">
            <label htmlFor="alias" className="text-sm font-semibold block">
              Alias
            </label>
            <input
              type="alias"
              id="alias"
              ref={aliasRef}
              placeholder="PedroP"
              className="w-full p-1 border border-gray-500 rounded-md focus:ring ring-blue5  focus:border focus:border-blue6 focus:outline-none "
            />
          </div>

          <div className="mb-4 relative">
            <label type="password" className="text-sm font-semibold block">
              Repetir contraseña
            </label>
            <input
              type="password"
              id="password"
              ref={password2Ref}
              placeholder="********"
              className={`w-full p-1 border border-gray-500 rounded-md focus:ring ring-blue5  focus:border focus:border-blue6 focus:outline-none    ${
                password2Error !== ""
                  ? " border-red5 ring-red3  focus:border-red5 focus:bg-white "
                  : ""
              }`}
            />
            {password2Error !== "" && (
              <p className="mr-2  text-xs text-red5 absolute">
                {password2Error}
              </p>
            )}
          </div>

          <div className="relative">
            <label htmlFor="address" className="text-sm font-semibold block">
              Dirección
            </label>
            <input
              type="address"
              id="address"
              ref={addressRef}
              placeholder="Avenida de las Camelias 1915"
              className="w-full p-1 border border-gray-500 rounded-md focus:ring ring-blue5  focus:border focus:border-blue6 focus:outline-none    "
            />
          </div>

          {!isLoading && (
            <button
              className="w-full mt-7 p-2 text-sm font-bold rounded-md   text-white   border border-solid border-white bg-darkblue  ring-blue5  hover:bg-opacity-90 active:border active:border-blue6 active:outline-none active:ring  transition  hover:duration-150"
              //onClick={props.onButtonClick}
            >
              Registrarse
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

export default SignUpForm;
