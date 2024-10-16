import BudgetNav from "../Navigation/BudgetNav";
import BuildingNav from "../Navigation/BuildingNav";
import CustomerNav from "../Navigation/CustomerNav";
import StatsNav from "../Navigation/StatsNav";
import HomeNav from "../Navigation/HomeNav";
import ServiceNav from "../Navigation/ServiceNav";
import Link from "next/link";
import { IoIosArrowForward } from "react-icons/io";
import { BiAccessibility } from "react-icons/bi";
import AuthenticationContext from "@/store/AuthenticationContext";
import { useContext } from "react";
import ProfileContext from "@/store/ProfileContext";
import Loader from "../UI/Loader";
import { useState } from "react";

const Profile = (props) => {
  const authenticationCtx = useContext(AuthenticationContext);
  const profileCtx = useContext(ProfileContext);
  const [isLoading, setIsLoading] = useState(false);
  const [errorRequest, setErrorRequest] = useState(false);

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
    }
  };

  return (
    <div className=" min-h-screen flex flex-col  bg-gray-100 text-black font-sans min-w-[1200px] ">
      <div className="flex bg-white h-20 ">
        <div className="mx-auto flex justify-between items-center w-4/6 ">
          <HomeNav></HomeNav>
          <div className="flex items-center space-x-4 ">
            <BudgetNav></BudgetNav>
            <BuildingNav></BuildingNav>
            <ServiceNav></ServiceNav>
            <CustomerNav></CustomerNav>
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

      {/* El max es porque por defecto el div ocupara todo el w del div padre, no lo hago max fit porque sino queda todo muy apretado. Si lo hago asi, deberia a los bototnes y texto ponerle margenes asi se separan */}
      <div className="flex flex-col mx-auto w-[600px] pb-[130px] pt-[14px]">
        <h1 className="mb-[8px] font-sans text-[28px] font-normal text-blackText">
          Tú Perfil
        </h1>

        {/* Le hago el contenedor para que el borde quede identico al borde cuando estan los datos */}
        {profileCtx.isLoading && (
          <div className="flex  pt-6 pb-2 relative rounded-[8px] w-[600px] h-[520px] border border-solid border-grayBorder justify-center items-center ">
            <Loader></Loader>
          </div>
        )}

        {/* Le hago el contenedor para que el borde quede identico al borde cuando estan los datos */}
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
            <div className="absolute right-[24px] top-[24px] w-[150px] h-[150px] bg-gray-300 flex justify-center items-center truncate ">
              <BiAccessibility className="text-[130px] "></BiAccessibility>
            </div>

            {/* Quito el px-6  del ul porque sino el borde inferior no llega hasta el contenedor padre, y coloco el px-6  en los elementos individuales menos el borde */}
            <li className="flex w-[70%] justify-between border-b border-b-grayBorder text-blackText font-sans text-[14px] mb-4 ">
              <div className="pl-6 mb-[12px] w-full truncate">
                <h1 className="mb-[4px] font-bold">Nombre</h1>
                <h1>{profileCtx.name}</h1>
              </div>
              <Link href="/profile/name" className="pr-6">
                <button className=" h-[29px] px-2 cursor-pointer rounded-[8px] border border-solid border-grayBorder bg-grayBg1 text-[13px] shadow-md ring-blue5 hover:bg-grayBg2 hover:bg-opacity-15 active:border active:border-blue6 active:outline-none active:ring">
                  Editar
                </button>
              </Link>
            </li>

            <li className="flex w-[70%] justify-between border-b border-b-grayBorder text-blackText font-sans text-[14px] mb-4 ">
              <div className="pl-6 mb-[12px] w-full truncate">
                <h1 className="mb-[4px] font-bold">Apellido</h1>
                <h1>{profileCtx.surname}</h1>
              </div>
              <Link href="/profile/lastname" className="pr-6">
                <button className=" h-[29px] px-2 cursor-pointer rounded-[8px] border border-solid border-grayBorder bg-grayBg1 text-[13px] shadow-md ring-blue5 hover:bg-grayBg2 hover:bg-opacity-15 active:border active:border-blue6 active:outline-none active:ring">
                  Editar
                </button>
              </Link>
            </li>

            <li className="flex w-[70%] justify-between text-blackText font-sans text-[14px]  ">
              <div className="pl-6 mb-[12px] truncate">
                <h1 className="mb-[4px] font-bold">Alias</h1>
                <h1>{profileCtx.alias ? profileCtx.alias : "Sin definir"}</h1>
              </div>

              <Link href="/profile/username" className="pr-6">
                <button className=" h-[29px] px-2 cursor-pointer rounded-[8px] border border-solid border-grayBorder bg-grayBg1 text-[13px] shadow-md ring-blue5 hover:bg-grayBg2 hover:bg-opacity-15 active:border active:border-blue6 active:outline-none active:ring">
                  Editar
                </button>
              </Link>
            </li>
            <div className="h-[1px] bg-[#d5d9d9] w-full mb-[16px]"></div>

            <li className="flex w-[70%] justify-between text-blackText font-sans text-[14px]  ">
              <div className="pl-6 mb-[12px] truncate">
                <h1 className="mb-[4px] font-bold">Contraseña</h1>
                <h1>**********</h1>
              </div>
              <Link href="/profile/password" className="pr-6">
                <button className=" h-[29px] px-2 cursor-pointer rounded-[8px] border border-solid border-grayBorder bg-grayBg1 text-[13px] shadow-md ring-blue5 hover:bg-grayBg2 hover:bg-opacity-15 active:border active:border-blue6 active:outline-none active:ring">
                  Editar
                </button>
              </Link>
            </li>
            <div className="h-[1px] bg-[#d5d9d9] w-full mb-[16px]"></div>

            <li className="flex w-[70%] justify-between text-blackText font-sans text-[14px]  ">
              <div className="pl-6 mb-[12px] truncate">
                <h1 className="mb-[4px] font-bold">Dirección</h1>
                <h1>
                  {profileCtx.address ? profileCtx.address : "Sin definir"}
                </h1>
              </div>
              <Link href="/profile/address" className="pr-6">
                <button className=" h-[29px] px-2 cursor-pointer rounded-[8px] border border-solid border-grayBorder bg-grayBg1 text-[13px] shadow-md ring-blue5 hover:bg-grayBg2 hover:bg-opacity-15 active:border active:border-blue6 active:outline-none active:ring">
                  Editar
                </button>
              </Link>
            </li>
            <div className="h-[1px] bg-[#d5d9d9] w-full mb-[16px]"></div>

            <li className="flex w-[70%] justify-between text-blackText font-sans text-[14px]  ">
              <div className="pl-6 mb-[12px] truncate">
                <h1 className="mb-[4px] font-bold">Correo Electrónico</h1>
                <h1>{profileCtx.email}</h1>
              </div>
              <Link href="/profile/email" className="pr-6">
                <button className=" h-[29px] px-2 cursor-pointer rounded-[8px] border border-solid border-grayBorder bg-grayBg1 text-[13px] shadow-md ring-blue5 hover:bg-grayBg2 hover:bg-opacity-15 active:border active:border-blue6 active:outline-none active:ring">
                  Editar
                </button>
              </Link>
            </li>
            <div className="h-[1px] bg-[#d5d9d9] w-full mb-[16px]"></div>

            {/* le hago h-40 para q coincida con el alto del loader. Los botones ademas de depender de q se cargue bien el context depende tambien desp de q se haga bien o mal la request. Si hay error se renderiza igual para q pueda volver a intentar */}

            {!isLoading && (
              <li className="h-[40px] px-[18px]  ">
                <div className="flex items-center justify-end ">
                  <Link href="/" className="">
                    <button
                      className="flex h-[36px] w-[102px] text-sm items-center font-sans text-[13px] cursor-pointer text-gray-700 p-2 rounded-[8px] border border-solid border-gray-500 bg-gray-300 hover:bg-opacity-70 active:border active:border-gray-500 active:outline-none active:ring ring-blue-200  justify-center mr-2"
                      //onClick={props.hideNewServiceFunction}
                    >
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

            {/* Esto es para mostrar el Loader mientras se esta haciendo la request del logout */}
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
