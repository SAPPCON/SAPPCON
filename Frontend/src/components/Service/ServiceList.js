import { useState } from "react";
import ServiceDetail from "./ServiceDetail";

const ServiceList = (props) => {
  const [service, setService] = useState(null);
  const [showService, setShowService] = useState(false);

  const handleClick = (service) => {
    setService(service); // Guardo el cliente seleccionado (sus datos para la planilla)
    setShowService(true); // Muestro la planilla con los datos del cliente
  };

  const handleClickHideService = () => {
    setShowService(false);
  };

  const Servicios = [
    {
      id: 1,
      nombre: "Excavación de terreno",
      categoria: "Movimiento de tierras",
      unidadDeMedida: "m³",
      costeUnitario: 150,
      precioUnitario: 200,
      descripcion:
        "Servicio de excavación para nivelación y preparación del terreno. Servicio de excavación para nivelación y preparación del terreno.Servicio de excavación para nivelación y preparación del terreno.Servicio de excavación para nivelación y preparación del terreno.Servicio de excavación para nivelación y preparación del terreno.Servicio de excavación para nivelación y preparación del terreno.Servicio de excavación para nivelación y preparación del terreno.Servicio de excavación para nivelación y preparación del terreno.Servicio de excavación para nivelación y preparación del terreno.",
    },
    {
      id: 2,
      nombre: "Colocación de cimientos",
      categoria: "Estructura",
      unidadDeMedida: "m²",
      costeUnitario: 300,
      precioUnitario: 400,
      descripcion: "Instalación de cimientos de concreto para edificaciones.",
    },
    {
      id: 3,
      nombre: "Instalación de andamios",
      categoria: "Obra gruesa",
      unidadDeMedida: "día",
      costeUnitario: 50,
      precioUnitario: 80,
      descripcion:
        "Montaje de andamios para trabajos en altura en construcción.",
    },
    {
      id: 4,
      nombre: "Encofrado",
      categoria: "Estructura",
      unidadDeMedida: "m²",
      costeUnitario: 200,
      precioUnitario: 250,
      descripcion:
        "Construcción de moldes temporales para vaciado de concreto.",
    },
    {
      id: 5,
      nombre: "Impermeabilización de techos",
      categoria: "Acabados",
      unidadDeMedida: "m²",
      costeUnitario: 100,
      precioUnitario: 150,
      descripcion:
        "Aplicación de membranas impermeabilizantes en techos para evitar filtraciones.",
    },
    {
      id: 6,
      nombre: "Pintura de exteriores",
      categoria: "Acabados",
      unidadDeMedida: "m²",
      costeUnitario: 30,
      precioUnitario: 60,
      descripcion:
        "Pintura de superficies exteriores con recubrimientos resistentes al clima.",
    },
    {
      id: 7,
      nombre: "Colocación de pisos cerámicos",
      categoria: "Acabados",
      unidadDeMedida: "m²",
      costeUnitario: 80,
      precioUnitario: 120,
      descripcion: "Instalación de pisos cerámicos en interiores o exteriores.",
    },
    {
      id: 8,
      nombre: "Electricidad básica",
      categoria: "Instalaciones",
      unidadDeMedida: "punto",
      costeUnitario: 150,
      precioUnitario: 250,
      descripcion:
        "Instalación de puntos eléctricos para sistemas de iluminación y enchufes.",
    },
    {
      id: 9,
      nombre: "Plomería básica",
      categoria: "Instalaciones",
      unidadDeMedida: "punto",
      costeUnitario: 120,
      precioUnitario: 200,
      descripcion: "Instalación de tuberías y accesorios básicos de plomería.",
    },
    {
      id: 10,
      nombre: "Revoque fino",
      categoria: "Obra gruesa",
      unidadDeMedida: "m²",
      costeUnitario: 70,
      precioUnitario: 100,
      descripcion:
        "Aplicación de revoque para el acabado de superficies de paredes y techos.",
    },
    {
      id: 7,
      nombre: "Colocación de pisos azulejos",
      categoria: "Acabados",
      unidadDeMedida: "m²",
      costeUnitario: 80,
      precioUnitario: 120,
      descripcion: "Instalación de pisos azulejos en interiores o exteriores.",
    },
  ];

  //const Clientes = [];

  if (Servicios.length === 0) {
    return (
      <div className="font-sans text-blackText h-[420px] flex justify-center items-center font-medium">
        No tienes servicios aún.
      </div>
    );
  }

  return (
    <div>
      <ul className="max-h-[420px] overflow-y-auto font-sans text-blackText ">
        {Servicios.map((servicio, index) => (
          <li
            key={servicio.id}
            onClick={() => handleClick(servicio)}
            className={`py-2 px-2 cursor-pointer hover:bg-grayBg2 hover:bg-opacity-70  ${
              index !== Servicios.length - 1
                ? "border-b border-b-grayBorder"
                : ""
            }`}
          >
            <strong>{servicio.nombre}</strong> - {servicio.categoria}
          </li>
        ))}
      </ul>

      {showService && service && (
        <ServiceDetail
          serviceData={service}
          hideServiceFunction={handleClickHideService}
        ></ServiceDetail>
      )}

      {showService && (
        <div
          onClick={handleClickHideService}
          className=" fixed top-0 left-0 z-30  h-full  w-full  bg-black opacity-80  transition-opacity duration-1000"
        ></div>
      )}
    </div>
  );
};

export default ServiceList;
