import { useState, useContext } from "react";
import CustomerProfile from "./CustomerProfile";
import CustomerContext from "@/store/CustomerContext";
import Loader from "../UI/Loader";
import { FaCheckCircle } from "react-icons/fa";
import { HiOutlineExclamationTriangle } from "react-icons/hi2";
import PopUpError from "../UI/PopUpError";
import PopUpSuccess from "../UI/PopUpSuccess";

const CustomerList = (props) => {
  const [client, setClient] = useState(null);
  const [showClient, setShowClient] = useState(false);
  const [showBackgroundCustomer, setShowBackgroundCustomer] = useState(false);

  const { customerContext: customerCtx, dispatchCustomersAction } =
    useContext(CustomerContext);

  const Customers = customerCtx.items;

  const handleClick = (customer) => {
    setClient(customer); // Guardo el cliente seleccionado (sus datos para la planilla)
    setShowClient(true); // Muestro la planilla con los datos del cliente
    setShowBackgroundCustomer(true); //fondo
  };

  //Oculta la planilla del cliente. Oculta el fondo negro original.
  //El fondo negro original ejecuta esto.
  //La cruz de la planilla ejecuta esto.
  //El boton de atras de la planilla ejecuta esto.
  const handleClickHideClientBoth = () => {
    setShowClient(false);
    setShowBackgroundCustomer(false);

    //Cuando estan los carteles de aceptar error o exito, se puede sacar con el boton de aceptar del mismo o con el fondo negro original. Y como el fondo negro original usa esta funcion, es necesario tambien aca el dispatch.
    dispatchCustomersAction({ type: "SET_RESTART_ALL_DELETE_ITEM" });
  };

  //Saca solo la planilla
  const handleClickHideCustomerBackground = () => {
    setShowClient(false);
  };

  //Saca el cartel de aceptar (error o exito de eliminacion) y el fondo negro original (el nuevo que sale cuando se pregunta x la confirmacion, lo borra)
  const handleClickAccept = () => {
    setShowBackgroundCustomer(false); //esto saca el fondo negro original
    dispatchCustomersAction({ type: "SET_RESTART_ALL_DELETE_ITEM" }); //Esto saca los carteles de aceptar exito u error.
  };

  if (
    Customers.length === 0 &&
    !customerCtx.error &&
    !customerCtx.errorDeleteItem &&
    !customerCtx.successDeleteItem
  ) {
    return (
      <div className="font-sans text-blackText h-[420px] flex justify-center items-center font-medium">
        No tienes clientes aún.
      </div>
    );
  }

  return (
    <div>
      <ul className="h-[420px] overflow-y-auto font-sans text-blackText ">
        {customerCtx.isLoading && (
          <div className="justify-center items-center flex w-full h-full ">
            <Loader></Loader>
          </div>
        )}
        {customerCtx.error && (
          <div className="h-full justify-center flex flex-col items-center">
            <p>{customerCtx.error.message}</p>
            <small>{customerCtx.error.messageinfo}</small>
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
          hideClientFunctionBoth={handleClickHideClientBoth}
          hideClientFunctionBackground={handleClickHideCustomerBackground}
        ></CustomerProfile>
      )}

      {/* Este es el fondo negro original que se despliega al abrir el perfil del cliente */}
      {showBackgroundCustomer && (
        <div
          onClick={handleClickHideClientBoth}
          className=" fixed top-0 left-0 z-30  h-full  w-full  bg-black opacity-80  transition-opacity duration-1000"
        ></div>
      )}

      {/*El aceptar: va a estar con respecto al contenedor en Service que es Relativo, no lo dejo esto en Service Detail porque cuando se cierra la planilla de detalle el componente deja de renderizarse */}

      {customerCtx.successDeleteItem && !customerCtx.errorDeleteItem && (
        <PopUpSuccess
          message="Cliente Eliminado."
          onAccept={handleClickAccept}
          icon={FaCheckCircle}
        />
      )}

      {!customerCtx.successDeleteItem && customerCtx.errorDeleteItem && (
        <PopUpError
          message={customerCtx.errorDeleteItem.message}
          messageinfo={customerCtx.errorDeleteItem.messageinfo}
          onAccept={handleClickAccept}
          icon={HiOutlineExclamationTriangle}
        />
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
