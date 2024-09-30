import { useState, useContext } from "react";
import ServiceDetail from "./ServiceDetail";
import ServiceContext from "@/store/ServiceContext";
import { FaCheckCircle } from "react-icons/fa";
import CategoryContext from "@/store/CategoryContext";

const ServiceList = (props) => {
  const [service, setService] = useState(null);
  const [showService, setShowService] = useState(false);
  const [showBackgroundService, setShowBackgroundService] = useState(false);
  const [showAccept, setShowAccept] = useState(false);

  const serviceCtx = useContext(ServiceContext);
  const categoryCtx = useContext(CategoryContext);

  const handleClick = (service) => {
    setService(service); // Guardo el cliente seleccionado (sus datos para la planilla)
    setShowService(true); // Muestro la planilla con los datos del cliente
    setShowBackgroundService(true); //Muestro el fondo negro
  };

  //Saca tanto planilla como modal. Agrege tambien el boton de aceptar que lo ponga en falso x mas que en la mayoria de los casos que se activa esto el boton no esta presente, pero es necesario solamente para el caso donde esta el fondo activado y el boton de aceptar.
  const handleClickHideServiceBoth = () => {
    setShowService(false);
    setShowBackgroundService(false);
    setShowAccept(false);
  };

  //Saca solo la planilla
  const handleClickHideServiceBackground = () => {
    setShowService(false);
    setShowAccept(true);
  };

  //Saca el cartel de aceptar y el fondo negro
  const handleClickAccept = () => {
    setShowBackgroundService(false);
    setShowAccept(false);
  };

  const Services = serviceCtx.items;
  const Categories = categoryCtx.items;

  //const Services = [];

  if (Services.length === 0) {
    return (
      <div className="font-sans text-blackText h-[420px] flex justify-center items-center font-medium">
        No tienes Services aún.
      </div>
    );
  }

  //Le digo que directamente mida 420 cosa de que si hay menos de 10 elementos, el tamanio sea el mismo y todos los carteles q se ubican relativamente a esto no tengan drama xq sino empeizan a aparecer en funcion de la cantidad de elementos q hay
  return (
    <div>
      <ul className="h-[420px] overflow-y-auto font-sans text-blackText">
        {Services.map((service, index) => {
          // Buscar el nombre de la categoría que coincide con el ID del service. ?. para acceder al name en caso que no se encuentre coincidencia o no tenga propiedad name,dara undefined. Para estos casos usamos el condicional ||
          const categoryName =
            Categories.find((category) => category.id === service.categoria)
              ?.name || "Categoría desconocida";

          return (
            <li
              key={service.id}
              onClick={() => handleClick(service)}
              className={`py-2 px-2 cursor-pointer hover:bg-grayBg2 hover:bg-opacity-70 ${
                index !== Services.length - 1
                  ? "border-b border-b-grayBorder"
                  : "border-b border-b-grayBorder"
              }`}
            >
              <strong>{service.nombre}</strong> - {categoryName}
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

      {/*Va a estar con respecto al contenedor en Service que es Relativo, no lo dejo esto en Service Detail porque cuando se cierra la planilla de detalle el componente deja de renderizarse */}
      {showAccept && (
        <div
          className=" flex flex-col h-[97px] w-[250px]  items-center rounded-xl border-[2px] border-l-[12px] border-solid border-greenBorder bg-white px-[18px]  pt-[14px] font-sans text-[14px] text-blackText z-50 absolute top-2/3 left-1/2 transform -translate-x-1/2  -translate-y-1/2 
           "
        >
          <div className="flex">
            <FaCheckCircle className="mr-1.5  align-top text-[18px] text-greenText"></FaCheckCircle>
            Servicio Eliminado.
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

export default ServiceList;

/*
      {showAccept && (
        <div
          className=" flex flex-col h-[97px] w-[250px]  items-center rounded-xl border-[2px] border-l-[12px] border-solid border-greenBorder bg-white px-[18px]  pt-[14px] font-sans text-[14px] text-blackText z-50 absolute left-0 top-0 
           "
        >
          <div className="flex">
            <FaCheckCircle className="mr-1.5  align-top text-[18px] text-greenText"></FaCheckCircle>
            Servicio Eliminado.
          </div>

          <button
            className=" flex h-[36px] w-[102px] text-sm items-center font-sans text-[13px] cursor-pointer text-gray-700 p-2 rounded-[8px] border border-solid border-gray-500 bg-gray-300 hover:bg-opacity-70 active:border active:border-gray-500 active:outline-none active:ring ring-blue-200  justify-center mt-2"
            onClick={handleConfirmDelete}
          >
            Aceptar
          </button>
        </div>
      )}
*/
