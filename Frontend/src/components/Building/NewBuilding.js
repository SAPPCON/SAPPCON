import { useState, useRef, useContext, Fragment } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { HiOutlineExclamationTriangle } from "react-icons/hi2";
import { RxCross1 } from "react-icons/rx";
import { noEmptyValidate } from "@/utils/validationFunctions";
import CustomerContext from "@/store/CustomerContext";
import BuildingContext from "@/store/BuildingContext";
import Loader from "../UI/Loader";
import PopUpError from "../UI/PopUpError";
import PopUpSuccess from "../UI/PopUpSuccess";

const NewBuilding = (props) => {
  const [nameError, setNameError] = useState("");
  const [aliasError, setAliasError] = useState("");
  const [clientError, setClientError] = useState("");
  const [addressError, setAddressError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const [zNewBuilding, setZNewBuilding] = useState("z-40");

  const nameRef = useRef();
  const aliasRef = useRef();
  const clientRef = useRef();
  const addressRef = useRef();
  const descriptionRef = useRef();

  const { customerContext: customerCtx } = useContext(CustomerContext);
  const { buildingContext: buildingCtx } = useContext(BuildingContext);
  const Customers = customerCtx.items;

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

    buildingCtx.addItem(newBuilding);
    setZNewBuilding("z-20");
  };

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
            <label htmlFor="name" className="text-sm font-bold block w-72">
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
            <label htmlFor="alias" className="text-sm font-bold block w-72">
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
            <label htmlFor="client" className="text-sm font-bold block">
              Cliente
            </label>

            {customerCtx.isLoading && (
              <div className="h-[31px] flex items-center justify-center">
                <Loader></Loader>
              </div>
            )}
            {customerCtx.error && (
              <div className="flex flex-col justify-center items-center h-auto border   border-gray-500 rounded-md">
                <p>{customerCtx.error.message}</p>
                <small>{customerCtx.error.messageinfo}</small>
              </div>
            )}

            {!customerCtx.error && !customerCtx.isLoading && (
              <select
                id="category"
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
            {clientError !== "" && (
              <p className="text-xs text-red5 absolute">{clientError}</p>
            )}
          </div>

          <div className="mb-4 max-w-[50%] relative">
            <label htmlFor="address" className="text-sm font-bold block">
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
            <label htmlFor="description" className="text-sm font-bold block">
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

      {buildingCtx.errorAddItem && (
        <PopUpError
          message={buildingCtx.errorAddItem.message}
          messageinfo={buildingCtx.errorAddItem.messageinfo}
          onAccept={props.hideNewBuildingFunction}
          icon={HiOutlineExclamationTriangle}
        />
      )}

      {buildingCtx.successAddItem && (
        <PopUpSuccess
          message="Obra Registrada."
          onAccept={props.hideNewBuildingFunction}
          icon={FaCheckCircle}
        />
      )}
    </Fragment>
  );
};

export default NewBuilding;
