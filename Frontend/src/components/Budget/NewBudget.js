import { useState, useRef, useContext } from "react";
import { BiAccessibility } from "react-icons/bi";
import { FaCheckCircle } from "react-icons/fa";
import { HiOutlineExclamationTriangle } from "react-icons/hi2";
import { RxCross1 } from "react-icons/rx";
import { FaTrashAlt } from "react-icons/fa";

import Link from "next/link";
import ServiceContext from "@/store/ServiceContext";

const NewBudget = (props) => {
  const [clientError, setClientError] = useState("");
  const clientRef = useRef();
  const [initialStateError, setInitialStateError] = useState("");
  const initialStateRef = useRef();
  const [buildingError, setBuildingError] = useState("");
  const buildingRef = useRef();

  const [serviciosSeleccionados, setServiciosSeleccionados] = useState([]);
  const [cantidades, setCantidades] = useState({});

  const serviceCtx = useContext(ServiceContext);
  const servicios = serviceCtx.items;

  //Como en el Select el campo value solo acepta string o number (HTML es asi) y no el objeto servicio, para poder trabajar con dicho objeto en el Select se convierte el objeto a cadena de texto con stringify.
  //Luego, en esta funcion, lo convertimos nuevamente en objeto usando JSON.parse
  const agregarServicio = (e) => {
    const servicioSeleccionado = JSON.parse(e.target.value);
    console.log(servicioSeleccionado);
    console.log(serviciosSeleccionados);
    console.log(cantidades);

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
    const enteredClient = clientRef.current.value;
    const enteredInitialState = initialStateRef.current.value;
    const enteredBuilding = buildingRef.current.value;

    if (enteredClient === "") {
      setClientError("Selecciona un cliente.");
    } else {
      setClientError("");
    }

    if (enteredInitialState === "") {
      setInitialStateError("Selecciona un estado inicial.");
    } else {
      setInitialStateError("");
    }

    if (enteredBuilding === "") {
      setBuildingError("Selecciona una obra.");
    } else {
      setBuildingError("");
    }
  };

  //Absoluto al contenedor padre que es relativo (Customer)
  return (
    <div className=" absolute top-12 left-1/2 transform -translate-x-1/2  z-40 bg-gray-100 rounded-[8px] border border-solid border-grayBorder w-[600px]">
      <RxCross1
        className="text-[20px] absolute top-[10px] right-[10px] text-blackText cursor-pointer"
        onClick={props.hideNewBudgetFunction}
      ></RxCross1>
      <h1 className="font-sans text-[28px] font-normal text-blackText text-center border-b border-b-grayBorder">
        Registar Presupuesto
      </h1>

      <form className="flex flex-col px-6 pt-6 pb-2 relative ">
        <div className="flex justify-between">
          <div className="mb-4 w-[49%]">
            <label htmlFor="client" className="text-sm font-semibold block">
              Cliente
            </label>
            <select
              id="client"
              ref={clientRef}
              className={`w-full p-1 border border-gray-500 rounded-md focus:ring ring-blue5 focus:border focus:border-blue6 focus:outline-none cursor-pointer ${
                clientError !== ""
                  ? " border-red5 ring-red3  focus:border-red5 focus:bg-white "
                  : ""
              }`}
            >
              <option value="">Seleccione una opción</option>
              <option value="opcion1">Opción 1</option>
              <option value="opcion2">Opción 2</option>
              <option value="opcion3">Opción 3</option>
            </select>
            {clientError !== "" && (
              <p className="mr-2  text-xs text-red5">{clientError}</p>
            )}
          </div>

          <div className="mb-4 w-[49%]">
            <label htmlFor="building" className="text-sm font-semibold block">
              Obra
            </label>
            <select
              id="building"
              ref={buildingRef}
              className={`w-full p-1 border border-gray-500 rounded-md focus:ring ring-blue5 focus:border focus:border-blue6 focus:outline-none cursor-pointer ${
                buildingError !== ""
                  ? " border-red5 ring-red3  focus:border-red5 focus:bg-white "
                  : ""
              }`}
            >
              <option value="">Seleccione una opción</option>
              <option value="opcion1">Opción 1</option>
              <option value="opcion2">Opción 2</option>
              <option value="opcion3">Opción 3</option>
            </select>
            {buildingError !== "" && (
              <p className="mr-2  text-xs text-red5">{buildingError}</p>
            )}
          </div>
        </div>
        <div className="mb-4 w-[49%]">
          <label htmlFor="initialState" className="text-sm font-semibold block">
            Estado Inicial
          </label>
          <select
            id="initialState"
            ref={initialStateRef}
            className={`w-full p-1 border border-gray-500 rounded-md focus:ring ring-blue5 focus:border focus:border-blue6 focus:outline-none cursor-pointer ${
              initialStateError !== ""
                ? " border-red5 ring-red3  focus:border-red5 focus:bg-white "
                : ""
            }`}
          >
            <option value="">Seleccione una opción</option>
            <option value="opcion1">Opción 1</option>
            <option value="opcion2">Opción 2</option>
            <option value="opcion3">Opción 3</option>
          </select>
          {initialStateError !== "" && (
            <p className="mr-2  text-xs text-red5">{initialStateError}</p>
          )}
        </div>

        <div className="mb-4 w-full">
          <label htmlFor="addService" className="text-sm font-semibold block">
            Agregar Servicio
          </label>
          <select
            id="addService"
            //ref={initialStateRef}
            onChange={agregarServicio}
            className={`w-full p-1 border border-gray-500 rounded-md focus:ring ring-blue5 focus:border focus:border-blue6 focus:outline-none cursor-pointer `}
          >
            <option value="">Seleccione una opción</option>
            {servicios.map((servicio, index) => (
              <option key={index} value={JSON.stringify(servicio)}>
                {servicio.nombre}
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

        <div className="flex items-center justify-end ">
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
      </form>

      {/*Aca van los 2 carteles que van a ser absolutos respecto a su contenedor padre (este div). Algo absoluto se hace referencia al padre mas cercano que tenga que no sea static, en este caso este es absoluto */}

      {false && (
        <div
          className="flex h-20 w-full   rounded-xl border border-red5 bg-white p-4 ring-4 ring-inset 	
          ring-red2 ring-opacity-20 absolute top-[-94px]  "
        >
          <HiOutlineExclamationTriangle className="mr-4  align-top text-[30px] text-red5"></HiOutlineExclamationTriangle>
          <div className="flex flex-col justify-center font-sans    ">
            <h1 className="text-lg  text-red5 ">Hubo un problema</h1>
            <h2 className="  text-xs text-blackText ">Msg de error</h2>
          </div>
        </div>
      )}

      {true && (
        <div
          className=" flex h-[56px] w-full   items-center rounded-xl border-[2px] border-l-[12px] border-solid border-greenBorder bg-white px-[18px] pb-[18px] pt-[14px] font-sans text-[14px] text-blackText
           absolute top-[-70px]   "
        >
          <FaCheckCircle className="mr-1.5  align-top text-[18px] text-greenText"></FaCheckCircle>
          Presupuesto Registrado.
        </div>
      )}
    </div>
  );
};

export default NewBudget;
