import { useState, useContext } from "react";
import BuildingDetail from "./BuildingDetail";
import BuildingContext from "@/store/BuildingContext";
import Loader from "../UI/Loader";
import { FaCheckCircle } from "react-icons/fa";
import { HiOutlineExclamationTriangle } from "react-icons/hi2";
import PopUpError from "../UI/PopUpError";
import PopUpSuccess from "../UI/PopUpSuccess";

const BuildingList = ({ filterText }) => {
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

  const filteredBuildings = Buildings.filter((building) =>
    building.name.toLowerCase().includes(filterText)
  );

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
          <div className="h-full justify-center flex flex-col items-center">
            <p>{buildingCtx.error.message}</p>
            <small>{buildingCtx.error.messageinfo}</small>
          </div>
        )}

        {!buildingCtx.error &&
          !buildingCtx.isLoading &&
          (filteredBuildings.length > 0 ? (
            filteredBuildings.map((building, index) => (
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
            ))
          ) : (
            <li className="font-sans text-blackText font-medium flex justify-center items-center h-full w-full">
              No hay coincidencias con el filtro.
            </li>
          ))}
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

      {buildingCtx.successDeleteItem && !buildingCtx.errorDeleteItem && (
        <PopUpSuccess
          message="Obra Eliminada."
          onAccept={handleClickAccept}
          icon={FaCheckCircle}
        />
      )}

      {!buildingCtx.successDeleteItem && buildingCtx.errorDeleteItem && (
        <PopUpError
          message={buildingCtx.errorDeleteItem.message}
          messageinfo={buildingCtx.errorDeleteItem.messageinfo}
          onAccept={handleClickAccept}
          icon={HiOutlineExclamationTriangle}
        />
      )}
    </div>
  );
};

export default BuildingList;
