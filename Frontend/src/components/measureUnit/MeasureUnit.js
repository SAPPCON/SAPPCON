import BudgetNav from "../Navigation/BudgetNav";
import BuildingNav from "../Navigation/BuildingNav";
import StatsNav from "../Navigation/StatsNav";
import HomeNav from "../Navigation/HomeNav";
import Link from "next/link";
import ProfileNav from "../Navigation/ProfileNav";
import { useState, useContext } from "react";
import CustomerNav from "../Navigation/CustomerNav";
import { IoIosArrowForward } from "react-icons/io";
import MeasureUnitContext from "@/store/MeasureUnitContext";
import MeasureUnitList from "./MeasureUnitList";
import NewMeasureUnit from "./NewMeasureUnit";

const MeasureUnit = () => {
  const [showNewMeasureUnit, setShowNewMeasureUnit] = useState(false);
  const [filterText, setFilterText] = useState("");

  const { dispatchMeasureUnitsAction } = useContext(MeasureUnitContext);

  const handleClick = () => {
    setShowNewMeasureUnit(!showNewMeasureUnit);
    dispatchMeasureUnitsAction({
      type: "SET_RESTART_ALL_ADD_ITEM_MEASUREUNIT",
    });
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
            <div
              className=" rounded-md px-2 py-1   border-2 
                bg-darkblue border-white text-white cursor-default  "
            >
              Servicios
            </div>
            <CustomerNav></CustomerNav>
            <BuildingNav></BuildingNav>
            <BudgetNav></BudgetNav>
            <StatsNav></StatsNav>
            <ProfileNav></ProfileNav>
          </div>
        </div>
      </div>

      <div className=" pt-[14px]">
        <div className="flex flex-col mx-auto max-w-[90%] relative ">
          <div className="mb-[16px] mt-[8px] flex w-full  items-center text-[14px] ">
            <Link href="/service">
              <p className="cursor-pointer font-sans text-blueText hover:text-orangeText hover:underline">
                Tus Servicios
              </p>
            </Link>
            <IoIosArrowForward className=" mx-1 text-[12px] text-[#555555]"></IoIosArrowForward>
            <p className="font-sans text-[#C45500]">Unidades de medida</p>
          </div>
          <h1 className="mb-[8px] font-sans text-[28px] font-normal text-blackText mx-auto">
            Unidades de medida
          </h1>
          <div className="rounded-[8px] border border-solid border-grayBorder flex flex-col  ">
            <div className="border-b border-b-grayBorder px-[18px] py-[14px]">
              <div className="flex justify-evenly items-center">
                <input
                  className=" h-[29px] w-40 cursor-pointer  rounded-[8px] border border-solid border-grayBorder bg-grayBg1 font-sans text-[13px] text-blackText shadow-md ring-blue5 hover:bg-grayBg2 hover:bg-opacity-15 active:border active:border-blue6 active:outline-none focus:outline-none active:ring focus:border-blue6 focus:ring focus:ring-blue5 pl-1"
                  type="text"
                  placeholder="Buscar unidad de medida..."
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
            <MeasureUnitList filterText={filterText}></MeasureUnitList>
          </div>
          {showNewMeasureUnit && (
            <NewMeasureUnit
              hideNewMeasureUnitFunction={handleClick}
            ></NewMeasureUnit>
          )}
        </div>
      </div>

      {showNewMeasureUnit && (
        <div
          onClick={handleClick}
          className=" fixed top-0 z-30  h-full  w-full  bg-black opacity-80  transition-opacity duration-1000"
        ></div>
      )}
    </div>
  );
};

export default MeasureUnit;
