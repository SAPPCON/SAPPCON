import { useState } from "react";
import CustomerProfile from "./CustomerProfile";

const CustomerList = (props) => {
  const [client, setClient] = useState(null);
  const [showClient, setShowClient] = useState(false);

  const handleClick = (cliente) => {
    setClient(cliente); // Guardo el cliente seleccionado (sus datos para la planilla)
    setShowClient(true); // Muestro la planilla con los datos del cliente
  };

  const handleClickHideClient = () => {
    setShowClient(false);
  };

  const Clientes = [
    {
      id: 1,
      name: "Juan",
      apellido: "Pérez",
      email: "juan.perez@example.com",
      username: "juanperez",
      direccion: "Calle Falsa 123, Buenos Aires",
    },
    {
      id: 2,
      name: "Ana",
      apellido: "Gómez",
      email: "ana.gomez@example.com",
      username: "anagomez",
      direccion: "Av. Siempre Viva 456, Córdoba",
    },
    {
      id: 3,
      name: "Carlos",
      apellido: "Díaz",
      email: "carlos.diaz@example.com",
      username: "carlosdiaz",
      direccion: "Calle del Sol 789, Rosario",
    },
    {
      id: 4,
      name: "Daenerys",
      apellido: "Targaryen",
      email: "daenerys.targaryen@example.com",
      username: "daeneryst",
      direccion: "Dragons Lane 1, Meereen",
    },
    {
      id: 5,
      name: "Rhaegal",
      apellido: "Targaryen",
      email: "rhaegal@example.com",
      username: "rhaegalt",
      direccion: "Sky Castle 101, Valyria",
    },
    {
      id: 6,
      name: "Viserion",
      apellido: "Díaz",
      email: "viserion.diaz@example.com",
      username: "viseriond",
      direccion: "Calle del Dragón 202, Volantis",
    },
    {
      id: 7,
      name: "Syrax",
      apellido: "Velaryon",
      email: "syrax@example.com",
      username: "syraxv",
      direccion: "Sea Tower 303, Driftmark",
    },
    {
      id: 8,
      name: "Meleys",
      apellido: "Velaryon",
      email: "meleys@example.com",
      username: "meleysv",
      direccion: "Wave Road 404, Driftmark",
    },
    {
      id: 9,
      name: "Caraxes",
      apellido: "Targaryen",
      email: "caraxes@example.com",
      username: "caraxest",
      direccion: "Fire Hill 505, Dragonstone",
    },
    {
      id: 10,
      name: "Sunfyre",
      apellido: "Targaryen",
      email: "sunfyre@example.com",
      username: "sunfyret",
      direccion: "Golden Way 606, Dragonstone",
    },
    {
      id: 11,
      name: "Arrax",
      apellido: "Velaryon",
      email: "arrax@example.com",
      username: "arraxv",
      direccion: "Blue Mountain 707, Driftmark",
    },
    {
      id: 12,
      name: "Vermax",
      apellido: "Targaryen",
      email: "vermax@example.com",
      username: "vermaxt",
      direccion: "Rock Road 808, Dragonstone",
    },
    {
      id: 13,
      name: "Moondancer",
      apellido: "Targaryen",
      email: "moondancer@example.com",
      username: "moondancert",
      direccion: "Lunar Valley 909, Dragonstone",
    },
  ];

  //const Clientes = [];

  if (Clientes.length === 0) {
    return (
      <div className="font-sans text-blackText h-[420px] flex justify-center items-center font-medium">
        No tienes clientes aún.
      </div>
    );
  }

  return (
    <div>
      <ul className="max-h-[420px] overflow-y-auto font-sans text-blackText ">
        {Clientes.map((cliente, index) => (
          <li
            key={cliente.id}
            onClick={() => handleClick(cliente)}
            className={`py-2 px-2 cursor-pointer hover:bg-grayBg2 hover:bg-opacity-70  ${
              index !== Clientes.length - 1
                ? "border-b border-b-grayBorder"
                : ""
            }`}
          >
            <strong>{cliente.name}</strong> - {cliente.email}
          </li>
        ))}
      </ul>

      {/* Planilla para mostrar los detalles del cliente */}

      {showClient && client && (
        <CustomerProfile
          clientData={client}
          hideClientFunction={handleClickHideClient}
        ></CustomerProfile>
      )}

      {showClient && (
        <div
          onClick={handleClickHideClient}
          className=" fixed top-0 left-0 z-30  h-full  w-full  bg-black opacity-80  transition-opacity duration-1000"
        ></div>
      )}
    </div>
  );
};

export default CustomerList;

/*
Importante: 

Se pasa asi la funcion: 
     onClick={() => handleClick(cliente)}  Y NO ASI: onClick={handleClick(cliente)}
     porque al hacer () hara que SE EJECUTE INMEDIATAMENTE cuando el componente se renderiza y no cuando se haga click, debido al parentesis que en JS hace que se llame. Mientras que la forma correcta, es una funcion anonima que se crea al renderizar el componete y solo se ejecuta al momento del click. 

*/
