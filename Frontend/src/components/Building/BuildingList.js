import { useState } from "react";
import BuildingDetail from "./BuildingDetail";

const BuildingList = (props) => {
  const [building, setBuilding] = useState(null);
  const [showBuilding, setShowBuilding] = useState(false);

  const handleClick = (building) => {
    setBuilding(building);
    setShowBuilding(true);
  };

  const handleClickHideBuilding = () => {
    setShowBuilding(false);
  };

  const Obras = [
    {
      id: 1,
      nombre: "Proyecto de Vivienda A",
      cliente: "Cliente A",
      estadoInicial: "iniciado",
      direccion: "Calle Falsa 123, Ciudad",
      descripcion: "Proyecto de construcción de vivienda unifamiliar.",
    },
    {
      id: 2,
      nombre: "Ampliación Casa B",
      cliente: "Cliente B",
      estadoInicial: "en proceso",
      direccion: "Avenida Siempre Viva 456, Ciudad",
      descripcion: "Ampliación de una casa existente.",
    },
    {
      id: 3,
      nombre: "Edificio de Oficinas C",
      cliente: "Cliente C",
      estadoInicial: "finalizado",
      direccion: "Boulevard de los Sueños 789, Ciudad",
      descripcion: "Construcción de un edificio de oficinas.",
    },
    {
      id: 4,
      nombre: "Rehabilitación Parque D",
      cliente: "Cliente D",
      estadoInicial: "iniciado",
      direccion: "Calle 7, Sector 3, Ciudad",
      descripcion: "Rehabilitación de un parque.",
    },
    {
      id: 5,
      nombre: "Sistema de Riego E",
      cliente: "Cliente E",
      estadoInicial: "en proceso",
      direccion: "Avenida del Sol 101, Ciudad",
      descripcion: "Instalación de un sistema de riego en jardines.",
    },
    {
      id: 6,
      nombre: "Renovación Plaza F",
      cliente: "Cliente F",
      estadoInicial: "finalizado",
      direccion: "Calle de la Paz 202, Ciudad",
      descripcion: "Renovación de una plaza pública.",
    },
    {
      id: 7,
      nombre: "Centro Comercial G",
      cliente: "Cliente G",
      estadoInicial: "iniciado",
      direccion: "Calle Nueva 303, Ciudad",
      descripcion: "Construcción de un centro comercial.",
    },
    {
      id: 8,
      nombre: "Paneles Solares H",
      cliente: "Cliente H",
      estadoInicial: "en proceso",
      direccion: "Avenida Libertad 404, Ciudad",
      descripcion: "Instalación de paneles solares.",
    },
    {
      id: 9,
      nombre: "Construcción de Piscina I",
      cliente: "Cliente I",
      estadoInicial: "finalizado",
      direccion: "Calle del Mar 505, Ciudad",
      descripcion: "Construcción de una piscina.",
    },
    {
      id: 10,
      nombre: "Gimnasio J",
      cliente: "Cliente J",
      estadoInicial: "iniciado",
      direccion: "Calle Verde 606, Ciudad",
      descripcion: "Construcción de un gimnasio.",
    },
    {
      id: 11,
      nombre: "Gimnasio God",
      cliente: "Cliente J",
      estadoInicial: "iniciado",
      direccion: "Calle Verde 606, Ciudad",
      descripcion: "Construcción de un gimnasio.",
    },
  ];

  //const Obras = [];

  if (Obras.length === 0) {
    return (
      <div className="font-sans text-blackText h-[420px] flex justify-center items-center font-medium">
        No tienes obras aún.
      </div>
    );
  }

  return (
    <div>
      <ul className="max-h-[420px] overflow-y-auto font-sans text-blackText ">
        {Obras.map((obra, index) => (
          <li
            key={obra.id}
            onClick={() => handleClick(obra)}
            className={`py-2 px-2 cursor-pointer hover:bg-grayBg2 hover:bg-opacity-70  ${
              index !== Obras.length - 1 ? "border-b border-b-grayBorder" : ""
            }`}
          >
            <strong>{obra.nombre}</strong> - {obra.estadoInicial}
          </li>
        ))}
      </ul>

      {showBuilding && building && (
        <BuildingDetail
          buildingData={building}
          hideBuildingFunction={handleClickHideBuilding}
        ></BuildingDetail>
      )}

      {showBuilding && (
        <div
          onClick={handleClickHideBuilding}
          className=" fixed top-0 left-0 z-30  h-full  w-full  bg-black opacity-80  transition-opacity duration-1000"
        ></div>
      )}
    </div>
  );
};

export default BuildingList;
