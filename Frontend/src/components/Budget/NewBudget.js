import { useState, useRef, useContext, Fragment } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { HiOutlineExclamationTriangle } from "react-icons/hi2";
import { RxCross1 } from "react-icons/rx";
import { FaTrashAlt } from "react-icons/fa";
import ServiceContext from "@/store/ServiceContext";
import BuildingContext from "@/store/BuildingContext";
import BudgetContext from "@/store/BudgetContext";
import Loader from "../UI/Loader";
import PopUpError from "../UI/PopUpError";
import PopUpSuccess from "../UI/PopUpSuccess";
import MeasureUnitContext from "@/store/MeasureUnitContext";
import { IoAlertCircleSharp } from "react-icons/io5";
import ReactSelect from "react-select";

const NewBudget = (props) => {
  const [stateError, setStateError] = useState("");
  const [buildingError, setBuildingError] = useState("");
  const [dateError, setDateError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorRequestAddServiceLines, setErrorRequestAddServiceLines] =
    useState("");
  const [zNewBuilding, setZNewBuilding] = useState("z-40");
  const [selectedServicies, setSelectedServicies] = useState([]);
  const [selectedState, setSelectedState] = useState(null);
  const [selectedBuilding, setSelectedBuilding] = useState(null);

  const dateRef = useRef();

  //Para mandar alguna request.
  const { budgetContext: budgetCtx } = useContext(BudgetContext);
  const { measureUnitContext: measureUnitCtx } = useContext(MeasureUnitContext);

  //Para obtener el nombre de la unidad de medida del servicio.
  const measureUnits = measureUnitCtx.items;

  //Para renderizar los servicios
  const { serviceContext: serviceCtx } = useContext(ServiceContext);
  const Services = serviceCtx.items;

  //Para renderizar las obras
  const { buildingContext: buildingCtx } = useContext(BuildingContext);
  const Buildings = buildingCtx.items;

  const handleSelectChange = (selectedOption) => {
    addService(selectedOption); // pasa el objeto seleccionado completo
  };

  const addService = (selectedOption) => {
    if (!selectedOption) return; // si no hay opción seleccionada, salimos

    // Obtén el servicio seleccionado
    const selectedService = Services.find(
      (service) => service._id === selectedOption.value
    );

    // Verifica si el servicio ya está agregado en el arreglo de servicios
    const isServiceSelected = selectedServicies.some(
      (service) => service._id === selectedOption.value
    );

    if (!selectedService || isServiceSelected) return;

    // Obtener el nombre de la unidad de medida correspondiente
    const measureUnit = measureUnits.find(
      (mu) => mu._id === selectedService.measure_unit_id
    );
    const measureUnitName = measureUnit
      ? measureUnit.name
      : "Unidad de medida no encontrada";

    // Agrega el servicio al arreglo de servicios seleccionados
    setSelectedServicies((prevState) => [
      ...prevState,
      {
        ...selectedService,
        measureUnitName,
        quantity: 1,
        position: prevState.length + 1,
      },
    ]);
  };

  //Se crea un nuevo arreglo con Filter. La funcion callback se ejecuta para cada elemento del arreglo, la condicion es que si el elemento s es DISTINTO al servicio que se quiere eliminar, se MANTIENE en el nuevo arreglo.
  const deleteService = (servicioId) => {
    setSelectedServicies(
      selectedServicies.filter((service) => service._id !== servicioId)
    );
  };

  //Siempre que la clave exista, se actualiza. Ademas este metodo se llama desde el listado existente, osea no se puede dar el caso de agregar un sv nuevo desde este metodo.
  const updateQuantity = (serviceId, newQuantity) => {
    if (isNaN(newQuantity) || newQuantity <= 0) {
      return;
    }

    // Actualizar la cantidad del servicio seleccionado
    setSelectedServicies((prevState) =>
      prevState.map((s) =>
        s._id === serviceId
          ? { ...s, quantity: newQuantity } // Actualizar cantidad solo del servicio correspondiente
          : s
      )
    );
  };

  //Con reduce, obtengo un solo valor a partir del arreglo. La funcion callback tiene el total acumulado hasta el momento y el servicio actual del arreglo de servicios seleccionados. Por cada servicio obtiene la cantidad que hay en el arreglo de cantidades y se hace la multiplicacion por su coste unitario y se acumula al total.
  //El segundo parametro es el 0 que es el valor inicial del acumulador.
  //Si no hay cantidad especificada (cosa que no deberia pasar) se usa por defecto 1.
  const total = () => {
    return selectedServicies.reduce((total, service) => {
      const quantity = service.quantity || 1;
      return total + service.price * quantity;
    }, 0); // Empieza con 0 como valor inicial del acumulador
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    setErrorRequestAddServiceLines(""); //Por las dudas, por mas que no tenga servicios el presupuesto que se registre, para asegurarnos que salga la opcion de msg correcta, lo reseteo.

    //El valor que se obtiene desde el input de tipo date usando dateRef.current.value siempre está en formato ISO 8601 (YYYY-MM-DD), independientemente de cómo se muestre al usuario. Este formato es estándar en la web y en bases de datos como MongoDB
    //En cambio, la forma en que se renderiza la entrada en el INPUT tipo date puede ser MM-DD-YYYY si tu PC o Navegador esta en Ingles, pero a pesar de ingresarse asi, luego se formatea y se pone en el ISO.
    const enteredDate = dateRef.current.value;

    if (selectedBuilding === null) {
      setBuildingError("Selecciona una obra.");
      return;
    } else {
      setBuildingError("");
    }

    if (selectedState === null) {
      setStateError("Selecciona un estado.");
      return;
    } else {
      setStateError("");
    }

    if (enteredDate === "") {
      setDateError("Ingresa una fecha.");
      return;
    } else {
      setDateError("");
    }

    // building_id, status, date estos 3 datos le tengo q mandar, el resto de los datos los obtiene el backend y nos lo retorna en el budget creado.
    const newBudget = {
      building_id: selectedBuilding.value,
      status: selectedState.value,
      date: enteredDate,
    };

    // Agregar la nueva obra
    setZNewBuilding("z-20");
    const budgetId = await budgetCtx.addItem(newBudget);

    //Al usar budgetId si falla la creacion, no se define y entonces no se envian las request estas al pepe xq tambien van a fallar.
    //Si se crea el servicio, va a aparecer el cartel de exito... pero le tengo que agregar que para que aparezca se condicione con el exito de las lineas, sino que aparezca error.
    if (selectedServicies.length !== 0 && budgetId) {
      try {
        const token = localStorage.getItem("token");
        setIsLoading(true);

        // Usar un bucle for para ejecutar las requests secuencialmente
        //Si alguna falla, el bucle termina y va al catch.
        for (const service of selectedServicies) {
          const response = await fetch(
            process.env.NEXT_PUBLIC_ADD_BUDGETLINE_URL,
            {
              method: "POST",
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                budget_id: budgetId, // Presupuesto al que se está agregando la línea
                service_id: service._id, // ID del servicio
                quantity: service.quantity, // Cantidad del servicio
              }),
            }
          );

          if (!response.ok) {
            const responseData = await response.json();
            throw {
              message:
                responseData.message || "Error al agregar línea de servicio",
              messageinfo:
                responseData.messageinfo || "Detalles no disponibles",
              // extra: responseData.extra || service.name, //Agrego el name del servicio q fallo
              extra: responseData.extra || service.name, //Agrego el name del servicio q fallo
            };
          }

          const result = await response.json(); // Procesa el resultado si es necesario
          console.log("LINEA AGREGADA: ", result);
        }

        //Solo se deja de cargar CUANDO SE MANDAN TODAS LAS REQUEST. O cuando falla que va por el finally.
        setIsLoading(false);
        setErrorRequestAddServiceLines("");
      } catch (error) {
        setErrorRequestAddServiceLines({
          message: error.message || "Error desconocido",
          messageinfo: error.messageinfo || "Detalles no disponibles",
          extra: error.extra || "Sin info",
        });
      } finally {
        setIsLoading(false);
      }
    }
  };

  //Personalizacion del Select
  const serviceOptions = Services.map((service) => ({
    value: service._id,
    label: service.name,
  }));

  const handleStateChange = (selectedOption) => {
    setSelectedState(selectedOption); // Actualiza el estado local
  };

  const stateOptions = [
    { value: "Pendiente", label: "Pendiente" },
    { value: "Aprobado", label: "Aprobado" },
    { value: "Rechazado", label: "Rechazado" },
    { value: "En Construcción", label: "En Construcción" },
    { value: "Finalizado", label: "Finalizado" },
  ];

  const buildingOptions = Buildings.map((building) => ({
    value: building._id,
    label: building.name,
  }));

  const handleBuildingChange = (selectedOption) => {
    setSelectedBuilding(selectedOption);
  };

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
            <label htmlFor="building" className="text-sm font-bold block">
              Obra
            </label>

            {buildingCtx.isLoading && (
              <div className="h-[31px] flex items-center justify-center">
                <Loader></Loader>
              </div>
            )}
            {buildingCtx.error && (
              <div className="flex flex-col justify-center items-center h-auto border   border-gray-500 rounded-md">
                <p>{buildingCtx.error.message}</p>
                <small>{buildingCtx.error.messageinfo}</small>
              </div>
            )}

            {!buildingCtx.error && !buildingCtx.isLoading && (
              <ReactSelect
                options={buildingOptions}
                onChange={handleBuildingChange}
                value={selectedBuilding}
                placeholder="Seleccione una opción"
                menuPlacement="auto"
                styles={{
                  control: (provided, state) => ({
                    ...provided,
                    width: "100%", // Asegura que el select ocupe el ancho total del contenedor
                    border:
                      buildingError !== "" // Si hay un error, usa el color de error
                        ? "1px solid #fb1c0a" // Borde rojo si hay error
                        : state.isFocused
                        ? "1px solid #0092f3" // Borde azul al estar seleccionado
                        : "1px solid #6b7280", // Borde gris por defecto
                    boxShadow:
                      buildingError !== "" // Si hay un error, añade el ring de error
                        ? "0 0 0 3px rgba(253, 92, 60, 0.5)" // Ring rojo personalizado al error
                        : state.isFocused
                        ? "0 0 0 3px #79c5f8" // Ring azul personalizado al enfocar
                        : null,
                    "&:hover": {
                      border:
                        buildingError !== "" // Mantiene el borde rojo en hover si hay error
                          ? "1px solid #fb1c0a"
                          : state.isFocused
                          ? "1px solid #0092f3" // Mantiene el borde azul en hover si está enfocado
                          : "1px solid #6b7280", // Gris claro en hover cuando no está enfocado
                    },
                  }),
                  menu: (provided) => ({
                    ...provided,
                    maxWidth: "100%",
                    wordWrap: "break-word", // Ajusta texto largo en las opciones
                    border: "1px solid #6b7280",
                  }),
                  option: (provided, state) => ({
                    ...provided,
                    whiteSpace: "normal",
                    backgroundColor: state.isSelected ? "#0071bb" : "white",
                    "&:hover": {
                      backgroundColor: state.isFocused ? "#79c5f8" : "white",
                    },
                  }),
                  singleValue: (provided, state) => ({
                    ...provided,
                    color: "#0F1111",
                  }),
                }}
              />
            )}
            {buildingError !== "" && (
              <p className="mr-2  text-xs text-red5 absolute">
                {buildingError}
              </p>
            )}
          </div>

          <div className="mb-4 w-[50%] relative">
            <label htmlFor="initialState" className="text-sm font-bold block">
              Estado
            </label>

            <ReactSelect
              options={stateOptions}
              onChange={handleStateChange}
              value={selectedState}
              placeholder="Seleccione una opción"
              menuPlacement="auto"
              styles={{
                control: (provided, state) => ({
                  ...provided,
                  width: "100%",
                  border:
                    stateError !== ""
                      ? "1px solid #fb1c0a"
                      : state.isFocused
                      ? "1px solid #0092f3"
                      : "1px solid #6b7280",
                  boxShadow:
                    stateError !== ""
                      ? "0 0 0 3px rgba(253, 92, 60, 0.5)"
                      : state.isFocused
                      ? "0 0 0 3px #79c5f8"
                      : null,
                  "&:hover": {
                    border:
                      stateError !== ""
                        ? "1px solid #fb1c0a"
                        : state.isFocused
                        ? "1px solid #0092f3"
                        : "1px solid #6b7280",
                  },
                }),
                menu: (provided) => ({
                  ...provided,
                  maxWidth: "100%",
                  wordWrap: "break-word",
                  border: "1px solid #6b7280",
                }),
                option: (provided, state) => ({
                  ...provided,
                  whiteSpace: "normal",
                  backgroundColor: state.isSelected ? "#0071bb" : "white",
                  "&:hover": {
                    backgroundColor: state.isFocused ? "#79c5f8" : "white",
                  },
                }),
                singleValue: (provided, state) => ({
                  ...provided,
                  color: "#0F1111",
                }),
              }}
            />
            {stateError !== "" && (
              <p className="mr-2  text-xs text-red5 absolute">{stateError}</p>
            )}
          </div>

          <div className="mb-4 max-w-[50%] relative">
            <label htmlFor="date" className="text-sm font-bold block">
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
            <label htmlFor="addService" className="text-sm font-bold block">
              Agregar Servicio
            </label>

            {serviceCtx.isLoading && (
              <div className="h-[31px] flex items-center justify-center">
                <Loader></Loader>
              </div>
            )}
            {serviceCtx.error && (
              <div className="flex flex-col justify-center items-center h-auto border   border-gray-500 rounded-md">
                <p>{serviceCtx.error.message}</p>
                <small>{serviceCtx.error.messageinfo}</small>
              </div>
            )}

            {!serviceCtx.error && !serviceCtx.isLoading && (
              <ReactSelect
                options={serviceOptions}
                onChange={handleSelectChange}
                placeholder="Seleccione una opción"
                menuPlacement="auto"
                styles={{
                  control: (provided, state) => ({
                    ...provided,
                    width: "100%",
                    border: state.isFocused
                      ? "1px solid #0092f3"
                      : "1px solid #6b7280",
                    boxShadow: state.isFocused ? "0 0 0 3px #79c5f8" : null,
                    "&:hover": {
                      border: state.isFocused
                        ? "1px solid #0092f3"
                        : "1px solid #6b7280",
                    },
                  }),
                  menu: (provided) => ({
                    ...provided,
                    maxWidth: "100%",
                    wordWrap: "break-word",
                    border: "1px solid #6b7280",
                  }),
                  option: (provided, state) => ({
                    ...provided,
                    whiteSpace: "normal",
                    backgroundColor: state.isSelected ? "#0071bb" : "white",
                    "&:hover": {
                      backgroundColor: state.isFocused ? "#79c5f8" : " #white",
                    },
                  }),
                  singleValue: (provided, state) => ({
                    ...provided,
                    color: "#0F1111",
                  }),
                }}
              />
            )}
          </div>

          {/* Contenedor que lista los servicios seleccionados */}
          <div className="mb-4">
            <h4 className="text-base font-bold block">
              Servicios Seleccionados:
            </h4>
            {selectedServicies.length === 0 && (
              <span className="text-sm flex justify-center">
                Aún no has selecionado ningún servicio.
              </span>
            )}

            {selectedServicies.length !== 0 && (
              <ul className="overflow-y-auto max-h-[140px] text-sm border border-grayBorder rounded-[8px]  ">
                <li className="flex w-full font-semibold text-center items-center border-b border-b-grayBorder">
                  <span className="w-[35%]">Nombre</span>
                  <span className="w-[15%]">Unidad de medida</span>
                  <span className="w-[15%]">Precio unitario</span>
                  <span className="w-[15%]">Cantidad</span>
                  <span className="w-[15%]">Total linea</span>
                </li>
                {selectedServicies.map((service, index) => (
                  <li
                    key={index}
                    className={`flex  items-center py-1 px-1 text-center  ${
                      index !== selectedServicies.length - 1
                        ? "border-b border-b-grayBorder"
                        : ""
                    }`}
                  >
                    <span className="w-[35%] h-auto break-words overflow-wrap-anywhere ">
                      {service.name}
                    </span>
                    <span className="w-[15%] h-auto break-words overflow-wrap-anywhere ">
                      {service.measureUnitName}
                    </span>
                    <span className="w-[15%] h-auto break-words overflow-wrap-anywhere ">
                      ${service.price}
                    </span>
                    {/* Contador para cantidad */}
                    <div className="w-[15%] h-auto break-words overflow-wrap-anywhere ">
                      <input
                        type="number"
                        value={service.quantity || 1}
                        min="1"
                        onChange={(e) =>
                          updateQuantity(service._id, parseInt(e.target.value))
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
                    <span className="w-[15%] h-auto break-words overflow-wrap-anywhere ">
                      ${service.price * (service.quantity || 1)}
                    </span>

                    <div className="w-[5%] flex items-center justify-center">
                      <button
                        type="button"
                        className="text-red4 hover:text-darkred"
                        onClick={() => deleteService(service._id)}
                      >
                        <FaTrashAlt></FaTrashAlt>
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}

            {/* Campo TOTAL general */}

            {selectedServicies.length !== 0 && (
              <div className="flex justify-end mt-2 text-lg font-bold truncate">
                <span>TOTAL: ${total()}</span>
              </div>
            )}
          </div>

          {/* En caso que haya servicios, tambien hay que esperar a que termine la adicion de los servicios */}
          {!budgetCtx.isLoadingAddItem && !isLoading && (
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

          {/* Aca quiero que el Loader se renderice cuando cualquiera de las 2 sea true */}
          {(budgetCtx.isLoadingAddItem || isLoading) && (
            <div className="flex items-center justify-center ">
              <Loader></Loader>
            </div>
          )}
        </form>
      </div>

      {/*Aca van los 2 carteles que van a ser absolutos respecto a su contenedor padre (este div). Algo absoluto se hace referencia al padre mas cercano que tenga que no sea static, en este caso este es absoluto */}

      {/* El error basta con que se muestre cuando falla la creacion del budget, porque las lineas no se van a ejecutar */}
      {budgetCtx.errorAddItem && (
        <PopUpError
          message={budgetCtx.errorAddItem.message}
          messageinfo={budgetCtx.errorAddItem.messageinfo}
          onAccept={props.hideNewBudgetFunction}
          icon={HiOutlineExclamationTriangle}
        />
      )}
      {/* El exito solamente se tiene que mostrar cuando no hay error en la creacion del presupuesto y tampoco en la creacion de las lineas de presupuesto */}
      {budgetCtx.successAddItem && !errorRequestAddServiceLines && (
        <PopUpSuccess
          message="Presupuesto Registrado."
          onAccept={props.hideNewBudgetFunction}
          icon={FaCheckCircle}
        />
      )}

      {/* En caso que falle la creacion de las lineas, solamente creamos el budget sin las lineas */}
      {budgetCtx.successAddItem && errorRequestAddServiceLines && (
        <div className="flex flex-col h-fit min-h-[97px] w-auto min-w-[250px] rounded-xl border-[2px] border-l-[12px] border-solid border-yellow-400 bg-white px-[18px] pt-[14px] font-sans text-[14px] text-blackText z-50 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="flex items-center flex-col">
            <div className="w-full flex ml-[3px] mb-[10px]">
              <FaCheckCircle className="mr-[8.5px] align-top text-[19px] text-yellow-500" />
              Presupuesto registrado.
            </div>
            <div className="w-full flex">
              <IoAlertCircleSharp className="mr-1.5 align-top text-[22px] text-yellow-500" />
              El servicio:&nbsp;{errorRequestAddServiceLines.extra}{" "}
              {selectedServicies.length === 1
                ? "no se registró."
                : "y los sucesivos a el, no se registraron."}
            </div>
            <div className="w-full flex pl-[27px]">
              Causa:&nbsp;{errorRequestAddServiceLines.messageinfo}
            </div>
          </div>

          <button
            className="flex h-[36px] w-[102px] mx-auto text-sm items-center font-sans text-[13px] cursor-pointer text-gray-700 p-2 rounded-[8px] border border-solid border-gray-500 bg-gray-300 hover:bg-opacity-70 active:border active:border-gray-500 active:outline-none active:ring ring-blue-200 justify-center my-2"
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
