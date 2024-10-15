import BudgetNav from "../Navigation/BudgetNav";
import StatsNav from "../Navigation/StatsNav";
import HomeNav from "../Navigation/HomeNav";
import ServiceNav from "../Navigation/ServiceNav";
import ProfileNav from "../Navigation/ProfileNav";
import { useState, useContext } from "react";
import CustomerNav from "../Navigation/CustomerNav";
import NewBuilding from "./NewBuilding";
import BuildingList from "./BuildingList";
import BuildingContext from "@/store/BuildingContext";

const Building = (props) => {
  const { buildingContext: buildingCtx, dispatchBuildingsAction } =
    useContext(BuildingContext);
  const [showNewBuilding, setShowNewBuilding] = useState(false);

  //La funcion que le paso al boton atras, la cruz, y aceptar de exito o error de nuevo cliente y al fondo negro, tambien lo que hacen ademas de dejar de mostrar la planilla, tambien resetean los valores de si hubo error o exito en el nuevo registro de cliente.
  const handleClick = () => {
    setShowNewBuilding(!showNewBuilding);
    dispatchBuildingsAction({ type: "SET_RESTART_ALL_NEW_ITEM" });
  };

  return (
    <div className=" min-h-screen flex flex-col  bg-gray-100 text-blackText font-sans min-w-[1200px]  ">
      <div className="flex bg-white h-20 ">
        <div className="mx-auto flex justify-between items-center w-4/6 ">
          <HomeNav></HomeNav>
          <div className="flex items-center space-x-4 ">
            <BudgetNav></BudgetNav>
            <div
              className=" rounded-md px-2 py-1   border-2 
                bg-darkblue border-white text-white cursor-default  "
            >
              Obras
            </div>
            <ServiceNav></ServiceNav>
            <CustomerNav></CustomerNav>
            <StatsNav></StatsNav>
            <ProfileNav></ProfileNav>
          </div>
        </div>
      </div>

      <div className=" pt-[14px]">
        <div className="flex flex-col mx-auto max-w-[90%] relative ">
          <h1 className="mb-[8px] font-sans text-[28px] font-normal text-blackText mx-auto">
            Obras
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
            <BuildingList></BuildingList>
          </div>
          {showNewBuilding && (
            <NewBuilding hideNewBuildingFunction={handleClick}></NewBuilding>
          )}
        </div>
      </div>

      {showNewBuilding && (
        <div
          onClick={handleClick}
          className=" fixed top-0 z-30  h-full  w-full  bg-black opacity-80  transition-opacity duration-1000"
        ></div>
      )}
    </div>
  );
};

export default Building;
