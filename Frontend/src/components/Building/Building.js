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
  const [showNewBuilding, setShowNewBuilding] = useState(false);
  const [filterText, setFilterText] = useState("");

  const { dispatchBuildingsAction } = useContext(BuildingContext);

  const handleClick = () => {
    setShowNewBuilding(!showNewBuilding);
    dispatchBuildingsAction({ type: "SET_RESTART_ALL_NEW_ITEM" });
  };

  const handleFilterChange = (e) => {
    setFilterText(e.target.value.toLowerCase());
  };

  return (
    <div className=" min-h-screen flex flex-col  bg-gray-100 text-blackText font-sans min-w-[1200px]  ">
      <div className="flex bg-white h-20 ">
        <div className="mx-auto flex justify-between items-center w-4/6 ">
          <HomeNav></HomeNav>
          <div className="flex items-center space-x-4 ">
            <ServiceNav></ServiceNav>
            <CustomerNav></CustomerNav>
            <div
              className=" rounded-md px-2 py-1   border-2 
                bg-darkblue border-white text-white cursor-default  "
            >
              Obras
            </div>
            <BudgetNav></BudgetNav>
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
                <input
                  className=" h-[29px] w-40 cursor-pointer  rounded-[8px] border border-solid border-grayBorder bg-grayBg1 font-sans text-[13px] text-blackText shadow-md ring-blue5 hover:bg-grayBg2 hover:bg-opacity-15 active:border active:border-blue6 active:outline-none focus:outline-none active:ring focus:border-blue6 focus:ring focus:ring-blue5 pl-1"
                  type="text"
                  placeholder="Buscar obra..."
                  value={filterText}
                  onChange={handleFilterChange}
                ></input>

                <button
                  onClick={handleClick}
                  className=" h-[29px] w-40 cursor-pointer truncate rounded-[8px] border border-solid border-grayBorder bg-grayBg1 font-sans text-[13px] text-blackText shadow-md ring-blue5 hover:bg-grayBg2 hover:bg-opacity-15 active:border active:border-blue6 active:outline-none active:ring"
                >
                  Nuevo
                </button>
              </div>
            </div>
            <BuildingList filterText={filterText}></BuildingList>
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
