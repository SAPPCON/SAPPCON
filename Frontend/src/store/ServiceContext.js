import React, { useReducer, useEffect, useContext, useState } from "react";

const ServiceContext = React.createContext({
  items: [],
  addItem: (item) => {},
  deleteItem: (id) => {},
});

const defaultServiceState = {
  items: [],
};

// Servicios hardcodeados
const hardcodedServices = [
  {
    id: 1,
    nombre: "Excavación de terreno",
    categoria: 1,
    unidadDeMedida: 1,
    costeUnitario: 150,
    precioUnitario: 200,
    descripcion:
      "Servicio de excavación para nivelación y preparación del terreno. Servicio de excavación para nivelación y preparación del terreno.Servicio de excavación para nivelación y preparación del terreno.Servicio de excavación para nivelación y preparación del terreno.Servicio de excavación para nivelación y preparación del terreno.Servicio de excavación para nivelación y preparación del terreno.Servicio de excavación para nivelación y preparación del terreno.Servicio de excavación para nivelación y preparación del terreno.Servicio de excavación para nivelación y preparación del terreno.",
  },
  {
    id: 2,
    nombre: "Colocación de cimientos",
    categoria: 2,
    unidadDeMedida: 2,
    costeUnitario: 300,
    precioUnitario: 400,
    descripcion: "Instalación de cimientos de concreto para edificaciones.",
  },
  {
    id: 3,
    nombre: "Instalación de andamios",
    categoria: 3,
    unidadDeMedida: 3,
    costeUnitario: 50,
    precioUnitario: 80,
    descripcion: "Montaje de andamios para trabajos en altura en construcción.",
  },
  {
    id: 4,
    nombre: "Encofrado",
    categoria: 4,
    unidadDeMedida: 4,
    costeUnitario: 200,
    precioUnitario: 250,
    descripcion: "Construcción de moldes temporales para vaciado de concreto.",
  },
  {
    id: 5,
    nombre: "Impermeabilización de techos",
    categoria: 5,
    unidadDeMedida: 4,
    costeUnitario: 100,
    precioUnitario: 150,
    descripcion:
      "Aplicación de membranas impermeabilizantes en techos para evitar filtraciones.",
  },
  {
    id: 6,
    nombre: "Pintura de exteriores",
    categoria: 3,
    unidadDeMedida: 1,
    costeUnitario: 30,
    precioUnitario: 60,
    descripcion:
      "Pintura de superficies exteriores con recubrimientos resistentes al clima.",
  },
  {
    id: 7,
    nombre: "Colocación de pisos cerámicos",
    categoria: 2,
    unidadDeMedida: 3,
    costeUnitario: 80,
    precioUnitario: 120,
    descripcion: "Instalación de pisos cerámicos en interiores o exteriores.",
  },
  {
    id: 8,
    nombre: "Electricidad básica",
    categoria: 1,
    unidadDeMedida: 2,
    costeUnitario: 150,
    precioUnitario: 250,
    descripcion:
      "Instalación de puntos eléctricos para sistemas de iluminación y enchufes.",
  },
  {
    id: 9,
    nombre: "Plomería básica",
    categoria: 1,
    unidadDeMedida: 2,
    costeUnitario: 120,
    precioUnitario: 200,
    descripcion: "Instalación de tuberías y accesorios básicos de plomería.",
  },
  {
    id: 10,
    nombre: "Revoque ",
    categoria: 5,
    unidadDeMedida: 1,
    costeUnitario: 70,
    precioUnitario: 100,
    descripcion:
      "Aplicación de revoque para el acabado de superficies de paredes y techos.",
  },
  {
    id: 11,
    nombre: "Revoque fino",
    categoria: 3,
    unidadDeMedida: 4,
    costeUnitario: 70,
    precioUnitario: 100,
    descripcion:
      "Aplicación de revoque para el acabado de superficies de paredes y techos.",
  },
  {
    id: 12,
    nombre: "Revoque medio",
    categoria: 4,
    unidadDeMedida: 2,
    costeUnitario: 70,
    precioUnitario: 100,
    descripcion:
      "Aplicación de revoque para el acabado de superficies de paredes y techos.",
  },
  {
    id: 13,
    nombre: "Revoque grueso",
    categoria: 4,
    unidadDeMedida: 2,
    costeUnitario: 70,
    precioUnitario: 100,
    descripcion:
      "Aplicación de revoque para el acabado de superficies de paredes y techos.",
  },
];

// State es el último estado manejado. Action es determinada por nosotros.
// La función retorna el nuevo y último estado.
const servicesReducer = (state, action) => {
  if (action.type === "LOAD_SERVICES") {
    return {
      items: action.services,
    };
  }

  if (action.type === "SET_ERROR") {
    return {
      ...state,
    };
  }

  if (action.type === "ADD_ITEM") {
    return {
      items: [...state.items, action.item], // Agrega el nuevo servicio
    };
  }

  if (action.type === "DELETE") {
    const updatedItems = state.items.filter((item) => item.id !== action.id);

    return {
      items: updatedItems,
    };
  }

  return defaultServiceState;
};

export const ServiceContextProvider = (props) => {
  const [servicesState, dispatchServicesAction] = useReducer(
    servicesReducer,
    defaultServiceState
  );

  useEffect(() => {
    dispatchServicesAction({
      type: "LOAD_SERVICES",
      services: hardcodedServices,
    });
  }, []); // Se ejecuta solo una vez al montar el componente

  const addItemHandler = (item) => {
    dispatchServicesAction({
      type: "ADD_ITEM",
      item: item, // El servicio a agregar
    });
  };

  const deleteItemHandler = (id) => {
    dispatchServicesAction({ type: "DELETE", id: id });
  };

  const serviceContext = {
    items: servicesState.items,
    addItem: addItemHandler,
    deleteItem: deleteItemHandler,
  };

  return (
    <ServiceContext.Provider value={serviceContext}>
      {props.children}
    </ServiceContext.Provider>
  );
};

export default ServiceContext;
