import BudgetNav from "../Navigation/BudgetNav";
import StatsNav from "../Navigation/StatsNav";
import HomeNav from "../Navigation/HomeNav";
import ServiceNav from "../Navigation/ServiceNav";
import ProfileNav from "../Navigation/ProfileNav";
import { useState, useContext } from "react";
import CustomerNav from "../Navigation/CustomerNav";
import BuildingNav from "../Navigation/BuildingNav";
import NewBudget from "./NewBudget";
import BudgetList from "./BudgetList";
import BudgetContext from "@/store/BudgetContext";

const Budget = (props) => {
  const { budgetContext: budgetCtx, dispatchBudgetsAction } =
    useContext(BudgetContext);
  const [filterText, setFilterText] = useState("");
  const [showNewBudget, setShowNewBudget] = useState(false);
  const handleClick = () => {
    setShowNewBudget(!showNewBudget);
    dispatchBudgetsAction({ type: "SET_RESTART_ALL_NEW_ITEM" });
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
              Presupuestos
            </div>
            <BuildingNav></BuildingNav>
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
            Presupuestos
          </h1>
          <div className="rounded-[8px] border border-solid border-grayBorder flex flex-col  ">
            <div className="border-b border-b-grayBorder px-[18px] py-[14px]">
              <div className="flex justify-evenly items-center">
                <input
                  className=" h-[29px] w-40 cursor-pointer  rounded-[8px] border border-solid border-grayBorder bg-grayBg1 font-sans text-[13px] text-blackText shadow-md ring-blue5 hover:bg-grayBg2 hover:bg-opacity-15 active:border active:border-blue6 active:outline-none focus:outline-none active:ring focus:border-blue6 focus:ring focus:ring-blue5 pl-1"
                  type="text"
                  placeholder="Buscar presupuesto..."
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
            <BudgetList filterText={filterText}></BudgetList>
          </div>
          {showNewBudget && (
            <NewBudget hideNewBudgetFunction={handleClick}></NewBudget>
          )}
        </div>
      </div>

      {showNewBudget && (
        <div
          onClick={handleClick}
          className=" fixed top-0 z-30  h-full  w-full  bg-black opacity-80  transition-opacity duration-1000"
        ></div>
      )}
    </div>
  );
};

export default Budget;
