import { RxCross1 } from "react-icons/rx";
import { useState, useRef, Fragment, useEffect, useContext } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { HiOutlineExclamationTriangle } from "react-icons/hi2";
import BuildingContext from "@/store/BuildingContext";
import Loader from "../UI/Loader";
import BudgetContext from "@/store/BudgetContext";
import ServiceContext from "@/store/ServiceContext";
import { FaTrashAlt } from "react-icons/fa";
import ReactSelect from "react-select";

const BudgetDetail = (props) => {
  //Cosas de Renderizar el detalle de presupuesto:
  //Almaceno la data del presupuesto, incluidas las lineas de presupuesto.
  const [budgetData, setBudgetData] = useState({});
  //Este estado por separado, para poder modificarlo cuando se cambia alguna lines de servicio y poder reflfejarlo en la lista que se renderiza a partir de esto.
  const [budgetLines, setBudgetLines] = useState([]);
  //Error para renderizaar en caso de no poder obtener la data del presupuesto.
  const [errorRequest, setErrorRequest] = useState("");
  //Mientras esta cargando la request, renderizo el loader.
  //Hago que sea TRUE desde un principio, para que se haga false cuando salga bien la request y asi evitar tener problema de la data de budger undefined.
  const [isLoading, setIsLoading] = useState(true);

  //Para renderizar las obras
  const { buildingContext: buildingCtx } = useContext(BuildingContext);
  const Buildings = buildingCtx.items;

  const buildingOptions = Buildings.map((building) => ({
    value: building._id,
    label: building.name,
  }));

  const defaultBuilding = buildingOptions.find(
    (option) => option.value === (budgetData?.budget?.building_id || null)
  );

  const { serviceContext: serviceCtx } = useContext(ServiceContext);
  const Services = serviceCtx.items;

  const serviceOptions = Services.map((service) => ({
    value: service._id,
    label: service.name,
  }));

  const stateOptions = [
    { value: "Pendiente", label: "Pendiente" },
    { value: "Aprobado", label: "Aprobado" },
    { value: "Rechazado", label: "Rechazado" },
    { value: "En Construcción", label: "En Construcción" },
    { value: "Finalizado", label: "Finalizado" },
  ];

  const defaultStatus = stateOptions.find(
    (option) => option.value === (budgetData?.budget?.status || null)
  );

  const total = () => {
    return budgetLines.reduce((total, budgetline) => {
      return total + budgetline.amount;
    }, 0); // Empieza con 0 como valor inicial del acumulador
  };

  //Obtengo TODA la data del presupuesto, incluido la linea de servicios.
  //A diferencia de los demas componentes que esta data viene del context, aca debo usar los estados locales del componente y en base a eso renderizar la data, el msg de error o el cargando.
  useEffect(() => {
    const fetchBudgetData = async () => {
      try {
        const token = localStorage.getItem("token");
        setIsLoading(true);

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
          throw {
            message: responseData.message || "Error al cargar presupuesto",
            messageinfo: responseData.messageinfo || "Detalles no disponibles",
          };
        }

        const data = await response.json();
        setBudgetData(data);
        console.log(budgetData);
        setBudgetLines(data.budgetLines);
        setIsLoading(false);
        setErrorRequest("");
      } catch (error) {
        setErrorRequest({
          message: error.message || "Error desconocido",
          messageinfo: error.messageinfo || "Detalles no disponibles",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchBudgetData();
  }, []);

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

  const handleBuildingChange = (newBuildingId) => {
    budgetCtx.updateBuilding(props.budgetData, newBuildingId);
  };

  const handleStatusChange = (newState) => {
    budgetCtx.updateBudgetStatus(props.budgetData, newState);
  };

  const handleDateChange = (newDate) => {
    budgetCtx.updateBudgetDate(props.budgetData, newDate);
  };

  //Aca va lo relacionado a la modificacion de lineas de servicio.

  //Error para renderizaar en caso de no poder obtener la data del presupuesto.
  const [errorAddLineRequest, setErrorAddLineRequest] = useState("");
  const [errorDeleteLineRequest, setErrorDeleteLineRequest] = useState("");
  const [errorUpdateQuantityLineRequest, setErrorUpdateQuantityLineRequest] =
    useState("");
  const [isLoadingUpdateLineService, setisLoadingUpdateLineService] =
    useState(false);

  //Llama a la funcion addService
  const handleSelectChange = (selectedOption) => {
    addService(selectedOption);
  };

  const addService = async (selectedOption) => {
    if (!selectedOption) return; // si no hay opción seleccionada, salimos

    // Obtén el servicio seleccionado
    const selectedService = Services.find(
      (service) => service._id === selectedOption.value
    );

    // Verifica si el servicio ya está agregado en el arreglo de servicios
    const isServiceSelected = budgetLines.some(
      (serviceBudgetLine) =>
        serviceBudgetLine.service_id === selectedOption.value
    );

    if (!selectedService || isServiceSelected) return;

    const newBudgetLine = {
      service_id: selectedOption.value,
      quantity: 1,
      budget_id: budgetData.budget._id,
    };

    try {
      setisLoadingUpdateLineService(true);
      setErrorAddLineRequest("");
      const token = localStorage.getItem("token");
      //const token = localStorage.getItem("sadasdasd12312");

      const response = await fetch(process.env.NEXT_PUBLIC_ADD_BUDGETLINE_URL, {
        method: "POST",
        body: JSON.stringify(newBudgetLine),
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const responseData = await response.json();
        throw {
          message: responseData.message || "Error al crear linea de servicio",
          messageinfo: responseData.messageinfo || "Detalles no disponibles",
        };
      }

      const data = await response.json();

      //Si sale todo bien, agrego la linea de servicios al estado q las lleva

      setBudgetLines((prevState) => [...prevState, data.messageinfo]);
    } catch (error) {
      setErrorAddLineRequest({
        message: error.message || "Error desconocido",
        messageinfo: error.messageinfo || "Detalles no disponibles",
      });
    } finally {
      setisLoadingUpdateLineService(false);
    }
  };

  const updateQuantity = async (budgetLineId, newQuantity) => {
    try {
      setisLoadingUpdateLineService(true);
      setErrorUpdateQuantityLineRequest("");

      const token = localStorage.getItem("token");
      //const token = localStorage.getItem("sadasdasd12312");

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_UPDATE_BUDGETLINE_URL.replace(
          ":budgetId",
          budgetData.budget._id
        ).replace(":lineId", budgetLineId)}`,
        {
          method: "PUT",
          body: JSON.stringify({ quantity: newQuantity }),
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        const responseData = await response.json();
        throw {
          message:
            responseData.message ||
            "Error al modificar la cantidad de la linea de servicio",
          messageinfo: responseData.messageinfo || "Detalles no disponibles",
        };
      }

      //const data = await response.json();
      //Si sale todo bien, piso la linea con la nueva linea q viene actualizada

      const data = await response.json();

      setBudgetLines((prevState) =>
        prevState.map(
          (budgetLine) =>
            budgetLine._id === budgetLineId
              ? data.messageinfo // Reemplaza el objeto con el nuevo objeto
              : budgetLine // Devuelve el objeto sin cambios si no coincide
        )
      );
    } catch (error) {
      setErrorUpdateQuantityLineRequest({
        message: error.message || "Error desconocido",
        messageinfo: error.messageinfo || "Detalles no disponibles",
      });
    } finally {
      setisLoadingUpdateLineService(false);
    }
  };

  const deleteBudgetLine = async (budgetLineId) => {
    try {
      setisLoadingUpdateLineService(true);
      setErrorDeleteLineRequest("");

      const token = localStorage.getItem("token");
      //const token = localStorage.getItem("sadasdasd12312");

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_DELETE_BUDGETLINE_URL.replace(
          ":budgetId",
          budgetData.budget._id
        ).replace(":lineId", budgetLineId)}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        const responseData = await response.json();
        throw {
          message:
            responseData.message || "Error al eliminar linea de servicio",
          messageinfo: responseData.messageinfo || "Detalles no disponibles",
        };
      }

      //const data = await response.json();

      //Si sale todo bien, elimino la linea de servicios al estado q las lleva

      setBudgetLines((prevState) =>
        prevState.filter((budgetLine) => budgetLine._id !== budgetLineId)
      );
    } catch (error) {
      setErrorDeleteLineRequest({
        message: error.message || "Error desconocido",
        messageinfo: error.messageinfo || "Detalles no disponibles",
      });
    } finally {
      setisLoadingUpdateLineService(false);
    }
  };

  const [errorGenerateReport, setErrorGenerateReport] = useState("");
  const [isLoadingReport, setIsLoadingReport] = useState(false);

  const handleReport = async (budgetId) => {
    try {
      setIsLoadingReport(true);
      setErrorGenerateReport("");

      const token = localStorage.getItem("token");

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_GENERATE_BUDGET_REPORT_URL.replace(
          ":budgetId",
          budgetData.budget._id
        )}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json", // Omitir este header, ya que no es necesario para descargar archivos.
          },
        }
      );

      if (!response.ok) {
        throw {
          message: "Error al generar reporte",
        };
      }

      // Convertir la respuesta a un Blob (representación binaria del PDF)
      const blob = await response.blob();

      // Obtengo el nombre desde el encabezado Content-Disposition
      const contentDisposition = response.headers.get("Content-Disposition");
      console.log("CONTENT: ", contentDisposition);
      let fileName = "budget.pdf"; // En caso que no este, le asigno uno x defecto.

      if (contentDisposition) {
        const match = contentDisposition.match(/filename="?(.+)"?/);
        if (match && match[1]) {
          fileName = match[1];
        }
      }

      // Crear un URL temporario para el Blob
      const url = window.URL.createObjectURL(blob);

      // Crear un enlace temporal para descargar el PDF
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", fileName); // Nombre del archivo
      document.body.appendChild(link);
      link.click();

      // Remover el enlace después de la descarga
      link.parentNode.removeChild(link);
    } catch (error) {
      setErrorGenerateReport({
        message: error.message || "Error desconocido",
      });
    } finally {
      setIsLoadingReport(false);
    }
  };

  //Todos los otros carteles de exito estan a 5px del titulo. Este mide 56px de ancho entonces se sube 56 + 5 = 61.
  return (
    <Fragment>
      <div className=" absolute top-12 left-1/2 transform -translate-x-1/2  z-40 bg-gray-100 rounded-[8px] border border-solid border-grayBorder w-[600px] ">
        {budgetCtx.successUpdateBuilding && (
          <div
            className=" flex h-[56px] w-full   items-center rounded-xl border-[2px] border-l-[12px] border-solid border-greenBorder bg-white px-[18px] pb-[18px] pt-[14px] font-sans text-[14px] text-blackText absolute left-0 top-[-61px]
           "
          >
            <FaCheckCircle className="mr-1.5  align-top text-[18px] text-greenText"></FaCheckCircle>
            Obra actualizada.
          </div>
        )}

        {budgetCtx.errorUpdateBuilding && (
          <div
            className=" flex h-20 w-full   rounded-xl border border-red5 bg-white p-4 ring-4 ring-inset 	
          ring-red2 ring-opacity-20 absolute left-0 top-[-85px]"
          >
            <HiOutlineExclamationTriangle className="mr-4  align-top text-[30px] text-red5"></HiOutlineExclamationTriangle>
            <div className="flex flex-col justify-center font-sans    ">
              <h1 className="text-lg  text-red5 ">
                {budgetCtx.errorUpdateBuilding.message}
              </h1>
              <h2 className="  text-xs text-blackText ">
                {budgetCtx.errorUpdateBuilding.messageinfo}
              </h2>
            </div>
          </div>
        )}

        {budgetCtx.successUpdateBudgetStatus && (
          <div
            className=" flex h-[56px] w-full   items-center rounded-xl border-[2px] border-l-[12px] border-solid border-greenBorder bg-white px-[18px] pb-[18px] pt-[14px] font-sans text-[14px] text-blackText absolute left-0 top-[-61px]
           "
          >
            <FaCheckCircle className="mr-1.5  align-top text-[18px] text-greenText"></FaCheckCircle>
            Estado actualizado.
          </div>
        )}

        {budgetCtx.errorUpdateBudgetStatus && (
          <div
            className=" flex h-20 w-full   rounded-xl border border-red5 bg-white p-4 ring-4 ring-inset 	
          ring-red2 ring-opacity-20 absolute left-0 top-[-85px]"
          >
            <HiOutlineExclamationTriangle className="mr-4  align-top text-[30px] text-red5"></HiOutlineExclamationTriangle>
            <div className="flex flex-col justify-center font-sans    ">
              <h1 className="text-lg  text-red5 ">
                {budgetCtx.errorUpdateBudgetStatus.message}
              </h1>
              <h2 className="  text-xs text-blackText ">
                {budgetCtx.errorUpdateBudgetStatus.messageinfo}
              </h2>
            </div>
          </div>
        )}

        {budgetCtx.successUpdateBudgetDate && (
          <div
            className=" flex h-[56px] w-full   items-center rounded-xl border-[2px] border-l-[12px] border-solid border-greenBorder bg-white px-[18px] pb-[18px] pt-[14px] font-sans text-[14px] text-blackText absolute left-0 top-[-61px]
           "
          >
            <FaCheckCircle className="mr-1.5  align-top text-[18px] text-greenText"></FaCheckCircle>
            Fecha actualizada.
          </div>
        )}

        {budgetCtx.errorUpdateBudgetDate && (
          <div
            className=" flex h-20 w-full   rounded-xl border border-red5 bg-white p-4 ring-4 ring-inset 	
          ring-red2 ring-opacity-20 absolute left-0 top-[-85px]"
          >
            <HiOutlineExclamationTriangle className="mr-4  align-top text-[30px] text-red5"></HiOutlineExclamationTriangle>
            <div className="flex flex-col justify-center font-sans    ">
              <h1 className="text-lg  text-red5 ">
                {budgetCtx.errorUpdateBudgetDate.message}
              </h1>
              <h2 className="  text-xs text-blackText ">
                {budgetCtx.errorUpdateBudgetDate.messageinfo}
              </h2>
            </div>
          </div>
        )}

        {isLoading && (
          <div className="h-[346px] justify-center items-center flex w-full  ">
            <Loader></Loader>
          </div>
        )}

        {errorRequest && (
          <div className=" h-[346px] justify-center items-center flex w-full flex-col ">
            <p>{errorRequest.message}</p>
            <small>{errorRequest.messageinfo}</small>
          </div>
        )}

        {/* Los datos del presupuesto se renderizan solamente si la request que carga los datos es correcta */}

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
                <div className="pl-6 mb-[12px] w-[49%] ">
                  <label htmlFor="date" className="text-sm font-bold block">
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
                    onChange={(e) => handleDateChange(e.target.value)}
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
                    <div className="flex flex-col justify-center items-center h-auto border   border-gray-500 rounded-md">
                      <p>{buildingCtx.error.message}</p>
                      <small>{buildingCtx.error.messageinfo}</small>
                    </div>
                  )}

                  {!buildingCtx.error && !buildingCtx.isLoading && (
                    <ReactSelect
                      options={buildingOptions}
                      onChange={(selectedOption) =>
                        handleBuildingChange(selectedOption.value)
                      }
                      defaultValue={defaultBuilding}
                      menuPlacement="auto"
                      isDisabled={budgetCtx.isLoadingUpdateBuilding}
                      styles={{
                        control: (provided, state) => ({
                          ...provided,
                          width: "100%", // Asegura que el select ocupe el ancho total del contenedor
                          border: state.isFocused
                            ? "1px solid #0092f3" // Borde azul al estar seleccionado
                            : "1px solid #6b7280", // Borde gris por defecto
                          boxShadow: state.isFocused
                            ? "0 0 0 3px #79c5f8" // Ring azul personalizado al enfocar
                            : null,
                          "&:hover": {
                            border: state.isFocused
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
                          backgroundColor: state.isSelected
                            ? "#0071bb"
                            : "white",
                          "&:hover": {
                            backgroundColor: state.isFocused
                              ? "#79c5f8"
                              : " #white",
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
                <div className="mb-4 w-[49%]">
                  <label htmlFor="state" className="mb-[4px] font-bold">
                    Estado
                  </label>

                  <ReactSelect
                    options={stateOptions}
                    defaultValue={defaultStatus}
                    onChange={(selectedOption) =>
                      handleStatusChange(selectedOption.value)
                    }
                    menuPlacement="auto"
                    isDisabled={budgetCtx.isLoadingUpdateBudgetStatus}
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
                          backgroundColor: state.isFocused
                            ? "#79c5f8"
                            : " #white",
                        },
                      }),
                      singleValue: (provided, state) => ({
                        ...provided,
                        color: "#0F1111",
                      }),
                    }}
                  />
                </div>
              </li>
              <div className="h-[1px] bg-[#d5d9d9] w-full mb-[16px]"></div>

              {/* ACA EMPIEZA LO DE SERVICIOS  */}
              {/* El div que contiene todo va a renderizar: 
                  1) La rueda de cargando que es cuando se agrega una linea, se elimina una linea o se agrega una cantidad, cualquiera de las 3 request activan la misma variable loding
                  2) Si no hay nada cargando, se muestra la lista de servicios agregados y la lista de servicios para agregar */}
              <div>
                {isLoadingUpdateLineService && (
                  // Le doy una altura de 130 al div del loader de manera tal que sea similar a cuando no hay servicios registrados
                  <div
                    className={`w-full flex justify-center items-center ${
                      budgetLines.length === 2
                        ? "h-[249px]"
                        : budgetLines.length === 1
                        ? "h-[218px]"
                        : budgetLines.length === 3
                        ? "h-[280px]"
                        : budgetLines.length >= 4
                        ? "h-[285px]"
                        : "h-[200px]"
                    }`}
                  >
                    <Loader></Loader>
                  </div>
                )}

                {!isLoadingUpdateLineService && (
                  <Fragment>
                    <div className="mb-4 w-full px-6 ">
                      <label
                        htmlFor="addService"
                        className="text-sm font-bold block"
                      >
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
                              boxShadow: state.isFocused
                                ? "0 0 0 3px #79c5f8"
                                : null,
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
                              backgroundColor: state.isSelected
                                ? "#0071bb"
                                : "white",
                              "&:hover": {
                                backgroundColor: state.isFocused
                                  ? "#79c5f8"
                                  : " #white",
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
                    <div className="mb-4 w-full px-6">
                      <h4 className="text-base font-bold block">
                        Servicios Seleccionados:
                      </h4>
                      {budgetLines.length === 0 && (
                        <span className="text-sm flex justify-center">
                          Aún no has selecionado ningún servicio.
                        </span>
                      )}

                      {budgetLines.length !== 0 && (
                        <ul className="overflow-y-auto max-h-[140px] text-sm border border-grayBorder rounded-[8px]  ">
                          <li className="flex w-full font-semibold text-center items-center border-b border-b-grayBorder">
                            <span className="w-[35%]">Nombre</span>
                            <span className="w-[15%]">Unidad de medida</span>
                            <span className="w-[15%]">Precio unitario</span>
                            <span className="w-[15%]">Cantidad</span>
                            <span className="w-[15%]">Total linea</span>
                          </li>
                          {budgetLines
                            .sort((a, b) => a.line_no - b.line_no) //Forma ascendenete en funcion a line_no
                            .map((budgetLine, index) => (
                              <li
                                key={budgetLine._id}
                                className={`flex  items-center py-1 px-1 text-center  ${
                                  index !== budgetLines.length - 1
                                    ? "border-b border-b-grayBorder"
                                    : ""
                                }`}
                              >
                                <span className="w-[35%]  h-auto break-words overflow-wrap-anywhere   ">
                                  {budgetLine.service_name}
                                </span>
                                <span className="w-[15%] h-auto break-words overflow-wrap-anywhere ">
                                  {budgetLine.measure_unit_name}
                                </span>
                                <span className="w-[15%] h-auto break-words overflow-wrap-anywhere">
                                  ${budgetLine.price}
                                </span>
                                {/* Contador para cantidad */}
                                <div className="w-[15%] h-auto break-words overflow-wrap-anywhere">
                                  <input
                                    type="number"
                                    value={budgetLine.quantity || 1} //El value esta atado al valor q tenga en el estado. Si la actualizacion falla, se mantiene el vlaor q tiene el estado y no el q ingreso el ususario
                                    min="1"
                                    onChange={(e) =>
                                      updateQuantity(
                                        budgetLine._id,
                                        parseInt(e.target.value)
                                      )
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
                                  ${budgetLine.amount}
                                </span>

                                <div className="w-[5%] flex items-center justify-center">
                                  <button
                                    type="button"
                                    className="text-red4 hover:text-darkred"
                                    onClick={
                                      () => deleteBudgetLine(budgetLine._id) //Cuando voy a borrar una linea de servicio, le paso el id del budgetLine
                                    }
                                  >
                                    <FaTrashAlt></FaTrashAlt>
                                  </button>
                                </div>
                              </li>
                            ))}
                        </ul>
                      )}

                      {/* Campo TOTAL general */}

                      {budgetLines.length !== 0 && (
                        <div className="flex justify-end mt-2 text-lg font-bold truncate">
                          <span>TOTAL: ${total()}</span>
                        </div>
                      )}
                    </div>
                  </Fragment>
                )}
              </div>

              <div className="h-[1px] bg-[#d5d9d9] w-full mb-[16px]"></div>

              <li className=" px-[23px] mb-[3px] ">
                <div className="flex items-center justify-between ">
                  <div className="flex items-center justify-center h-[40px] relative">
                    {isLoadingReport && (
                      <div className="w-[102px] flex justify-center items-center">
                        <Loader></Loader>
                      </div>
                    )}

                    {errorGenerateReport && (
                      <h1 className="text-xs  text-red5 absolute bottom-[-11px] whitespace-nowrap  ">
                        {errorGenerateReport.message}
                      </h1>
                    )}

                    {!isLoadingReport && (
                      <button
                        className=" flex h-[36px] w-[102px] text-sm items-center  font-sans text-[13px]  cursor-pointer  text-white  p-2 rounded-[8px] border border-solid border-white bg-darkblue  ring-blue5  hover:bg-opacity-90 active:border active:border-blue6 active:outline-none active:ring justify-center"
                        onClick={handleReport}
                      >
                        Imprimir
                      </button>
                    )}
                  </div>
                  <div className="flex">
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
