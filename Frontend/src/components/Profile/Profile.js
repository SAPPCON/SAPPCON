import BudgetNav from "../Navigation/BudgetNav";
import BuildingNav from "../Navigation/BuildingNav";
import CustomerNav from "../Navigation/CustomerNav";
import StatsNav from "../Navigation/StatsNav";
import HomeNav from "../Navigation/HomeNav";
import ServiceNav from "../Navigation/ServiceNav";
import Link from "next/link";
import AuthenticationContext from "@/store/AuthenticationContext";
import { useContext, useEffect } from "react";
import ProfileContext from "@/store/ProfileContext";
import Loader from "../UI/Loader";
import { useState } from "react";
import { RiImageAddFill } from "react-icons/ri";

const Profile = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorRequest, setErrorRequest] = useState(false);
  const [isLoadingImage, setIsLoadingImage] = useState(false);
  const [errorRequestAdd, setErrorRequestAdd] = useState("");
  const [base64Image, setBase64Image] = useState(null); // Imagen en base64
  const [bigImageError, setBigImageError] = useState("");

  const authenticationCtx = useContext(AuthenticationContext);
  const profileCtx = useContext(ProfileContext);

  const logoutHandler = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      const token = localStorage.getItem("token");
      //const token = localStorage.getItem("sadasdasd12312");
      const response = await fetch(process.env.NEXT_PUBLIC_LOGOUT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      setIsLoading(false);

      if (!response.ok) {
        const responseData = await response.json();
        throw {
          message: responseData.message || "Error al cerrar sesion",
          messageinfo: responseData.messageinfo || "Detalles no disponibles",
        };
      }
      //Si sale bien, tamb borro el token de local storage y ahi nos va mover a auth
      setErrorRequest("");
      authenticationCtx.logout();
    } catch (error) {
      setErrorRequest({
        message: error.message || "Error desconocido",
        messageinfo: error.messageinfo || "Detalles no disponibles",
      });
    } finally {
      setIsLoading(false);
    }
  };

  //Cuando se abre el perfil, se hace la request para la imagen.
  useEffect(() => {
    const fetchImage = async () => {
      try {
        const token = localStorage.getItem("token");
        setErrorRequestAdd("");
        setIsLoadingImage(true);

        const response = await fetch(
          process.env.NEXT_PUBLIC_DOWNLOAD_IMAGE_URL,
          {
            method: "POST",
            body: JSON.stringify({
              object_type: "User",
              object_id: profileCtx.id,
            }),
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          const responseData = await response.json();
          throw {
            message: responseData.message || "Error al cargar la imagen",
            messageinfo: responseData.messageinfo || "Detalles no disponibles",
          };
        }

        const data = await response.json();
        setBase64Image(data.image_b64 || null); // Usar el base64 recibido
      } catch (error) {
        setErrorRequestAdd({
          message: error.message || "Error desconocido",
          messageinfo: error.messageinfo || "Detalles no disponibles",
        });
      } finally {
        setIsLoadingImage(false);
      }
    };

    fetchImage();
  }, []);

  // File Reader es asincrónico, entonces es necesario una promesa.
  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  // Esta es para mandar la request para cargar una imagen.
  const handleAddImage = async (e) => {
    setBigImageError("");
    const file = e.target.files[0];
    if (!file) {
      return;
    }

    // Verificar si el archivo ya es menor a 200KB antes de comprimir
    if (file.size > 50 * 1024) {
      // 200KB en bytes
      setBigImageError("Tamaño máximo permitido: 50KB");
      return;
    }

    try {
      setErrorRequestAdd("");
      const imageBase64 = await convertToBase64(file);
      const token = localStorage.getItem("token");

      setIsLoadingImage(true);
      const response = await fetch(process.env.NEXT_PUBLIC_UPLOAD_IMAGE_URL, {
        method: "POST",
        body: JSON.stringify({
          object_type: "User",
          object_id: profileCtx.id,
          image_b64: imageBase64,
        }),
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const responseData = await response.json();
        throw {
          message:
            responseData.message || "Error al agregar imagen del cliente",
          messageinfo: responseData.messageinfo || "Detalles no disponibles",
        };
      }

      //const data = await response.json();
      setBase64Image(imageBase64); // Actualiza la imagen subida
    } catch (error) {
      setErrorRequestAdd({
        message: error.message || "Error desconocido",
        messageinfo: error.messageinfo || "Detalles no disponibles",
      });
    } finally {
      setIsLoadingImage(false);
    }
  };

  return (
    <div className=" min-h-screen flex flex-col  bg-gray-100 text-black font-sans min-w-[1200px] ">
      <div className="flex bg-white h-20 ">
        <div className="mx-auto flex justify-between items-center w-4/6 ">
          <HomeNav></HomeNav>
          <div className="flex items-center space-x-4 ">
            <ServiceNav></ServiceNav>
            <CustomerNav></CustomerNav>
            <BuildingNav></BuildingNav>
            <BudgetNav></BudgetNav>
            <StatsNav></StatsNav>
            <div
              className=" rounded-md px-2 py-1   border-2 
              bg-darkblue border-white text-white cursor-default  "
            >
              Perfil
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col mx-auto w-[600px] pb-[130px] pt-[14px]">
        <h1 className="mb-[8px] font-sans text-[28px] font-normal text-blackText">
          Tú Perfil
        </h1>

        {profileCtx.isLoading && (
          <div className="flex  pt-6 pb-2 relative rounded-[8px] w-[600px] h-[520px] border border-solid border-grayBorder justify-center items-center ">
            <Loader></Loader>
          </div>
        )}

        {profileCtx.error && (
          <div className="flex  pt-6 pb-2 relative rounded-[8px] w-[600px] h-[520px] border border-solid border-grayBorder justify-center items-center">
            <div>
              <p>{profileCtx.error.message}</p>
              <p>{profileCtx.error.messageinfo}</p>
            </div>
          </div>
        )}

        {!profileCtx.isLoading && !profileCtx.error && (
          <ul className="flex flex-col pt-6 pb-2 relative rounded-[8px] border border-solid border-grayBorder">
            <div
              className="absolute right-[24px] top-[24px] w-[150px] h-[150px] bg-gray-300 flex justify-center items-center truncate cursor-pointer hover:bg-gray-400 hover:opacity-70 transition duration-300 ease-in-out"
              onClick={() => document.getElementById("imageUpload").click()}
            >
              {isLoadingImage ? (
                <Loader />
              ) : base64Image ? (
                <img
                  src={base64Image}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <RiImageAddFill className="text-[130px]" />
              )}
              <input
                id="imageUpload"
                type="file"
                accept="image/*"
                onChange={handleAddImage}
                className="hidden"
              />
            </div>
            {bigImageError && (
              <h1 className="text-xs  text-red5 absolute top-[180px] right-[10px] ">
                {bigImageError}
              </h1>
            )}

            <li className="flex w-[70%] justify-between border-b border-b-grayBorder text-blackText font-sans text-[14px] mb-4 ">
              <div className="pl-6 mb-[12px] w-full max-w-[87%] overflow-y-auto line-clamp-4">
                <h1 className="mb-[4px] font-bold">Nombre</h1>
                <h1 className="break-words">{profileCtx.name}</h1>
              </div>
              <Link href="/profile/name" className="pr-6 h-fit">
                <button className=" h-[29px] px-2 cursor-pointer rounded-[8px] border border-solid border-grayBorder bg-grayBg1 text-[13px] shadow-md ring-blue5 hover:bg-grayBg2 hover:bg-opacity-15 active:border active:border-blue6 active:outline-none active:ring">
                  Editar
                </button>
              </Link>
            </li>

            <li className="flex w-[70%] justify-between border-b border-b-grayBorder text-blackText font-sans text-[14px] mb-4 ">
              <div className="pl-6 mb-[12px] w-full max-w-[87%] overflow-y-auto line-clamp-4">
                <h1 className="mb-[4px] font-bold">Apellido</h1>
                <h1 className="break-words">{profileCtx.surname}</h1>
              </div>
              <Link href="/profile/lastname" className="pr-6 h-fit">
                <button className=" h-[29px] px-2 cursor-pointer rounded-[8px] border border-solid border-grayBorder bg-grayBg1 text-[13px] shadow-md ring-blue5 hover:bg-grayBg2 hover:bg-opacity-15 active:border active:border-blue6 active:outline-none active:ring">
                  Editar
                </button>
              </Link>
            </li>

            <li className="flex w-[70%] justify-between text-blackText font-sans text-[14px]  ">
              <div className="pl-6 mb-[12px] w-full max-w-[87%] overflow-y-auto line-clamp-4">
                <h1 className="mb-[4px] font-bold">Alias</h1>
                <h1 className="break-words">
                  {profileCtx.alias ? profileCtx.alias : "Sin definir"}
                </h1>
              </div>

              <Link href="/profile/username" className="pr-6 h-fit">
                <button className=" h-[29px] px-2 cursor-pointer rounded-[8px] border border-solid border-grayBorder bg-grayBg1 text-[13px] shadow-md ring-blue5 hover:bg-grayBg2 hover:bg-opacity-15 active:border active:border-blue6 active:outline-none active:ring">
                  Editar
                </button>
              </Link>
            </li>
            <div className="h-[1px] bg-[#d5d9d9] w-full mb-[16px]"></div>

            <li className="flex w-[70%] justify-between text-blackText font-sans text-[14px]  ">
              <div className="pl-6 mb-[12px] w-full max-w-[87%] overflow-y-auto line-clamp-4">
                <h1 className="mb-[4px] font-bold">Contraseña</h1>
                <h1 className="break-words">**********</h1>
              </div>
              <Link href="/profile/password" className="pr-6 h-fit">
                <button className=" h-[29px] px-2 cursor-pointer rounded-[8px] border border-solid border-grayBorder bg-grayBg1 text-[13px] shadow-md ring-blue5 hover:bg-grayBg2 hover:bg-opacity-15 active:border active:border-blue6 active:outline-none active:ring">
                  Editar
                </button>
              </Link>
            </li>
            <div className="h-[1px] bg-[#d5d9d9] w-full mb-[16px]"></div>

            <li className="flex w-[70%] justify-between text-blackText font-sans text-[14px]  ">
              <div className="pl-6 mb-[12px] w-full max-w-[87%] overflow-y-auto line-clamp-4">
                <h1 className="mb-[4px] font-bold">Dirección</h1>
                <h1 className="break-words">
                  {profileCtx.address ? profileCtx.address : "Sin definir"}
                </h1>
              </div>
              <Link href="/profile/address" className="pr-6 h-fit">
                <button className=" h-[29px] px-2 cursor-pointer rounded-[8px] border border-solid border-grayBorder bg-grayBg1 text-[13px] shadow-md ring-blue5 hover:bg-grayBg2 hover:bg-opacity-15 active:border active:border-blue6 active:outline-none active:ring">
                  Editar
                </button>
              </Link>
            </li>
            <div className="h-[1px] bg-[#d5d9d9] w-full mb-[16px]"></div>

            <li className="flex w-[70%] justify-between text-blackText font-sans text-[14px]  ">
              <div className="pl-6 mb-[12px] w-full max-w-[87%] overflow-y-auto line-clamp-4">
                <h1 className="mb-[4px] font-bold">Correo Electrónico</h1>
                <h1 className="break-words">{profileCtx.email}</h1>
              </div>
              <Link href="/profile/email" className="pr-6 h-fit">
                <button className=" h-[29px] px-2 cursor-pointer rounded-[8px] border border-solid border-grayBorder bg-grayBg1 text-[13px] shadow-md ring-blue5 hover:bg-grayBg2 hover:bg-opacity-15 active:border active:border-blue6 active:outline-none active:ring">
                  Editar
                </button>
              </Link>
            </li>
            <div className="h-[1px] bg-[#d5d9d9] w-full mb-[16px]"></div>

            {!isLoading && (
              <li className="h-[40px] px-[18px]  ">
                <div className="flex items-center justify-end ">
                  <Link href="/" className="">
                    <button className="flex h-[36px] w-[102px] text-sm items-center font-sans text-[13px] cursor-pointer text-gray-700 p-2 rounded-[8px] border border-solid border-gray-500 bg-gray-300 hover:bg-opacity-70 active:border active:border-gray-500 active:outline-none active:ring ring-blue-200  justify-center mr-2">
                      Atrás
                    </button>
                  </Link>
                  <Link href="/auth" className="">
                    <button
                      className=" flex h-[36px] w-[102px] text-sm items-center  font-sans text-[13px]  cursor-pointer  text-white  p-2 rounded-[8px] border border-solid border-white bg-darkblue  ring-blue5  hover:bg-opacity-90 active:border active:border-blue6 active:outline-none active:ring justify-center"
                      onClick={logoutHandler}
                    >
                      Cerrar Sesión
                    </button>
                  </Link>
                </div>
              </li>
            )}

            {isLoading && (
              <div className="flex justify-center items-center ">
                <Loader></Loader>
              </div>
            )}
            {errorRequest && (
              <div className="flex w-full justify-center items-center text-xs text-red5 ">
                <div>
                  <p>{errorRequest.message}</p>
                  <p>{errorRequest.messageinfo}</p>
                </div>
              </div>
            )}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Profile;
