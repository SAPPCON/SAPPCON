import { useState, useContext } from "react";
import CustomerProfile from "./CustomerProfile";
import CustomerContext from "@/store/CustomerContext";

const CustomerList = (props) => {
  const [client, setClient] = useState(null);
  const [showClient, setShowClient] = useState(false);

  const { customerContext: customerCtx} =
  useContext(CustomerContext);

  const Customers = customerCtx.items;

  const handleClick = (cliente) => {
    setClient(cliente); // Guardo el cliente seleccionado (sus datos para la planilla)
    setShowClient(true); // Muestro la planilla con los datos del cliente
  };

  const handleClickHideClient = () => {
    setShowClient(false);
  };


  if (Customers.length === 0 && !customerCtx.error) {
    return (
      <div className="font-sans text-blackText h-[420px] flex justify-center items-center font-medium">
        No tienes clientes aún.
      </div>
    );
  }

  return (
    <div>
      <ul className="max-h-[420px] overflow-y-auto font-sans text-blackText ">
      {customerCtx.isLoading && (
          <div className="justify-center items-center flex w-full h-full ">
            <Loader></Loader>
          </div>
        )}
        {customerCtx.error && (
          <div className="h-full justify-center flex items-center">
            {customerCtx.error}
          </div>
        )}

        {!customerCtx.error &&
          !customerCtx.isLoading &&
          Customers.map((customer, index) => {
            return (
              <li
                key={customer._id}
                onClick={() => handleClick(customer)}
                className={`py-2 px-2 cursor-pointer hover:bg-grayBg2 hover:bg-opacity-70 ${
                  index !== Customers.length - 1
                    ? "border-b border-b-grayBorder"
                    : "border-b border-b-grayBorder"
                }`}
              >
                <strong>{customer.name}</strong>
              </li>
            );
          })}
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
