import { useState, useRef, useContext, Fragment } from "react";
import { BiAccessibility } from "react-icons/bi";
import { FaCheckCircle } from "react-icons/fa";
import { HiOutlineExclamationTriangle } from "react-icons/hi2";
import { RxCross1 } from "react-icons/rx";
import { FaTrashAlt } from "react-icons/fa";
import Link from "next/link";
import ServiceContext from "@/store/ServiceContext";
import BuildingContext from "@/store/BuildingContext";
import BudgetContext from "@/store/BudgetContext";
import Loader from "../UI/Loader";

const NewBudget = (props) => {
  const [stateError, setStateError] = useState("");
  const stateRef = useRef();
  const [buildingError, setBuildingError] = useState("");
  const buildingRef = useRef();
  const [dateError, setDateError] = useState("");
  const dateRef = useRef();

  const [zNewBuilding, setZNewBuilding] = useState("z-40");

  const [serviciosSeleccionados, setServiciosSeleccionados] = useState([]);
  const [cantidades, setCantidades] = useState({});

  //Para mandar alguna request.
  const { budgetContext: budgetCtx } = useContext(BudgetContext);

  //Para renderizar los servicios
  const { serviceContext: serviceCtx } = useContext(ServiceContext);
  const Services = serviceCtx.items;

  //Para renderizar las obras
  const { buildingContext: buildingCtx } = useContext(BuildingContext);
  const Buildings = buildingCtx.items;

  //Como en el Select el campo value solo acepta string o number (HTML es asi) y no el objeto servicio, para poder trabajar con dicho objeto en el Select se convierte el objeto a cadena de texto con stringify.
  //Luego, en esta funcion, lo convertimos nuevamente en objeto usando JSON.parse
  const agregarServicio = (e) => {
    const servicioSeleccionado = JSON.parse(e.target.value);
    /*
    console.log(servicioSeleccionado);
    console.log(serviciosSeleccionados);
    console.log(cantidades);
    */

    //En caso que no este ya este servicio en el arreglo de servicios seleccionados, lo agregamos y tambien agregamos dicho servicio (su id) al arreglo de cantidades que es un objeto que es clave (id del servicio) : valor de cantidad de dicho servicio.
    if (
      servicioSeleccionado &&
      !serviciosSeleccionados.includes(servicioSeleccionado)
    ) {
      setServiciosSeleccionados([
        ...serviciosSeleccionados,
        servicioSeleccionado,
      ]);
      setCantidades({
        ...cantidades,
        [servicioSeleccionado.id]: 1,
      });
    }
  };

  //Se crea un nuevo arreglo con Filter. La funcion callback se ejecuta para cada elemento del arreglo, la condicion es que si el elemento s es DISTINTO al servicio que se quiere eliminar, se MANTIENE en el nuevo arreglo.
  const eliminarServicio = (servicio) => {
    setServiciosSeleccionados(
      serviciosSeleccionados.filter((s) => s !== servicio)
    );
  };

  //Siempre que la clave exista, se actualiza. Ademas este metodo se llama desde el listado existente, osea no se puede dar el caso de agregar un sv nuevo desde este metodo.
  const actualizarCantidad = (servicio, nuevaCantidad) => {
    setCantidades({
      ...cantidades,
      [servicio.id]: nuevaCantidad,
    });
  };

  //Con reduce, obtengo un solo valor a partir del arreglo. La funcion callback tiene el total acumulado hasta el momento y el servicio actual del arreglo de servicios seleccionados. Por cada servicio obtiene la cantidad que hay en el arreglo de cantidades y se hace la multiplicacion por su coste unitario y se acumula al total.
  //El segundo parametro es el 0 que es el valor inicial del acumulador.
  //Si no hay cantidad especificada (cosa que no deberia pasar) se usa por defecto 1.
  const calcularTotalGeneral = () => {
    return serviciosSeleccionados.reduce((total, servicio) => {
      const cantidad = cantidades[servicio.id] || 1;
      return total + servicio.costeUnitario * cantidad;
    }, 0); // Empieza con 0 como valor inicial del acumulador
  };

  const submitHandler = (event) => {
    event.preventDefault();
    const enteredState = stateRef.current.value;
    const enteredBuilding = buildingRef.current.value;

    //El valor que se obtiene desde el input de tipo date usando dateRef.current.value siempre está en formato ISO 8601 (YYYY-MM-DD), independientemente de cómo se muestre al usuario. Este formato es estándar en la web y en bases de datos como MongoDB
    //En cambio, la forma en que se renderiza la entrada en el INPUT tipo date puede ser MM-DD-YYYY si tu PC o Navegador esta en Ingles, pero a pesar de ingresarse asi, luego se formatea y se pone en el ISO.
    const enteredDate = dateRef.current.value;

    if (enteredState === "") {
      setStateError("Selecciona un estado.");
      return;
    } else {
      setStateError("");
    }

    if (enteredBuilding === "") {
      setBuildingError("Selecciona una obra.");
      return;
    } else {
      setBuildingError("");
    }

    if (enteredDate === "") {
      setDateError("Ingresa una fecha.");
      return;
    } else {
      setDateError("");
    }

    // building_id, status, date estos 3 datos le tengo q mandar, el resto de los datos los obtiene el backend y nos lo retorna en el budget creado.
    const newBudget = {
      building_id: enteredBuilding,
      status: enteredState,
      date: enteredDate,
    };

    // Agregar la nueva obra
    budgetCtx.addItem(newBudget);
    setZNewBuilding("z-20");
  };

  //Absoluto al contenedor padre que es relativo (Customer)
  return (
    <Fragment>
      <div
        className={`absolute top-12 left-1/2 transform -translate-x-1/2  bg-gray-100 rounded-[8px] border border-solid border-grayBorder w-[600px] ${zNewBuilding}`}
      >
        <RxCross1
          className="text-[20px] absolute top-[10px] right-[10px] text-blackText cursor-pointer"
          onClick={props.hideNewBudgetFunction}
        ></RxCross1>
        <h1 className="font-sans text-[28px] font-normal text-blackText text-center border-b border-b-grayBorder">
          Registar Presupuesto
        </h1>

        <form className="flex flex-col px-6 pt-6 pb-2 relative ">
          <div className="mb-4 w-[50%] relative">
            <label htmlFor="building" className="text-sm font-semibold block">
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
                className={`w-full p-1 border border-gray-500 rounded-md focus:ring ring-blue5 focus:border focus:border-blue6 focus:outline-none cursor-pointer ${
                  buildingError !== ""
                    ? " border-red5 ring-red3  focus:border-red5 focus:bg-white "
                    : ""
                }`}
              >
                {Buildings.map((building) => (
                  <option key={building._id} value={building._id}>
                    {building.name}
                  </option>
                ))}
              </select>
            )}
            {buildingError !== "" && (
              <p className="mr-2  text-xs text-red5 absolute">
                {buildingError}
              </p>
            )}
          </div>

          <div className="mb-4 w-[50%] relative">
            <label
              htmlFor="initialState"
              className="text-sm font-semibold block"
            >
              Estado
            </label>
            <select
              id="initialState"
              ref={stateRef}
              className={`w-full p-1 border border-gray-500 rounded-md focus:ring ring-blue5 focus:border focus:border-blue6 focus:outline-none cursor-pointer ${
                stateError !== ""
                  ? " border-red5 ring-red3  focus:border-red5 focus:bg-white "
                  : ""
              }`}
            >
              <option value="Pendiente">Pendiente</option>
              <option value="Aprobado">Aprobado</option>
              <option value="Rechazado">Rechazado</option>
              <option value="En Construcción">En Construcción</option>
              <option value="Finalizado">Finalizado</option>
            </select>
            {stateError !== "" && (
              <p className="mr-2  text-xs text-red5 absolute">{stateError}</p>
            )}
          </div>

          <div className="mb-4 max-w-[50%] relative">
            <label htmlFor="date" className="text-sm font-semibold block">
              Fecha
            </label>
            <input
              type="date"
              id="date"
              name="date"
              required
              ref={dateRef}
              className={`w-full p-1 border   border-gray-500 rounded-md focus:ring ring-blue5  focus:border focus:border-blue6 focus:outline-none    ${
                dateError !== ""
                  ? " border-red5 ring-red3  focus:border-red5 focus:bg-white "
                  : ""
              }`}
            />
            {dateError !== "" && (
              <p className="mr-2  text-xs text-red5 absolute">{dateError}</p>
            )}
          </div>

          <div className="mb-4 w-full">
            <label htmlFor="addService" className="text-sm font-semibold block">
              Agregar Servicio
            </label>
            <select
              id="addService"
              //ref={stateRef}
              onChange={agregarServicio}
              className={`w-full p-1 border border-gray-500 rounded-md focus:ring ring-blue5 focus:border focus:border-blue6 focus:outline-none cursor-pointer `}
            >
              <option value="">Seleccione una opción</option>
              {Services.map((service) => (
                <option key={service._id} value={service._id}>
                  {service.name}
                </option>
              ))}
            </select>
          </div>

          {/* Contenedor que lista los servicios seleccionados */}
          <div className="mb-4">
            <h4 className="text-base font-semibold block">
              Servicios Seleccionados:
            </h4>
            {serviciosSeleccionados.length === 0 && (
              <span className="text-sm flex justify-center">
                Aún no has selecionado ningún producto.
              </span>
            )}

            {serviciosSeleccionados.length !== 0 && (
              <ul className="overflow-y-auto max-h-[140px] text-sm border border-grayBorder rounded-[8px]  ">
                <li className="flex w-full font-semibold text-center items-center border-b border-b-grayBorder">
                  <span className="w-[35%]">Nombre</span>
                  <span className="w-[15%]">Unidad de medida</span>
                  <span className="w-[15%]">Costo unitario</span>
                  <span className="w-[15%]">Cantidad</span>
                  <span className="w-[15%]">Costo total</span>
                </li>
                {serviciosSeleccionados.map((servicio, index) => (
                  <li
                    key={index}
                    className={`flex  items-center py-1 px-1 text-center  ${
                      index !== serviciosSeleccionados.length - 1
                        ? "border-b border-b-grayBorder"
                        : ""
                    }`}
                  >
                    <span className="w-[35%] truncate">{servicio.nombre}</span>
                    <span className="w-[15%] truncate">
                      {servicio.unidadDeMedida}
                    </span>
                    <span className="w-[15%] truncate">
                      ${servicio.costeUnitario}
                    </span>
                    {/* Contador para cantidad */}
                    <div className="w-[15%] truncate">
                      <input
                        type="number"
                        value={cantidades[servicio.id] || 1}
                        min="1"
                        onChange={(e) =>
                          actualizarCantidad(servicio, parseInt(e.target.value))
                        }
                        className="w-[80%] text-center border border-gray-300 rounded-md"
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault(); // Evita que el formulario se envíe o se cierre
                          }
                        }}
                      />
                    </div>

                    {/* Calcula el total dinámicamente */}
                    <span className="w-[15%] truncate">
                      ${servicio.costeUnitario * (cantidades[servicio.id] || 1)}
                    </span>

                    <div className="w-[5%] flex items-center justify-center">
                      <button
                        type="button"
                        className="text-red4 hover:text-darkred"
                        onClick={() => eliminarServicio(servicio)}
                      >
                        <FaTrashAlt></FaTrashAlt>
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}

            {/* Campo TOTAL general */}

            {serviciosSeleccionados.length !== 0 && (
              <div className="flex justify-end mt-2 text-lg font-bold truncate">
                <span>TOTAL: ${calcularTotalGeneral()}</span>
              </div>
            )}
          </div>

          {!budgetCtx.isLoadingAddItem && (
            <div className="flex items-center justify-end min-h-[40px]">
              <button
                className="flex h-[36px] w-[102px] text-sm items-center font-sans text-[13px] cursor-pointer text-gray-700 p-2 rounded-[8px] border border-solid border-gray-500 bg-gray-300 hover:bg-opacity-70 active:border active:border-gray-500 active:outline-none active:ring ring-blue-200  justify-center mr-2"
                onClick={props.hideNewBudgetFunction}
              >
                Atrás
              </button>

              <button
                className=" flex h-[36px] w-[102px] text-sm items-center  font-sans text-[13px]  cursor-pointer  text-white  p-2 rounded-[8px] border border-solid border-white bg-darkblue  ring-blue5  hover:bg-opacity-90 active:border active:border-blue6 active:outline-none active:ring justify-center"
                onClick={submitHandler}
              >
                Registrar
              </button>
            </div>
          )}

          {budgetCtx.isLoadingAddItem && (
            <div className="flex items-center justify-center ">
              <Loader></Loader>
            </div>
          )}
        </form>
      </div>

      {/*Aca van los 2 carteles que van a ser absolutos respecto a su contenedor padre (este div). Algo absoluto se hace referencia al padre mas cercano que tenga que no sea static, en este caso este es absoluto */}

      {budgetCtx.errorAddItem && (
        <div
          className="flex flex-col items-center h-fit w-[250px]   rounded-xl border border-red5 bg-white  ring-4 ring-inset 	
          ring-red2 ring-opacity-20 z-50 absolute top-1/2 left-1/2 transform -translate-x-1/2  -translate-y-1/2   px-[18px]  py-[14px]    "
        >
          <div className="flex w-full ">
            <div className="flex items-center mr-3">
              <HiOutlineExclamationTriangle className="text-[25px] text-red5"></HiOutlineExclamationTriangle>
            </div>
            <div className="flex flex-col justify-center font-sans   ">
              <h1 className="text-lg  text-red5 ">Hubo un problema</h1>
              <h2 className="  text-xs h-[30px] text-blackText line-clamp-2 ">
                {budgetCtx.errorAddItem}
              </h2>
            </div>
          </div>

          <button
            className=" flex h-[36px] w-[102px] text-sm items-center font-sans text-[13px] cursor-pointer text-gray-700 p-2 rounded-[8px] border border-solid border-gray-500 bg-gray-300 hover:bg-opacity-70 active:border active:border-gray-500 active:outline-none active:ring ring-blue-200  justify-center mt-2"
            onClick={props.hideNewBudgetFunction}
          >
            Aceptar
          </button>
        </div>
      )}

      {budgetCtx.successAddItem && (
        <div
          className=" flex flex-col h-fit w-[250px]  items-center rounded-xl border-[2px] border-l-[12px] border-solid border-greenBorder bg-white px-[18px]  py-[14px] font-sans text-[14px] text-blackText z-50 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
         "
        >
          <div className="flex">
            <FaCheckCircle className="mr-1.5  align-top text-[18px] text-greenText"></FaCheckCircle>
            Presupuesto Registrado.
          </div>

          <button
            className=" flex h-[36px] w-[102px] text-sm items-center font-sans text-[13px] cursor-pointer text-gray-700 p-2 rounded-[8px] border border-solid border-gray-500 bg-gray-300 hover:bg-opacity-70 active:border active:border-gray-500 active:outline-none active:ring ring-blue-200  justify-center mt-2"
            onClick={props.hideNewBudgetFunction}
          >
            Aceptar
          </button>
        </div>
      )}
    </Fragment>
  );
};

export default NewBudget;
