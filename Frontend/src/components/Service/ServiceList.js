import { useState, useContext } from "react";
import ServiceDetail from "./ServiceDetail";
import ServiceContext from "@/store/ServiceContext";
import { FaCheckCircle } from "react-icons/fa";
import CategoryContext from "@/store/CategoryContext";
import Loader from "../UI/Loader";
import { HiOutlineExclamationTriangle } from "react-icons/hi2";
import PopUpError from "../UI/PopUpError";
import PopUpSuccess from "../UI/PopUpSuccess";

const ServiceList = (props) => {
  const [service, setService] = useState(null);
  const [showService, setShowService] = useState(false);
  const [showBackgroundService, setShowBackgroundService] = useState(false);
  const [showAccept, setShowAccept] = useState(false);

  const { serviceContext: serviceCtx, dispatchServicesAction } =
    useContext(ServiceContext);

  const handleClick = (service) => {
    setService(service); // Guardo el servicio seleccionado (sus datos para la planilla)
    setShowService(true); // Muestro la planilla con los datos del servicio
    setShowBackgroundService(true); //Muestro el fondo negro
  };

  //Saca tanto planilla como modal. Agrege tambien el boton de aceptar que lo ponga en falso x mas que en la mayoria de los casos que se activa esto el boton no esta presente, pero es necesario solamente para el caso donde esta el fondo activado y el boton de aceptar.
  const handleClickHideServiceBoth = () => {
    setShowService(false);
    setShowBackgroundService(false);
    dispatchServicesAction({ type: "SET_RESTART_ALL_DELETE_ITEM" });
    dispatchServicesAction({ type: "SET_RESTART_ALL_UPDATE_CATEGORY" });
    dispatchServicesAction({ type: "SET_RESTART_ALL_UPDATE_MEASUREUNIT" });
  };

  //Saca solo la planilla
  const handleClickHideServiceBackground = () => {
    setShowService(false);
  };

  //Saca el cartel de aceptar y el fondo negro
  const handleClickAccept = () => {
    setShowBackgroundService(false);
    dispatchServicesAction({ type: "SET_RESTART_ALL_DELETE_ITEM" });
  };

  const Services = serviceCtx.items;

  if (
    Services.length === 0 &&
    !serviceCtx.error &&
    !serviceCtx.errorDeleteItem &&
    !serviceCtx.successDeleteItem
  ) {
    return (
      <div className="font-sans text-blackText h-[420px] flex justify-center items-center font-medium">
        No tienes servicios aún.
      </div>
    );
  }

  //Le digo que directamente mida 420 cosa de que si hay menos de 10 elementos, el tamanio sea el mismo y todos los carteles q se ubican relativamente a esto no tengan drama xq sino empeizan a aparecer en funcion de la cantidad de elementos q hay
  return (
    <div>
      <ul className="h-[420px] overflow-y-auto font-sans text-blackText">
        {serviceCtx.isLoading && (
          <div className="justify-center items-center flex w-full h-full ">
            <Loader></Loader>
          </div>
        )}
        {serviceCtx.error && (
          <div className="h-full justify-center flex flex-col items-center">
            <p>{serviceCtx.error.message}</p>
            <small>{serviceCtx.error.messageinfo}</small>
          </div>
        )}

        {!serviceCtx.error &&
          !serviceCtx.isLoading &&
          Services.map((service, index) => {
            return (
              <li
                key={service._id}
                onClick={() => handleClick(service)}
                className={`py-2 px-2 cursor-pointer hover:bg-grayBg2 hover:bg-opacity-70 ${
                  index !== Services.length - 1
                    ? "border-b border-b-grayBorder"
                    : "border-b border-b-grayBorder"
                }`}
              >
                <strong>{service.name}</strong>
              </li>
            );
          })}
      </ul>

      {showService && service && (
        <ServiceDetail
          serviceData={service}
          hideServiceFunctionBoth={handleClickHideServiceBoth}
          hideServiceFunctionBackground={handleClickHideServiceBackground}
        ></ServiceDetail>
      )}

      {showBackgroundService && (
        <div
          onClick={handleClickHideServiceBoth}
          className=" fixed top-0 left-0 z-30  h-full  w-full  bg-black opacity-80  transition-opacity duration-1000"
        ></div>
      )}

      {/*El aceptar: va a estar con respecto al contenedor en Service que es Relativo, no lo dejo esto en Service Detail porque cuando se cierra la planilla de detalle el componente deja de renderizarse */}

      {serviceCtx.successDeleteItem && !serviceCtx.errorDeleteItem && (
        <PopUpSuccess
          message="Servicio Eliminado."
          onAccept={handleClickAccept}
          icon={FaCheckCircle}
        />
      )}

      {!serviceCtx.successDeleteItem && serviceCtx.errorDeleteItem && (
        <PopUpError
          message={serviceCtx.errorDeleteItem.message}
          messageinfo={serviceCtx.errorDeleteItem.messageinfo}
          onAccept={handleClickAccept}
          icon={HiOutlineExclamationTriangle}
        />
      )}
    </div>
  );
};

export default ServiceList;
