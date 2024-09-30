import { useState } from "react";
import BudgetDetail from "./BudgetDetail";

const BudgetList = (props) => {
  const [budget, setBudget] = useState(null);
  const [showBudget, setShowBudget] = useState(false);

  const handleClick = (budget) => {
    setBudget(budget);
    setShowBudget(true);
  };

  const handleClickHideBudget = () => {
    setShowBudget(false);
  };

  const Presupuestos = [
    {
      id: 1,
      cliente: "Cliente A",
      obra: "Proyecto de Vivienda A",
      estadoActual: "iniciado",
      listadoDeServicios: ["Servicio1", "Servicio2", "Servicio3"],
    },
    {
      id: 2,
      cliente: "Cliente B",
      obra: "Ampliación Casa B",
      estadoActual: "en proceso",
      listadoDeServicios: ["Servicio1", "Servicio2"],
    },
    {
      id: 3,
      cliente: "Cliente C",
      obra: "Edificio de Oficinas C",
      estadoActual: "finalizado",
      listadoDeServicios: ["Servicio1", "Servicio2", "Servicio3"],
    },
    {
      id: 4,
      cliente: "Cliente D",
      obra: "Rehabilitación Parque D",
      estadoActual: "iniciado",
      listadoDeServicios: ["Servicio1", "Servicio2"],
    },
    {
      id: 5,
      cliente: "Cliente E",
      obra: "Sistema de Riego E",
      estadoActual: "en proceso",
      listadoDeServicios: ["Servicio1", "Servicio2", "Servicio3"],
    },
    {
      id: 6,
      cliente: "Cliente F",
      obra: "Renovación Plaza F",
      estadoActual: "finalizado",
      listadoDeServicios: ["Servicio1", "Servicio2"],
    },
    {
      id: 7,
      cliente: "Cliente G",
      obra: "Centro Comercial G",
      estadoActual: "iniciado",
      listadoDeServicios: ["Servicio1", "Servicio2", "Servicio3"],
    },
    {
      id: 8,
      cliente: "Cliente H",
      obra: "Paneles Solares H",
      estadoActual: "en proceso",
      listadoDeServicios: ["Servicio1", "Servicio2"],
    },
    {
      id: 9,
      cliente: "Cliente I",
      obra: "Construcción de Piscina I",
      estadoActual: "finalizado",
      listadoDeServicios: ["Servicio1", "Servicio2", "Servicio3"],
    },
    {
      id: 10,
      cliente: "Cliente J",
      obra: "Gimnasio J",
      estadoActual: "iniciado",
      listadoDeServicios: ["Servicio1", "Servicio2"],
    },
    {
      id: 11,
      cliente: "Cliente J",
      obra: "Gimnasio God",
      estadoActual: "iniciado",
      listadoDeServicios: ["Servicio1", "Servicio2", "Servicio3"],
    },
  ];

  //const Presupuestos = [];

  if (Presupuestos.length === 0) {
    return (
      <div className="font-sans text-blackText h-[420px] flex justify-center items-center font-medium">
        No tienes presupuestos aún.
      </div>
    );
  }

  return (
    <div>
      <ul className="max-h-[420px] overflow-y-auto font-sans text-blackText  ">
        {Presupuestos.map((presupuesto, index) => (
          <li
            key={presupuesto.id}
            onClick={() => handleClick(presupuesto)}
            className={`py-2 px-2 cursor-pointer hover:bg-grayBg2 hover:bg-opacity-70   ${
              index !== Presupuestos.length - 1
                ? "border-b border-b-grayBorder"
                : ""
            }`}
          >
            <strong>{presupuesto.cliente}</strong> - {presupuesto.obra}
          </li>
        ))}
      </ul>

      {showBudget && budget && (
        <BudgetDetail
          budgetData={budget}
          hideBudgetFunction={handleClickHideBudget}
        ></BudgetDetail>
      )}

      {showBudget && (
        <div
          onClick={handleClickHideBudget}
          className=" fixed top-0 left-0 z-30  h-full  w-full  bg-black opacity-80  transition-opacity duration-1000"
        ></div>
      )}
    </div>
  );
};

export default BudgetList;
