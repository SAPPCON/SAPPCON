import { useState, useRef, useContext, Fragment } from "react";
import { BiAccessibility } from "react-icons/bi";
import { FaCheckCircle } from "react-icons/fa";
import { HiOutlineExclamationTriangle } from "react-icons/hi2";
import { RxCross1 } from "react-icons/rx";
import { noEmptyValidate } from "@/utils/validationFunctions";
import CustomerContext from "@/store/CustomerContext";
import BuildingContext from "@/store/BuildingContext";
import Loader from "../UI/Loader";

const NewBuilding = (props) => {
  const { customerContext: customerCtx } = useContext(CustomerContext);
  const { buildingContext: buildingCtx } = useContext(BuildingContext);
  const Customers = customerCtx.items;

  const [nameError, setNameError] = useState("");
  const nameRef = useRef();
  const [aliasError, setAliasError] = useState("");
  const aliasRef = useRef();
  const [clientError, setClientError] = useState("");
  const clientRef = useRef();
  const [addressError, setAddressError] = useState("");
  const addressRef = useRef();
  const [descriptionError, setDescriptionError] = useState("");
  const descriptionRef = useRef();

  const [zNewBuilding, setZNewBuilding] = useState("z-40");

  const submitHandler = (event) => {
    event.preventDefault();
    const enteredName = nameRef.current.value;
    const enteredAlias = aliasRef.current.value;
    const enteredClient = clientRef.current.value;
    const enteredAddress = addressRef.current.value;
    const enteredDescription = descriptionRef.current.value;

    if (!noEmptyValidate(enteredName)) {
      setNameError("Ingresa el nombre.");
      return;
    } else {
      setNameError("");
    }

    if (!noEmptyValidate(enteredAlias)) {
      setAliasError("Ingresa el alias.");
      return;
    } else {
      setAliasError("");
    }

    if (enteredClient === "") {
      setClientError("Selecciona un cliente.");
      return;
    } else {
      setClientError("");
    }

    if (!noEmptyValidate(enteredAddress)) {
      setAddressError("Ingresa la dirección.");
      return;
    } else {
      setAddressError("");
    }

    if (!noEmptyValidate(enteredDescription)) {
      setDescriptionError("Ingresa la descripción.");
      return;
    } else {
      setDescriptionError("");
    }

    const newBuilding = {
      customer_id: enteredClient,
      name: enteredName,
      alias: enteredAlias,
      address: enteredAddress,
      description: enteredDescription,
    };

    // Agregar la nueva obra
    buildingCtx.addItem(newBuilding);
    setZNewBuilding("z-20");
  };

  //Absoluto al contenedor padre que es relativo (Customer)
  return (
    <Fragment>
      <div
        className={`absolute top-12 left-1/2 transform -translate-x-1/2  bg-gray-100 rounded-[8px] border border-solid border-grayBorder w-[600px] ${zNewBuilding}`}
      >
        <RxCross1
          className="text-[20px] absolute top-[10px] right-[10px] text-blackText cursor-pointer"
          onClick={props.hideNewBuildingFunction}
        ></RxCross1>
        <h1 className="font-sans text-[28px] font-normal text-blackText text-center border-b border-b-grayBorder">
          Registar Obra
        </h1>

        <form className="flex flex-col px-6 pt-6 pb-2 relative ">
          <div className="mb-4 max-w-[50%] relative">
            <label htmlFor="name" className="text-sm font-semibold block w-72">
              Nombre
            </label>
            <input
              type="name"
              id="name"
              placeholder="Edificio de Oficinas C"
              ref={nameRef}
              className={`w-full p-1 border   border-gray-500 rounded-md focus:ring ring-blue5  focus:border focus:border-blue6 focus:outline-none    ${
                nameError !== ""
                  ? " border-red5 ring-red3  focus:border-red5 focus:bg-white "
                  : ""
              }`}
            />
            {nameError !== "" && (
              <p className="mr-2  text-xs text-red5 absolute">{nameError}</p>
            )}
          </div>

          <div className="mb-4 max-w-[50%] relative">
            <label htmlFor="alias" className="text-sm font-semibold block w-72">
              Alias
            </label>
            <input
              type="alias"
              id="alias"
              placeholder="Obra Sur Juan"
              ref={aliasRef}
              className={`w-full p-1 border   border-gray-500 rounded-md focus:ring ring-blue5  focus:border focus:border-blue6 focus:outline-none    ${
                aliasError !== ""
                  ? " border-red5 ring-red3  focus:border-red5 focus:bg-white "
                  : ""
              }`}
            />
            {aliasError !== "" && (
              <p className="mr-2  text-xs text-red5 absolute">{aliasError}</p>
            )}
          </div>

          <div className="mb-4 w-[50%] relative">
            <label htmlFor="client" className="text-sm font-semibold block">
              Cliente
            </label>

            {customerCtx.isLoading && (
              <div className="h-[31px] flex items-center justify-center">
                <Loader style={{ width: "100%", height: "100%" }}></Loader>
              </div>
            )}
            {customerCtx.error && (
              <div className="h-[31px]">{customerCtx.error}</div>
            )}

            {!customerCtx.error && !customerCtx.isLoading && (
              <select
                id="category"
                //defaultValue={props.serviceData.categoria}
                //onChange={(e) => handleCategoryChange(e.target.value)}
                ref={clientRef}
                className={`w-full p-1 border border-gray-500 rounded-md focus:ring ring-blue5 focus:border focus:border-blue6 focus:outline-none cursor-pointer h-[31px]`}
              >
                {Customers.map((customer) => (
                  <option key={customer._id} value={customer._id}>
                    {customer.name}
                  </option>
                ))}
              </select>
            )}
            {/*Lo hago absoluto y al div relativo asi el msg no entra en el flujo html y el boton + me queda siempre bien puesto */}
            {clientError !== "" && (
              <p className="text-xs text-red5 absolute">{clientError}</p>
            )}
          </div>

          <div className="mb-4 max-w-[50%] relative">
            <label htmlFor="address" className="text-sm font-semibold block">
              Dirección
            </label>
            <input
              type="address"
              id="address"
              ref={addressRef}
              placeholder="Sargento Cabral 1000"
              className={`w-full p-1 border border-gray-500 rounded-md focus:ring ring-blue5  focus:border focus:border-blue6 focus:outline-none    ${
                addressError !== ""
                  ? " border-red5 ring-red3  focus:border-red5 focus:bg-white "
                  : ""
              }`}
            />
            {addressError !== "" && (
              <p className="mr-2  text-xs text-red5 absolute">{addressError}</p>
            )}
          </div>

          <div className="mb-4 w-full relative">
            <label
              htmlFor="description"
              className="text-sm font-semibold block"
            >
              Descripción
            </label>
            <input
              type="description"
              id="description"
              ref={descriptionRef}
              placeholder="Construcción de un edificio de oficinas."
              className={`w-full p-1 border border-gray-500 rounded-md focus:ring ring-blue5  focus:border focus:border-blue6 focus:outline-none    ${
                descriptionError !== ""
                  ? " border-red5 ring-red3  focus:border-red5 focus:bg-white "
                  : ""
              }`}
            />
            {descriptionError !== "" && (
              <p className="mr-2  text-xs text-red5 absolute">
                {descriptionError}
              </p>
            )}
          </div>

          {!buildingCtx.isLoadingAddItem && (
            <div className="flex items-center justify-end min-h-[40px]">
              <button
                className="flex h-[36px] w-[102px] text-sm items-center font-sans text-[13px] cursor-pointer text-gray-700 p-2 rounded-[8px] border border-solid border-gray-500 bg-gray-300 hover:bg-opacity-70 active:border active:border-gray-500 active:outline-none active:ring ring-blue-200  justify-center mr-2"
                onClick={props.hideNewBuildingFunction}
              >
                Atrás
              </button>

              <button
                className=" flex h-[36px] w-[102px] text-sm items-center  font-sans text-[13px]  cursor-pointer  text-white  p-2 rounded-[8px] border border-solid border-white bg-darkblue  ring-blue5  hover:bg-opacity-90 active:border active:border-blue6 active:outline-none active:ring justify-center"
                onClick={submitHandler}
              >
                Registrar
              </button>
            </div>
          )}

          {buildingCtx.isLoadingAddItem && (
            <div className="flex items-center justify-center ">
              <Loader></Loader>
            </div>
          )}
        </form>
      </div>

      {/*Aca van los 2 carteles que van a ser absolutos respecto a su contenedor padre (este div). Algo absoluto se hace referencia al padre mas cercano que tenga que no sea static, en este caso este es absoluto */}

      {buildingCtx.errorAddItem && (
        <div
          className="flex flex-col items-center h-fit w-[250px]   rounded-xl border border-red5 bg-white  ring-4 ring-inset 	
          ring-red2 ring-opacity-20 z-50 absolute top-1/2 left-1/2 transform -translate-x-1/2  -translate-y-1/2   px-[18px]  py-[14px]    "
        >
          <div className="flex w-full ">
            <div className="flex items-center mr-3">
              <HiOutlineExclamationTriangle className="text-[25px] text-red5"></HiOutlineExclamationTriangle>
            </div>
            <div className="flex flex-col justify-center font-sans   ">
              <h1 className="text-lg  text-red5 ">Hubo un problema</h1>
              <h2 className="  text-xs h-[30px] text-blackText line-clamp-2 ">
                {buildingCtx.errorAddItem}
              </h2>
            </div>
          </div>

          <button
            className=" flex h-[36px] w-[102px] text-sm items-center font-sans text-[13px] cursor-pointer text-gray-700 p-2 rounded-[8px] border border-solid border-gray-500 bg-gray-300 hover:bg-opacity-70 active:border active:border-gray-500 active:outline-none active:ring ring-blue-200  justify-center mt-2"
            onClick={props.hideNewBuildingFunction}
          >
            Aceptar
          </button>
        </div>
      )}

      {buildingCtx.successAddItem && (
        <div
          className=" flex flex-col h-fit w-[250px]  items-center rounded-xl border-[2px] border-l-[12px] border-solid border-greenBorder bg-white px-[18px]  py-[14px] font-sans text-[14px] text-blackText z-50 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
         "
        >
          <div className="flex">
            <FaCheckCircle className="mr-1.5  align-top text-[18px] text-greenText"></FaCheckCircle>
            Obra Registrada.
          </div>

          <button
            className=" flex h-[36px] w-[102px] text-sm items-center font-sans text-[13px] cursor-pointer text-gray-700 p-2 rounded-[8px] border border-solid border-gray-500 bg-gray-300 hover:bg-opacity-70 active:border active:border-gray-500 active:outline-none active:ring ring-blue-200  justify-center mt-2"
            onClick={props.hideNewBuildingFunction}
          >
            Aceptar
          </button>
        </div>
      )}
    </Fragment>
  );
};

export default NewBuilding;
