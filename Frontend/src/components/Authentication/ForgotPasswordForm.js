import { useState, useRef } from "react";
import { validateEmail } from "@/utils/validationFunctions";
import { HiOutlineExclamationTriangle } from "react-icons/hi2";
import { FaCheckCircle } from "react-icons/fa";
import Loader from "../UI/Loader";

const ForgotPasswordForm = (props) => {
  const [emailError, setEmailError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [requestError, setRequestError] = useState("");
  const [requestCorrect, setRequestCorrect] = useState("");

  const emailRef = useRef();

  const submitHandler = async (event) => {
    event.preventDefault();
    const enteredEmail = emailRef.current.value;
    setRequestError("");
    setRequestCorrect("");

    if (!validateEmail(enteredEmail)) {
      setEmailError("Dirección de correo electrónico inválida.");
      return;
    } else {
      setEmailError("");
    }

    setIsLoading(true);

    const url = process.env.NEXT_PUBLIC_FORGOT_PASSWORD_URL;
    try {
      const response = await fetch(url, {
        method: "PUT",
        body: JSON.stringify({
          email: enteredEmail,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      setIsLoading(false);

      if (!response.ok) {
        const responseData = await response.json();
        throw {
          message: responseData.message || "Error al actualizar la dirección",
          messageinfo: responseData.messageinfo || "Detalles no disponibles",
        };
      }

      const data = await response.json();
      setRequestCorrect({
        message: data.message || "Correo enviado",
        messageinfo:
          data.messageinfo ||
          "Correo de restablecimiento de contraseña enviado con éxito",
      });
    } catch (error) {
      setRequestError({
        message: error.message || "Hubo un problema",
        messageinfo: error.messageinfo || "Detalles no disponibles",
      });
    } finally {
      setIsLoading(false);
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

      {requestCorrect && (
        <div
          className="mb-[5px] mt-[8px] flex h-[56px] w-full  max-w-96    items-center rounded-xl border-[2px] border-l-[12px] border-solid border-greenBorder bg-white px-[18px] pb-[18px] pt-[14px] font-sans text-[14px] text-blackText
           "
        >
          <FaCheckCircle className="mr-1.5  align-top text-[18px] text-greenText"></FaCheckCircle>
          {requestCorrect.message}
        </div>
      )}
      <section className="mx-auto border p-7 rounded-md border-gray-300 w-full max-w-96  ">
        <h1 className="font-medium text-xl mb-6 w-full">
          Recuperar Contraseña
        </h1>
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

          {!isLoading && (
            <button
              className="w-full mt-[12px] p-2 text-sm font-bold rounded-md   text-white   border border-solid border-white bg-darkblue  ring-blue5  hover:bg-opacity-90 active:border active:border-blue6 active:outline-none active:ring  transition  hover:duration-150"
              onClick={submitHandler}
            >
              Enviar Correo
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

export default ForgotPasswordForm;
