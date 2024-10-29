import { FaCheckCircle } from "react-icons/fa";
import { HiOutlineExclamationTriangle } from "react-icons/hi2";
import { useRef, useState } from "react";
import Loader from "@/components/UI/Loader";
import { validatePassword } from "@/utils/validationFunctions";
import Link from "next/link";
import { useRouter } from "next/router";

const NewPassword = ({ token }) => {
  const [errorRequest, setErrorRequest] = useState("");
  const [correctRequest, setCorrectRequest] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const newPasswordInputRef = useRef();
  const repeatNewPasswordInputRef = useRef();

  const router = useRouter();

  const submitHandler = async (event) => {
    event.preventDefault();
    setCorrectRequest(false);
    setErrorRequest("");
    const enteredPassword = newPasswordInputRef.current.value;
    const enteredRepeatPassword = repeatNewPasswordInputRef.current.value;

    if (!validatePassword(enteredPassword)) {
      setErrorRequest({
        message: "Hubo un problema",
        messageinfo: "Mínimo 8 caracteres y sin espacios en blanco.",
      });
      return;
    } else {
      setErrorRequest("");
    }

    if (enteredPassword != enteredRepeatPassword) {
      setErrorRequest({
        message: "Hubo un problema",
        messageinfo: "Las contraseñas no coinciden.",
      });
      return;
    } else {
      setErrorRequest("");
    }

    setIsLoading(true);

    try {
      //const token = localStorage.getItem("token");
      //const token = localStorage.getItem("sadasdasd12312");
      const response = await fetch(process.env.NEXT_PUBLIC_UPDATE_USER_URL, {
        method: "PUT",
        body: JSON.stringify({
          password: enteredPassword,
        }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      setIsLoading(false);

      if (!response.ok) {
        const responseData = await response.json();
        throw {
          message: responseData.message || "Error al actualizar la contraseña",
          messageinfo: responseData.messageinfo || "Detalles no disponibles",
        };
      }

      setCorrectRequest(true);
      newPasswordInputRef.current.value = "";
      repeatNewPasswordInputRef.current.value = "";
      router.push("/auth");
    } catch (error) {
      setErrorRequest({
        message: error.message || "Error desconocido",
        messageinfo: error.messageinfo || "Detalles no disponibles",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className=" min-h-screen flex flex-col  bg-gray-100 text-blackText font-sans min-w-[1200px] ">
      <div className="flex  mx-auto mt-12  ">
        <div className="mx-auto my-0 flex  max-w-[600px] grow flex-col">
          {correctRequest && (
            <div
              className="mb-[5px] mt-[8px] flex h-[56px] w-full   items-center rounded-xl border-[2px] border-l-[12px] border-solid border-greenBorder bg-white px-[18px] pb-[18px] pt-[14px] font-sans text-[14px] text-blackText
           "
            >
              <FaCheckCircle className="mr-1.5  align-top text-[18px] text-greenText"></FaCheckCircle>
              Contraseña actualizada.
            </div>
          )}

          {errorRequest && (
            <div
              className="mb-[5px] mt-[8px] flex h-20 w-full   rounded-xl border border-red5 bg-white p-4 ring-4 ring-inset 	
          ring-red2 ring-opacity-20 "
            >
              <HiOutlineExclamationTriangle className="mr-4  align-top text-[30px] text-red5"></HiOutlineExclamationTriangle>
              <div className="flex flex-col justify-center font-sans    ">
                <h1 className="text-lg  text-red5 ">{errorRequest.message}</h1>
                <h2 className="  text-xs text-blackText ">
                  {errorRequest.messageinfo}
                </h2>
              </div>
            </div>
          )}

          <h1 className="mb-[8px] font-sans text-[28px] font-normal text-blackText">
            Cambia tú contraseña
          </h1>
          <div className="flex flex-col rounded-[8px] border border-solid border-[#D5D9D9] px-[18px] py-[14px] font-sans">
            <div className="w-full text-[13px]">
              Si desea cambiar la contraseña asociada a su cuenta, puede hacerlo
              a continuación. Asegúrese de hacer clic en botón
              <strong> Guardar </strong> cuando termine.
            </div>
            <div className="mt-[22px] w-full">
              <form onSubmit={submitHandler}>
                <div className="pb-[2px] pl-[2px]  text-[13px] font-bold text-blackText">
                  Nueva contraseña
                </div>
                <div className="mb-[10px]">
                  <input
                    className="m-[1px] w-[154px] rounded-[3px] border border-solid border-gray-500 px-[7px] py-[3px] ring-blue5  focus:border focus:border-blue6 focus:outline-none focus:ring"
                    ref={newPasswordInputRef}
                  ></input>
                </div>

                <div className="pb-[2px] pl-[2px]  text-[13px] font-bold text-blackText">
                  Repetir contraseña
                </div>
                <div className="mb-[22px]">
                  <input
                    className="m-[1px] w-[154px] rounded-[3px] border border-solid border-gray-500 px-[7px] py-[3px] ring-blue5  focus:border focus:border-blue6 focus:outline-none focus:ring"
                    ref={repeatNewPasswordInputRef}
                  ></input>
                </div>

                {/* Si aun no se cambio la password, mostramos para guardar cambios */}
                {!isLoading && !correctRequest && (
                  <button
                    className="mt-[14px] flex h-[36px] w-[102px] text-sm items-center  font-sans text-[13px]  cursor-pointer  text-white  p-2 rounded-md border border-solid border-white bg-darkblue  ring-blue5  hover:bg-opacity-90 active:border active:border-blue6 active:outline-none active:ring justify-center "
                    onClick={submitHandler}
                  >
                    Guardar
                  </button>
                )}

                {isLoading && <Loader />}

                {/* Si se cambio la password, mostramos el boton para iniciar sesion que es un link a /auth */}

                {!isLoading && correctRequest && (
                  <Link
                    href={`/auth`}
                    className="mt-[14px] flex h-[36px] w-[102px] text-sm items-center  font-sans text-[13px]  cursor-pointer  text-white  p-2 rounded-md border border-solid border-white bg-darkblue  ring-blue5  hover:bg-opacity-90 active:border active:border-blue6 active:outline-none active:ring justify-center"
                  >
                    Iniciar Sesión
                  </Link>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewPassword;
