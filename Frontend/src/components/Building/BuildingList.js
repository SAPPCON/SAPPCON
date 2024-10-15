import { useState, useContext } from "react";
import BuildingDetail from "./BuildingDetail";
import BuildingContext from "@/store/BuildingContext";
import Loader from "../UI/Loader";
import { FaCheckCircle } from "react-icons/fa";
import { HiOutlineExclamationTriangle } from "react-icons/hi2";

const BuildingList = (props) => {
  const [building, setBuilding] = useState(null);
  const [showBuilding, setShowBuilding] = useState(false);
  const [showBackgroundBuilding, setShowBackgroundBuilding] = useState(false);

  const { buildingContext: buildingCtx, dispatchBuildingsAction } =
    useContext(BuildingContext);

  const Buildings = buildingCtx.items;

  const handleClick = (building) => {
    setBuilding(building);
    setShowBuilding(true);
    setShowBackgroundBuilding(true);
  };

  const handleClickHideBuildingBoth = () => {
    setShowBuilding(false);
    setShowBackgroundBuilding(false);

    dispatchBuildingsAction({ type: "SET_RESTART_ALL_DELETE_ITEM" });
    dispatchBuildingsAction({ type: "SET_RESTART_ALL_UPDATE_CUSTOMER" });
  };

  const handleClickHideBuildingBackground = () => {
    setShowBuilding(false);
  };

  const handleClickAccept = () => {
    setShowBackgroundBuilding(false);
    dispatchBuildingsAction({ type: "SET_RESTART_ALL_DELETE_ITEM" });
  };

  if (
    Buildings.length === 0 &&
    !buildingCtx.error &&
    !buildingCtx.errorDeleteItem &&
    !buildingCtx.successDeleteItem
  ) {
    return (
      <div className="font-sans text-blackText h-[420px] flex justify-center items-center font-medium">
        No tienes obras aún.
      </div>
    );
  }

  return (
    <div>
      <ul className="h-[420px] overflow-y-auto font-sans text-blackText ">
        {buildingCtx.isLoading && (
          <div className="justify-center items-center flex w-full h-full ">
            <Loader></Loader>
          </div>
        )}
        {buildingCtx.error && (
          <div className="h-full justify-center flex items-center">
            {buildingCtx.error}
          </div>
        )}

        {!buildingCtx.error &&
          !buildingCtx.isLoading &&
          Buildings.map((building, index) => {
            return (
              <li
                key={building._id}
                onClick={() => handleClick(building)}
                className={`py-2 px-2 cursor-pointer hover:bg-grayBg2 hover:bg-opacity-70 ${
                  index !== Buildings.length - 1
                    ? "border-b border-b-grayBorder"
                    : "border-b border-b-grayBorder"
                }`}
              >
                <strong>{building.name}</strong>
              </li>
            );
          })}
      </ul>

      {showBuilding && building && (
        <BuildingDetail
          buildingData={building}
          hideBuildingFunctionBoth={handleClickHideBuildingBoth}
          hideBuildingFunctionBackground={handleClickHideBuildingBackground}
        ></BuildingDetail>
      )}

      {showBackgroundBuilding && (
        <div
          onClick={handleClickHideBuildingBoth}
          className=" fixed top-0 left-0 z-30  h-full  w-full  bg-black opacity-80  transition-opacity duration-1000"
        ></div>
      )}

      {/*El aceptar: va a estar con respecto al contenedor en Service que es Relativo, no lo dejo esto en Service Detail porque cuando se cierra la planilla de detalle el componente deja de renderizarse */}

      {buildingCtx.successDeleteItem && !buildingCtx.errorDeleteItem && (
        <div
          className=" flex flex-col h-[97px] w-[250px]  items-center rounded-xl border-[2px] border-l-[12px] border-solid border-greenBorder bg-white px-[18px]  pt-[14px] font-sans text-[14px] text-blackText z-50 absolute top-1/2 left-1/2 transform -translate-x-1/2  -translate-y-1/2 
               "
        >
          <div className="flex">
            <FaCheckCircle className="mr-1.5  align-top text-[18px] text-greenText"></FaCheckCircle>
            Obra Eliminada.
          </div>

          <button
            className=" flex h-[36px] w-[102px] text-sm items-center font-sans text-[13px] cursor-pointer text-gray-700 p-2 rounded-[8px] border border-solid border-gray-500 bg-gray-300 hover:bg-opacity-70 active:border active:border-gray-500 active:outline-none active:ring ring-blue-200  justify-center mt-2"
            onClick={handleClickAccept}
          >
            Aceptar
          </button>
        </div>
      )}

      {!buildingCtx.successDeleteItem && buildingCtx.errorDeleteItem && (
        <div
          className="flex flex-col items-center h-fit w-[250px]   rounded-xl border border-red5 bg-white  ring-4 ring-inset 	
          ring-red2 ring-opacity-20 absolute z-50  top-1/2 left-1/2 transform -translate-x-1/2  -translate-y-1/2   px-[18px]  py-[14px]    "
        >
          <div className="flex w-full ">
            <div className="flex items-center mr-3">
              <HiOutlineExclamationTriangle className="text-[25px] text-red5"></HiOutlineExclamationTriangle>
            </div>
            <div className="flex flex-col justify-center font-sans   ">
              <h1 className="text-lg  text-red5 ">Hubo un problema</h1>
              <h2 className="  text-xs h-[30px] text-blackText line-clamp-2 ">
                {buildingCtx.errorDeleteItem}
              </h2>
            </div>
          </div>

          <button
            className=" flex h-[36px] w-[102px] text-sm items-center font-sans text-[13px] cursor-pointer text-gray-700 p-2 rounded-[8px] border border-solid border-gray-500 bg-gray-300 hover:bg-opacity-70 active:border active:border-gray-500 active:outline-none active:ring ring-blue-200  justify-center mt-2"
            onClick={handleClickAccept}
          >
            Aceptar
          </button>
        </div>
      )}
    </div>
  );
};

export default BuildingList;
