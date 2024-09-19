import BudgetNav from "../Navigation/BudgetNav";
import BuildingNav from "../Navigation/BuildingNav";
import StatsNav from "../Navigation/StatsNav";
import HomeNav from "../Navigation/HomeNav";
import ServiceNav from "../Navigation/ServiceNav";
import Link from "next/link";
import ProfileNav from "../Navigation/ProfileNav";
import { IoIosArrowForward } from "react-icons/io";
import CustomerList from "./CustomerList";
import NewCustomer from "./NewCustomer";
import { useState } from "react";

const Customer = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const [showNewClient, setShowNewClient] = useState(false);
  const handleClick = () => {
    setShowNewClient(!showNewClient);
  };

  const [isOpenProfile, setIsOpenProfile] = useState(false);
  const toggleIsOpenProfile = () => {
    setIsOpenProfile(!isOpenProfile);
  };

  return (
    <div className=" min-h-screen flex flex-col  bg-gray-100 text-blackText font-sans min-w-[1200px]  ">
      <div className="flex bg-white h-20 ">
        <div className="mx-auto flex justify-between items-center w-4/6 ">
          <HomeNav></HomeNav>
          <div className="flex items-center space-x-4 ">
            <BudgetNav></BudgetNav>
            <BuildingNav></BuildingNav>
            <ServiceNav></ServiceNav>
            <div
              className=" rounded-md px-2 py-1   border-2 
                bg-darkblue border-white text-white cursor-default  "
            >
              Clientes
            </div>
            <StatsNav></StatsNav>
            <ProfileNav></ProfileNav>
          </div>
        </div>
      </div>

      <div className=" pt-[14px]">
        {/* El max es porque por defecto el div ocupara todo el w del div padre, no lo hago max fit porque sino queda todo muy apretado. Si lo hago asi, deberia a los bototnes y texto ponerle margenes asi se separan */}
        <div className="flex flex-col mx-auto max-w-[90%] relative ">
          <h1 className="mb-[8px] font-sans text-[28px] font-normal text-blackText mx-auto">
            Clientes
          </h1>
          <div className="rounded-[8px] border border-solid border-grayBorder flex flex-col  ">
            <div className="border-b border-b-grayBorder px-[18px] py-[14px]">
              <div className="flex justify-evenly items-center">
                <button className=" h-[29px] w-40 w-  cursor-pointer truncate rounded-[8px] border border-solid border-grayBorder bg-grayBg1 font-sans text-[13px] text-blackText shadow-md ring-blue5 hover:bg-grayBg2 hover:bg-opacity-15 active:border active:border-blue6 active:outline-none active:ring">
                  Buscar
                </button>

                <button
                  onClick={handleClick}
                  className=" h-[29px] w-40 cursor-pointer truncate rounded-[8px] border border-solid border-grayBorder bg-grayBg1 font-sans text-[13px] text-blackText shadow-md ring-blue5 hover:bg-grayBg2 hover:bg-opacity-15 active:border active:border-blue6 active:outline-none active:ring"
                >
                  Nuevo
                </button>
              </div>
            </div>
            {/*CustomerList es un DIV que tiene la lista, la planilla y el fondo negro. La planilla quiero que se posicione de manera absoluta al mismo div relativo que newCustomer, y para hacer esto solamente a la planilla la hago absoluta y entonces en lugar de posicionarse respecto al DIV que la contiene lo hara respecto al primer padre que tenga que sea diferente a estatico, en este caso es el div de aca relative y asi se posiciona de la misma manera que la planilla de newCustomer */}
            <CustomerList></CustomerList>
          </div>
          {/**NewCustomer es absoluto, y el padre es relativo, entonces se posiciona respecto al div padre que es relativo porque es el primer padre no estatico que tiene */}
          {showNewClient && (
            <NewCustomer hideNewClientFunction={handleClick}></NewCustomer>
          )}
        </div>
      </div>

      {showNewClient && (
        <div
          onClick={handleClick}
          className=" fixed top-0 z-30  h-full  w-full  bg-black opacity-80  transition-opacity duration-1000"
        ></div>
      )}
    </div>
  );
};

export default Customer;
