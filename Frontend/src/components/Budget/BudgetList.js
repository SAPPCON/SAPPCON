import { useState, useContext } from "react";
import BudgetContext from "@/store/BudgetContext";
import BudgetDetail from "./BudgetDetail";
import Loader from "../UI/Loader";
import BuildingContext from "@/store/BuildingContext";
import CustomerContext from "@/store/CustomerContext";
import { FaCheckCircle } from "react-icons/fa";
import { HiOutlineExclamationTriangle } from "react-icons/hi2";
import PopUpError from "../UI/PopUpError";
import PopUpSuccess from "../UI/PopUpSuccess";

const BudgetList = ({ filterText }) => {
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
    dispatchBudgetsAction({ type: "SET_RESTART_ALL_UPDATE_BUILDING" });
  };

  const handleClickHideBudgetBackground = () => {
    setShowBudget(false);
  };

  const handleClickAccept = () => {
    setShowBackgroundBudget(false);
    dispatchBudgetsAction({ type: "SET_RESTART_ALL_DELETE_ITEM" });
  };

  const filteredBudgets = Budgets.filter((budget) => {
    // Encuentra el edificio y el cliente asociados al presupuesto

    const building = Buildings.find(
      (building) => building._id === budget.building_id
    );

    const customer = Customers.find(
      (customer) => customer._id === budget.customer_id
    );

    const customerNameMatch = customer
      ? customer.name.toLowerCase().includes(filterText.toLowerCase())
      : false;
    const buildingNameMatch = building
      ? building.name.toLowerCase().includes(filterText.toLowerCase())
      : false;
    const budgetStatusMatch = budget.status
      ? budget.status.toLowerCase().includes(filterText.toLowerCase())
      : false;

    // Retorna true si alguna de las coincidencias se encuentra
    return customerNameMatch || buildingNameMatch || budgetStatusMatch;
  });

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
          <div className="h-full justify-center flex flex-col items-center">
            <p>{budgetCtx.error.message}</p>
            <small>{budgetCtx.error.messageinfo}</small>
          </div>
        )}

        {!budgetCtx.error &&
          !budgetCtx.isLoading &&
          (filteredBudgets.length > 0 ? (
            filteredBudgets.map((budget, index) => {
              // Encuentra el edificio correspondiente al building_id del budget
              const building = Buildings.find(
                (building) => building._id === budget.building_id
              );
              // Encuentra el cliente correspondiente al customer_id del budget
              const customer = Customers.find(
                (customer) => customer._id === budget.customer_id
              );

              return (
                <li
                  key={budget._id}
                  onClick={() => handleClick(budget)}
                  className={`py-2 px-2 cursor-pointer hover:bg-grayBg2 hover:bg-opacity-70 w-full h-auto break-words overflow-wrap-anywhere ${
                    index !== filteredBudgets.length - 1
                      ? "border-b border-b-grayBorder"
                      : "border-b border-b-grayBorder"
                  }`}
                >
                  <p>
                    <strong>Obra: </strong>
                    {building ? building.name : ""}
                    {building && customer ? " - " : ""}
                    <strong>Cliente: </strong>
                    {customer ? customer.name : ""}
                    {customer && budget.status ? " - " : ""}
                    <strong>Estado: </strong>
                    {budget.status ? budget.status : ""}
                  </p>
                </li>
              );
            })
          ) : (
            <li className="font-sans text-blackText font-medium flex justify-center items-center h-full w-full">
              No hay coincidencias con el filtro.
            </li>
          ))}
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
        <PopUpSuccess
          message="Presupuesto Eliminado."
          onAccept={handleClickAccept}
          icon={FaCheckCircle}
        />
      )}

      {!budgetCtx.successDeleteItem && budgetCtx.errorDeleteItem && (
        <PopUpError
          message={budgetCtx.errorDeleteItem.message}
          messageinfo={budgetCtx.errorDeleteItem.messageinfo}
          onAccept={handleClickAccept}
          icon={HiOutlineExclamationTriangle}
        />
      )}
    </div>
  );
};

export default BudgetList;
