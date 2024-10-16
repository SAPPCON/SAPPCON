import { useState, useContext } from "react";
import BudgetContext from "@/store/BudgetContext";
import BudgetDetail from "./BudgetDetail";
import Loader from "../UI/Loader";
import BuildingContext from "@/store/BuildingContext";
import CustomerContext from "@/store/CustomerContext";
import { FaCheckCircle } from "react-icons/fa";
import { HiOutlineExclamationTriangle } from "react-icons/hi2";

const BudgetList = (props) => {
  const [budget, setBudget] = useState(null);
  const [showBudget, setShowBudget] = useState(false);
  const [showBackgroundBudget, setShowBackgroundBudget] = useState(false);

  const { budgetContext: budgetCtx, dispatchBudgetsAction } =
    useContext(BudgetContext);
  const Budgets = budgetCtx.items;

  //El budget tiene el ID de la obra, entonces me traigo las obras para renderizar el nombre de la obra que coincida con el ID de obra que tenga el budget. Idem con customer
  const { buildingContext: buildingCtx } = useContext(BuildingContext);
  const Buildings = buildingCtx.items;

  const { customerContext: customerCtx } = useContext(CustomerContext);
  const Customers = customerCtx.items;

  const handleClick = (budget) => {
    setBudget(budget);
    setShowBudget(true);
    setShowBackgroundBudget(true);
  };

  const handleClickHideBudgetBoth = () => {
    setShowBudget(false);
    setShowBackgroundBudget(false);

    dispatchBudgetsAction({ type: "SET_RESTART_ALL_DELETE_ITEM" });
    //dispatchBudgetsAction({ type: "SET_RESTART_ALL_UPDATE_CUSTOMER" });
  };

  const handleClickHideBudgetBackground = () => {
    setShowBudget(false);
  };

  const handleClickAccept = () => {
    setShowBackgroundBudget(false);
    dispatchBudgetsAction({ type: "SET_RESTART_ALL_DELETE_ITEM" });
  };

  if (
    Budgets.length === 0 &&
    !budgetCtx.error &&
    !budgetCtx.errorDeleteItem &&
    !budgetCtx.successDeleteItem
  ) {
    return (
      <div className="font-sans text-blackText h-[420px] flex justify-center items-center font-medium">
        No tienes presupuestos aún.
      </div>
    );
  }

  return (
    <div>
      <ul className="h-[420px] overflow-y-auto font-sans text-blackText  ">
        {budgetCtx.isLoading && (
          <div className="justify-center items-center flex w-full h-full ">
            <Loader></Loader>
          </div>
        )}

        {budgetCtx.error && (
          <div className="h-full justify-center flex items-center">
            {budgetCtx.error}
          </div>
        )}

        {!budgetCtx.error &&
          !budgetCtx.isLoading &&
          Budgets.map((budget, index) => {
            // Encuentra el edificio correspondiente al building_id del budget
            const building = Buildings.find(
              (building) => building._id === budget.building_id
            );
            // Encuentra el edificio correspondiente al building_id del budget
            const customer = Customers.find(
              (customer) => customer._id === budget.customer_id
            );

            return (
              <li
                key={budget._id}
                onClick={() => handleClick(budget)}
                className={`py-2 px-2 cursor-pointer hover:bg-grayBg2 hover:bg-opacity-70 ${
                  index !== Budgets.length - 1
                    ? "border-b border-b-grayBorder"
                    : "border-b border-b-grayBorder"
                }`}
              >
                <p>
                  <strong>
                    {building ? building.name : ""}
                    {building && customer ? " - " : ""}
                    {customer ? customer.name : ""}
                  </strong>
                  {customer && budget.status ? " - " : ""}
                  {budget.status ? budget.status : ""}
                </p>
              </li>
            );
          })}
      </ul>

      {showBudget && budget && (
        <BudgetDetail
          budgetData={budget}
          hideBudgetFunctionBoth={handleClickHideBudgetBoth}
          hideBudgetFunctionBackground={handleClickHideBudgetBackground}
        ></BudgetDetail>
      )}

      {showBackgroundBudget && (
        <div
          onClick={handleClickHideBudgetBoth}
          className=" fixed top-0 left-0 z-30  h-full  w-full  bg-black opacity-80  transition-opacity duration-1000"
        ></div>
      )}

      {/*El aceptar: va a estar con respecto al contenedor en Service que es Relativo, no lo dejo esto en Service Detail porque cuando se cierra la planilla de detalle el componente deja de renderizarse */}

      {budgetCtx.successDeleteItem && !budgetCtx.errorDeleteItem && (
        <div
          className=" flex flex-col h-[97px] w-[250px]  items-center rounded-xl border-[2px] border-l-[12px] border-solid border-greenBorder bg-white px-[18px]  pt-[14px] font-sans text-[14px] text-blackText z-50 absolute top-1/2 left-1/2 transform -translate-x-1/2  -translate-y-1/2 
               "
        >
          <div className="flex">
            <FaCheckCircle className="mr-1.5  align-top text-[18px] text-greenText"></FaCheckCircle>
            Presupuesto Eliminado.
          </div>

          <button
            className=" flex h-[36px] w-[102px] text-sm items-center font-sans text-[13px] cursor-pointer text-gray-700 p-2 rounded-[8px] border border-solid border-gray-500 bg-gray-300 hover:bg-opacity-70 active:border active:border-gray-500 active:outline-none active:ring ring-blue-200  justify-center mt-2"
            onClick={handleClickAccept}
          >
            Aceptar
          </button>
        </div>
      )}

      {!budgetCtx.successDeleteItem && budgetCtx.errorDeleteItem && (
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
                {budgetCtx.errorDeleteItem}
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

export default BudgetList;
