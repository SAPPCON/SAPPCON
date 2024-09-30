import { useState, useRef } from "react";
import { BiAccessibility } from "react-icons/bi";
import { FaCheckCircle } from "react-icons/fa";
import { HiOutlineExclamationTriangle } from "react-icons/hi2";
import { RxCross1 } from "react-icons/rx";

import Link from "next/link";

const NewBuilding = (props) => {
  const [nameError, setNameError] = useState("");
  const nameRef = useRef();
  const [clientError, setClientError] = useState("");
  const clientRef = useRef();
  const [initialStateError, setInitialStateError] = useState("");
  const initialStateRef = useRef();
  const [addressError, setAddressError] = useState("");
  const addressRef = useRef();
  const [descriptionError, setDescriptionError] = useState("");
  const descriptionRef = useRef();

  const basicValidate = (word) => {
    const basicPattern = /^(?!.*\s).+$/;
    return basicPattern.test(word);
  };

  const noEmptyValidate = (word) => {
    const noEmptyPattern = /^[^\s]+$/;
    return noEmptyPattern.test(word);
  };

  const alphanumericWithSpacesValidate = (word) => {
    const basicPattern = /^[a-zA-Z0-9\s]+$/; // Letras, números y espacios
    return word !== null && word.trim() !== "" && basicPattern.test(word);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    const enteredName = nameRef.current.value;
    const enteredClient = clientRef.current.value;
    const enteredInitialState = initialStateRef.current.value;
    const enteredAddress = addressRef.current.value;
    const enteredDescription = descriptionRef.current.value;

    if (!basicValidate(enteredName)) {
      setNameError("Mínimo 1 carácter y sin espacios en blanco.");
    } else {
      setNameError("");
    }

    if (enteredClient === "") {
      setClientError("Selecciona un cliente.");
    } else {
      setClientError("");
    }

    if (enteredInitialState === "") {
      setInitialStateError("Selecciona un estado inicial.");
    } else {
      setInitialStateError("");
    }

    if (!alphanumericWithSpacesValidate(enteredAddress)) {
      setAddressError("Solo letras y numeros, no nulo.");
    } else {
      setAddressError("");
    }

    if (!noEmptyValidate(enteredDescription)) {
      setDescriptionError("Mínimo 1 carácter.");
    } else {
      setDescriptionError("");
    }
  };

  //Absoluto al contenedor padre que es relativo (Customer)
  return (
    <div className=" absolute top-12 left-1/2 transform -translate-x-1/2  z-40 bg-gray-100 rounded-[8px] border border-solid border-grayBorder w-[600px]">
      <RxCross1
        className="text-[20px] absolute top-[10px] right-[10px] text-blackText cursor-pointer"
        onClick={props.hideNewBuildingFunction}
      ></RxCross1>
      <h1 className="font-sans text-[28px] font-normal text-blackText text-center border-b border-b-grayBorder">
        Registar Obra
      </h1>

      <form className="flex flex-col px-6 pt-6 pb-2 relative ">
        <div className="mb-4 max-w-[50%]">
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
            <p className="mr-2  text-xs text-red5">{nameError}</p>
          )}
        </div>

        <div className="flex justify-between">
          <div className="mb-4 w-[49%]">
            <label htmlFor="client" className="text-sm font-semibold block">
              Cliente
            </label>
            <select
              id="client"
              ref={clientRef}
              className={`w-full p-1 border border-gray-500 rounded-md focus:ring ring-blue5 focus:border focus:border-blue6 focus:outline-none cursor-pointer ${
                clientError !== ""
                  ? " border-red5 ring-red3  focus:border-red5 focus:bg-white "
                  : ""
              }`}
            >
              <option value="">Seleccione una opción</option>
              <option value="opcion1">Opción 1</option>
              <option value="opcion2">Opción 2</option>
              <option value="opcion3">Opción 3</option>
            </select>
            {clientError !== "" && (
              <p className="mr-2  text-xs text-red5">{clientError}</p>
            )}
          </div>

          <div className="mb-4 w-[49%]">
            <label
              htmlFor="initialState"
              className="text-sm font-semibold block"
            >
              Estado Inicial
            </label>
            <select
              id="initialState"
              ref={initialStateRef}
              className={`w-full p-1 border border-gray-500 rounded-md focus:ring ring-blue5 focus:border focus:border-blue6 focus:outline-none cursor-pointer ${
                initialStateError !== ""
                  ? " border-red5 ring-red3  focus:border-red5 focus:bg-white "
                  : ""
              }`}
            >
              <option value="">Seleccione una opción</option>
              <option value="opcion1">Opción 1</option>
              <option value="opcion2">Opción 2</option>
              <option value="opcion3">Opción 3</option>
            </select>
            {initialStateError !== "" && (
              <p className="mr-2  text-xs text-red5">{initialStateError}</p>
            )}
          </div>
        </div>

        <div className="mb-4 max-w-[50%]">
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
            <p className="mr-2  text-xs text-red5">{addressError}</p>
          )}
        </div>

        <div className="mb-4 w-full">
          <label htmlFor="description" className="text-sm font-semibold block">
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
            <p className="mr-2  text-xs text-red5">{descriptionError}</p>
          )}
        </div>

        <div className="flex items-center justify-end ">
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
      </form>

      {/*Aca van los 2 carteles que van a ser absolutos respecto a su contenedor padre (este div). Algo absoluto se hace referencia al padre mas cercano que tenga que no sea static, en este caso este es absoluto */}

      {false && (
        <div
          className="flex h-20 w-full   rounded-xl border border-red5 bg-white p-4 ring-4 ring-inset 	
          ring-red2 ring-opacity-20 absolute top-[-94px]  "
        >
          <HiOutlineExclamationTriangle className="mr-4  align-top text-[30px] text-red5"></HiOutlineExclamationTriangle>
          <div className="flex flex-col justify-center font-sans    ">
            <h1 className="text-lg  text-red5 ">Hubo un problema</h1>
            <h2 className="  text-xs text-blackText ">Msg de error</h2>
          </div>
        </div>
      )}

      {true && (
        <div
          className=" flex h-[56px] w-full   items-center rounded-xl border-[2px] border-l-[12px] border-solid border-greenBorder bg-white px-[18px] pb-[18px] pt-[14px] font-sans text-[14px] text-blackText
           absolute top-[-70px]   "
        >
          <FaCheckCircle className="mr-1.5  align-top text-[18px] text-greenText"></FaCheckCircle>
          Obra Registrada.
        </div>
      )}
    </div>
  );
};

export default NewBuilding;
