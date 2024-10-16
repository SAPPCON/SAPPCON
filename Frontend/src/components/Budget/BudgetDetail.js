import Link from "next/link";
import { RxCross1 } from "react-icons/rx";
import { BiAccessibility } from "react-icons/bi";
import { useState, useRef, Fragment, useEffect, useContext } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { HiOutlineExclamationTriangle } from "react-icons/hi2";
import BuildingContext from "@/store/BuildingContext";
import Loader from "../UI/Loader";
import BudgetContext from "@/store/BudgetContext";

const BudgetDetail = (props) => {
  //Cosas de Renderizar el detalle de presupuesto:

  //Almaceno la data del presupuesto, incluidas las lineas de presupuesto.
  const [budgetData, setBudgetData] = useState({});
  //Error para renderizaar en caso de no poder obtener la data del presupuesto.
  const [errorRequest, setErrorRequest] = useState("");
  //Mientras esta cargando la request, renderizo el loader.
  //Hago que sea TRUE desde un principio, para que se haga false cuando salga bien la request y asi evitar tener problema de la data de budger undefined.
  const [isLoading, setIsLoading] = useState(true);
  //Para renderizar las obras
  const { buildingContext: buildingCtx } = useContext(BuildingContext);
  const Buildings = buildingCtx.items;

  //Obtengo TODA la data del presupuesto, incluido la linea de servicios.
  //A diferencia de los demas componentes que esta data viene del context, aca debo usar los estados locales del componente y en base a eso renderizar la data, el msg de error o el cargando.
  useEffect(() => {
    const fetchBudgetData = async () => {
      try {
        const token = localStorage.getItem("token");
        setIsLoading(true);

        console.log(
          "URL: ",
          `${process.env.NEXT_PUBLIC_GET_BUDGET_URL}${props.budgetData._id}`
        );

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_GET_BUDGET_URL}${props.budgetData._id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          const responseData = await response.json();
          throw new Error(
            responseData.error || "Error al obtener el presupuesto"
          );
        }

        const data = await response.json();
        setBudgetData(data);
        setIsLoading(false);
        setErrorRequest("");

        console.log("DATA: ", data);
      } catch (error) {
        setErrorRequest(error.message);
      }
    };

    fetchBudgetData();
  }, []);

  const buildingRef = useRef();
  const stateRef = useRef();
  const dateRef = useRef();

  //Cosas de Eliminar Presupuesto:
  const { budgetContext: budgetCtx } = useContext(BudgetContext);
  const [showDelete, setShowDelete] = useState(false);

  const handleDelete = () => {
    setShowDelete(true);
  };

  const handleClickHideDelete = () => {
    setShowDelete(false);
  };

  const handleConfirmDelete = () => {
    setShowDelete(false);
    budgetCtx.deleteItem(props.budgetData._id);
    props.hideBudgetFunctionBackground();
  };

  //Todos los otros carteles de exito estan a 5px del titulo. Este mide 56px de ancho entonces se sube 56 + 5 = 61.
  return (
    <Fragment>
      <div className=" absolute top-12 left-1/2 transform -translate-x-1/2  z-40 bg-gray-100 rounded-[8px] border border-solid border-grayBorder w-[600px] ">
        {isLoading && (
          <div className="h-[346px] justify-center items-center flex w-full  ">
            <Loader></Loader>
          </div>
        )}

        {errorRequest && (
          <div className=" h-[346px] justify-center items-center flex w-full  ">
            {errorRequest}
          </div>
        )}

        {!errorRequest && !isLoading && (
          <div>
            <RxCross1
              className="text-[20px] absolute top-[10px] right-[10px] text-blackText cursor-pointer"
              onClick={props.hideBudgetFunctionBoth}
            ></RxCross1>
            <h1 className="font-sans text-[28px] font-normal text-blackText text-center border-b border-b-grayBorder">
              Datos del Presupuesto
            </h1>

            <ul className="flex flex-col  pt-3 pb-2 ">
              <li className="flex  justify-between border-b border-b-grayBorder text-blackText font-sans text-[14px] mb-4">
                <div className="pl-6 mb-[12px] w-full truncate">
                  <h1 className="mb-[4px] font-bold">ID</h1>
                  <h1>{budgetData.budget._id}</h1>
                </div>
              </li>

              <li className="flex  justify-between border-b border-b-grayBorder text-blackText font-sans text-[14px] mb-4">
                <div className="pl-6 mb-[12px] w-[49%] ">
                  <label htmlFor="date" className="text-sm font-semibold block">
                    Fecha
                  </label>
                  <input
                    type="date"
                    id="date"
                    name="date"
                    defaultValue={
                      new Date(budgetData.budget.date)
                        .toISOString()
                        .split("T")[0]
                    }
                    required
                    ref={dateRef}
                    className={`w-full p-1 border   border-gray-500 rounded-md focus:ring ring-blue5  focus:border focus:border-blue6 focus:outline-none`}
                  />
                </div>
              </li>

              <li className="flex  justify-between text-blackText font-sans text-[14px] px-6 ">
                <div className="mb-4 w-[49%]">
                  <label htmlFor="building" className="mb-[4px] font-bold">
                    Obra
                  </label>
                  {buildingCtx.isLoading && (
                    <div className="h-[31px] flex items-center justify-center">
                      <Loader></Loader>
                    </div>
                  )}
                  {buildingCtx.error && (
                    <div className="h-[31px]">{buildingCtx.error}</div>
                  )}

                  {!buildingCtx.error && !buildingCtx.isLoading && (
                    <select
                      id="building"
                      ref={buildingRef}
                      className={`w-full p-1 border border-gray-500 rounded-md focus:ring ring-blue5 focus:border focus:border-blue6 focus:outline-none cursor-pointer `}
                      defaultValue={budgetData.budget.building_id}
                    >
                      {Buildings.map((building) => (
                        <option key={building._id} value={building._id}>
                          {building.name}
                        </option>
                      ))}
                    </select>
                  )}
                </div>
                <div className="mb-4 w-[49%]">
                  <label htmlFor="state" className="mb-[4px] font-bold">
                    Estado
                  </label>
                  <select
                    id="state"
                    defaultValue={budgetData.budget.status}
                    onChange={(e) => handleActualStateChange(e.target.value)}
                    className={`w-full p-1 border border-gray-500 rounded-md focus:ring ring-blue5 focus:border focus:border-blue6 focus:outline-none cursor-pointer`}
                  >
                    <option key={"Pendiente"} value="Pendiente">
                      Pendiente
                    </option>
                    <option key={"Aprobado"} value="Aprobado">
                      Aprobado
                    </option>
                    <option key={"Rechazado"} value="Rechazado">
                      Rechazado
                    </option>
                    <option key={"En Construcción"} value="En Construcción">
                      En Construcción
                    </option>
                    <option key={"Finalizado"} value="Finalizado">
                      Finalizado
                    </option>
                  </select>
                </div>
              </li>
              <div className="h-[1px] bg-[#d5d9d9] w-full mb-[16px]"></div>
              <li className=" px-[23px] ">
                <div className="flex items-center justify-end ">
                  <button
                    className="flex h-[36px] w-[102px] text-sm items-center font-sans text-[13px] cursor-pointer text-gray-700 p-2 rounded-[8px] border border-solid border-gray-500 bg-gray-300 hover:bg-opacity-70 active:border active:border-gray-500 active:outline-none active:ring ring-blue-200  justify-center mr-2"
                    onClick={props.hideBudgetFunctionBoth}
                  >
                    Atrás
                  </button>

                  <button
                    className=" flex h-[36px] w-[102px] text-sm items-center  font-sans text-[13px]  cursor-pointer  text-white  p-2 rounded-[8px] border  border-white bg-darkred  ring-red3  hover:bg-opacity-90 active:border active:border-red5 active:outline-none active:ring justify-center"
                    onClick={handleDelete}
                  >
                    Eliminar
                  </button>
                </div>
              </li>
            </ul>
          </div>
        )}
      </div>

      {/* Tuve que poner ambos afuera porque sino, el cartel estaba contenido en el DIV padre que tiene un Z-30 y si z-50 se veia pisado por eso. Entonces al sacar este afuera, le puede hacer competencia al z-40 del modal.
      Osea este cartel de chequear borrado y el modal estan posicionados respecto al contenedor de Servicio.js al igual que el Div de ServicioDetail*/}

      {showDelete && (
        <div
          className=" flex flex-col h-fit w-fit z-50   items-center rounded-xl border border-solid border-black  bg-white px-6 py-5 pb-2 font-sans text-[14px] text-blackText absolute top-2/3 left-1/2 transform -translate-x-1/2  -translate-y-1/2
           "
        >
          <h4 className="font-bold">
            ¿Está seguro de que desea eliminar este presupuesto?
          </h4>

          {budgetCtx.isLoadingDeleteItem && (
            <div className="h-[40px] mt-5 w-full flex items-center justify-center">
              <Loader></Loader>
            </div>
          )}

          {!budgetCtx.isLoadingDeleteItem && (
            <div className="flex w-full items-center justify-between mt-5 ">
              <button
                className="flex h-[36px] w-[102px] text-sm items-center font-sans text-[13px] cursor-pointer text-gray-700 p-2 rounded-[8px] border border-solid border-gray-500 bg-gray-300 hover:bg-opacity-70 active:border active:border-gray-500 active:outline-none active:ring ring-blue-200  justify-center mr-2"
                onClick={handleClickHideDelete}
              >
                Atrás
              </button>

              <button
                className=" flex h-[36px] w-[102px] text-sm items-center  font-sans text-[13px]  cursor-pointer  text-white  p-2 rounded-[8px] border  border-white bg-darkred  ring-red3  hover:bg-opacity-90 active:border active:border-red5 active:outline-none active:ring justify-center"
                onClick={handleConfirmDelete}
              >
                Eliminar
              </button>
            </div>
          )}
        </div>
      )}

      {showDelete && (
        <div
          onClick={handleClickHideDelete}
          className=" fixed top-0 left-0 z-40   h-full  w-full  bg-black opacity-30  transition-opacity duration-1000"
        ></div>
      )}
    </Fragment>
  );
};

export default BudgetDetail;

//Si bien CustomerProfile esta contenido dentro de su padre CustomerList, al ser Absolute --> Customer Profile se va a ubicar en referencia al primer padre no estatico que haya. En este caso, como CustomerList que es el primer padre es Estatico, sube un nivel mas, es decir al padre de CustomerList y llega a Customer el cual es RELATIVE, entonces se va ubicar en referencia a ese (al igual que hace NewCustomer, y asi tanto NewCustomer y CustomerProfile estan en referencia al mismo contenedor y puedo ubicarlos igual y seguir un disenio similar)
