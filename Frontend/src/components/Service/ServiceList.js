import { useState, useContext } from "react";
import ServiceDetail from "./ServiceDetail";
import ServiceContext from "@/store/ServiceContext";
import { FaCheckCircle } from "react-icons/fa";
import Loader from "../UI/Loader";
import { HiOutlineExclamationTriangle } from "react-icons/hi2";
import PopUpError from "../UI/PopUpError";
import PopUpSuccess from "../UI/PopUpSuccess";

const ServiceList = ({ filterText }) => {
  const [service, setService] = useState(null);
  const [showService, setShowService] = useState(false);
  const [showBackgroundService, setShowBackgroundService] = useState(false);

  const { serviceContext: serviceCtx, dispatchServicesAction } =
    useContext(ServiceContext);

  const handleClick = (service) => {
    setService(service);
    setShowService(true);
    setShowBackgroundService(true);
  };

  const handleClickHideServiceBoth = () => {
    setShowService(false);
    setShowBackgroundService(false);
    dispatchServicesAction({ type: "SET_RESTART_ALL_DELETE_ITEM" });
    dispatchServicesAction({ type: "SET_RESTART_ALL_UPDATE_CATEGORY" });
    dispatchServicesAction({ type: "SET_RESTART_ALL_UPDATE_MEASUREUNIT" });
  };

  const handleClickHideServiceBackground = () => {
    setShowService(false);
  };

  const handleClickAccept = () => {
    setShowBackgroundService(false);
    dispatchServicesAction({ type: "SET_RESTART_ALL_DELETE_ITEM" });
  };

  const Services = serviceCtx.items;

  const filteredServices = Services.filter((service) =>
    service.name.toLowerCase().includes(filterText)
  );

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
          (filteredServices.length > 0 ? (
            filteredServices.map((service, index) => (
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
            ))
          ) : (
            <li className="font-sans text-blackText font-medium flex justify-center items-center h-full w-full">
              No hay coincidencias con el filtro.
            </li>
          ))}
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
