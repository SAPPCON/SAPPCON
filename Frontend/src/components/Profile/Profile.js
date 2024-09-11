import BudgetNav from "../Navigation/BudgetNav";
import BuildingNav from "../Navigation/BuildingNav";
import CustomerNav from "../Navigation/CustomerNav";
import StatsNav from "../Navigation/StatsNav";
import HomeNav from "../Navigation/HomeNav";
import ServiceNav from "../Navigation/ServiceNav";
import Link from "next/link";
import { IoIosArrowForward } from "react-icons/io";

const Profile = (props) => {
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
              bg-bluefondooscuro border-white text-white cursor-default  "
            >
              Perfil
            </div>
          </div>
        </div>
      </div>

      <div className="pb-[130px] pt-[14px]">
        {/* El max es porque por defecto el div ocupara todo el w del div padre, no lo hago max fit porque sino queda todo muy apretado. Si lo hago asi, deberia a los bototnes y texto ponerle margenes asi se separan */}
        <div className="flex flex-col mx-auto max-w-[600px]">
          <h1 className="mb-[8px] font-sans text-[28px] font-normal text-blackText">
            Tú Perfil
          </h1>
          <div className="rounded-[8px] border border-solid border-grayBorder">
            <ul>
              <li className="border-b border-b-grayBorder px-[18px] py-[14px]">
                <div className="flex ">
                  <div className=" mb-[12px] mr-[25px] flex w-[64%] shrink-0 flex-col xl-[1240px]:w-[75%]">
                    <h1 className="mb-[4px] w-full truncate font-sans text-[14px] font-bold text-blackText">
                      Nombre
                    </h1>
                    <h1 className="w-full font-sans text-[14px]  text-blackText ">
                      {/* {profileCtx.name} */}
                      Nombre
                    </h1>
                  </div>
                  <Link href="/profile/update/name" className="grow">
                    <button className="mb-[12px] h-[29px] w-full cursor-pointer truncate rounded-[8px] border border-solid border-grayBorder bg-grayBg1 font-sans text-[13px] text-blackText shadow-md ring-blue5 hover:bg-grayBg2 hover:bg-opacity-15 active:border active:border-blue6 active:outline-none active:ring">
                      Editar
                    </button>
                  </Link>
                </div>
              </li>

              <li className="border-b border-b-grayBorder px-[18px] py-[14px]">
                <div className="flex ">
                  <div className=" mb-[12px] mr-[25px] flex w-[64%] shrink-0 flex-col xl-[1240px]:w-[75%]">
                    <h1 className="mb-[4px] w-full truncate font-sans text-[14px] font-bold text-blackText">
                      Apellido
                    </h1>
                    <h1 className="w-full font-sans text-[14px]  text-blackText ">
                      {/* {profileCtx.name} */}
                      Apellido
                    </h1>
                  </div>
                  <Link href="/profile/update/name" className="grow">
                    <button className="mb-[12px] h-[29px] w-full cursor-pointer truncate rounded-[8px] border border-solid border-grayBorder bg-grayBg1 font-sans text-[13px] text-blackText shadow-md ring-blue5 hover:bg-grayBg2 hover:bg-opacity-15 active:border active:border-blue6 active:outline-none active:ring">
                      Editar
                    </button>
                  </Link>
                </div>
              </li>

              <li className="border-b border-b-grayBorder px-[18px] py-[14px]">
                <div className="flex ">
                  <div className=" mb-[12px] mr-[25px] flex w-[64%] shrink-0 flex-col xl-[1240px]:w-[75%]">
                    <h1 className="mb-[4px] w-full truncate font-sans text-[14px] font-bold text-blackText">
                      Nombre de Usuario
                    </h1>
                    <h1 className="w-full font-sans text-[14px]  text-blackText ">
                      {/* {profileCtx.name} */}
                      Nombre de Usuario
                    </h1>
                  </div>
                  <Link href="/profile/update/name" className="grow">
                    <button className="mb-[12px] h-[29px] w-full cursor-pointer truncate rounded-[8px] border border-solid border-grayBorder bg-grayBg1 font-sans text-[13px] text-blackText shadow-md ring-blue5 hover:bg-grayBg2 hover:bg-opacity-15 active:border active:border-blue6 active:outline-none active:ring">
                      Editar
                    </button>
                  </Link>
                </div>
              </li>

              <li className="border-b border-b-grayBorder px-[18px] py-[14px]">
                <div className="flex ">
                  <div className=" mb-[12px] mr-[25px] flex w-[64%] shrink-0 flex-col xl-[1240px]:w-[75%]">
                    <h1 className="mb-[4px] w-full truncate font-sans text-[14px] font-bold text-blackText">
                      Contraseña
                    </h1>
                    <h1 className="w-full font-sans text-[14px]  text-blackText ">
                      {/* {profileCtx.name} */}
                      **********
                    </h1>
                  </div>
                  <Link href="/profile/update/name" className="grow">
                    <button className="mb-[12px] h-[29px] w-full cursor-pointer truncate rounded-[8px] border border-solid border-grayBorder bg-grayBg1 font-sans text-[13px] text-blackText shadow-md ring-blue5 hover:bg-grayBg2 hover:bg-opacity-15 active:border active:border-blue6 active:outline-none active:ring">
                      Editar
                    </button>
                  </Link>
                </div>
              </li>

              <li className="border-b border-b-grayBorder px-[18px] py-[14px]">
                <div className="flex ">
                  <div className=" mb-[12px] mr-[25px] flex w-[64%] shrink-0 flex-col xl-[1240px]:w-[75%]">
                    <h1 className="mb-[4px] w-full truncate font-sans text-[14px] font-bold text-blackText">
                      Dirección
                    </h1>
                    <h1 className="w-full font-sans text-[14px]  text-blackText ">
                      {/* {profileCtx.name} */}
                      Dirección
                    </h1>
                  </div>
                  <Link href="/profile/update/name" className="grow">
                    <button className="mb-[12px] h-[29px] w-full cursor-pointer truncate rounded-[8px] border border-solid border-grayBorder bg-grayBg1 font-sans text-[13px] text-blackText shadow-md ring-blue5 hover:bg-grayBg2 hover:bg-opacity-15 active:border active:border-blue6 active:outline-none active:ring">
                      Editar
                    </button>
                  </Link>
                </div>
              </li>

              <li className=" px-[18px] py-[14px]">
                <div className="flex ">
                  <div className=" mb-[12px] mr-[25px] flex w-[64%] shrink-0 flex-col xl-[1240px]:w-[75%]">
                    <h1 className="mb-[4px] w-full truncate font-sans text-[14px] font-bold text-blackText">
                      Correo electrónico
                    </h1>
                    <h1 className="w-full font-sans text-[14px]  text-blackText ">
                      {/* {profileCtx.name} */}
                      Correo electrónico
                    </h1>
                  </div>
                  <Link href="/profile/update/name" className="grow">
                    <button className="mb-[12px] h-[29px] w-full cursor-pointer truncate rounded-[8px] border border-solid border-grayBorder bg-grayBg1 font-sans text-[13px] text-blackText shadow-md ring-blue5 hover:bg-grayBg2 hover:bg-opacity-15 active:border active:border-blue6 active:outline-none active:ring">
                      Editar
                    </button>
                  </Link>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
