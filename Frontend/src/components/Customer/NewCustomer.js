import { useState, useRef } from "react";
import { BiAccessibility } from "react-icons/bi";
import { FaCheckCircle } from "react-icons/fa";
import { HiOutlineExclamationTriangle } from "react-icons/hi2";
import { RxCross1 } from "react-icons/rx";

import Link from "next/link";

const NewCustomer = (props) => {
  const [nameError, setNameError] = useState("");
  const nameRef = useRef();
  const [lastNameError, setlastNameError] = useState("");
  const lastNameRef = useRef();
  const [aliasError, setAliasError] = useState("");
  const aliasRef = useRef();
  const [addressError, setaddressError] = useState("");
  const addressRef = useRef();
  const [emailError, setEmailError] = useState("");
  const emailRef = useRef();

  const basicValidate = (word) => {
    const basicPattern = /^(?!.*\s).+$/;
    return basicPattern.test(word);
  };

  const alphanumericWithSpacesValidate = (word) => {
    const basicPattern = /^[a-zA-Z0-9\s]+$/; // Letras, números y espacios
    return word !== null && word.trim() !== "" && basicPattern.test(word);
  };

  const validateEmail = (email) => {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    const enteredName = nameRef.current.value;
    const enteredLastName = lastNameRef.current.value;
    const enteredAlias = aliasRef.current.value;
    const enteredAddress = addressRef.current.value;
    const enteredEmail = emailRef.current.value;

    if (!basicValidate(enteredName)) {
      setNameError("Mínimo 1 carácter y sin espacios en blanco.");
    } else {
      setNameError("");
    }

    if (!basicValidate(enteredLastName)) {
      setlastNameError("Mínimo 1 carácter y sin espacios en blanco.");
    } else {
      setlastNameError("");
    }

    if (!basicValidate(enteredAlias)) {
      setAliasError("Mínimo 1 carácter y sin espacios en blanco.");
    } else {
      setAliasError("");
    }

    if (!alphanumericWithSpacesValidate(enteredAddress)) {
      setaddressError("Solo letras y numeros, no nulo.");
    } else {
      setaddressError("");
    }

    if (!validateEmail(enteredEmail)) {
      setEmailError("Dirección de correo electrónico inválida.");
    } else {
      setEmailError("");
    }
  };

  //Absoluto al contenedor padre que es relativo (Customer)
  return (
    <div className=" absolute top-12 left-1/2 transform -translate-x-1/2  z-40 bg-gray-100 rounded-[8px] border border-solid border-grayBorder w-[600px]">
      {/*Esta cruz se ubica absolutamente en referencia al div de arriba que tambien es absoluto, esto se peude hacer porq esta contenido por el div absoluto sino no se podria*/}
      <RxCross1
        className="text-[20px] absolute top-[10px] right-[10px] text-blackText cursor-pointer"
        onClick={props.hideNewClientFunction}
      ></RxCross1>
      <h1 className="font-sans text-[28px] font-normal text-blackText text-center border-b border-b-grayBorder">
        Registar Cliente
      </h1>

      {/*El form es relativo para asi la imagen ubicarla absolutamnete en referencia a el*/}
      <form className="flex flex-col px-6 pt-6 pb-2 relative ">
        <div className="absolute right-[24px] top-[24px] w-[150px] h-[150px] bg-gray-300 flex justify-center items-center truncate ">
          <BiAccessibility className="text-[130px] "></BiAccessibility>
        </div>

        <div className="mb-4 max-w-[50%]">
          <label htmlFor="name" className="text-sm font-semibold block w-72">
            Nombre
          </label>
          <input
            type="name"
            id="name"
            ref={nameRef}
            placeholder="Juan"
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

        <div className="mb-4 max-w-[50%]">
          <label htmlFor="lastName" className="text-sm font-semibold block">
            Apellido
          </label>
          <input
            type="lastName"
            id="lastName"
            ref={lastNameRef}
            placeholder="Pérez"
            className={`w-full p-1 border border-gray-500 rounded-md focus:ring ring-blue5  focus:border focus:border-blue6 focus:outline-none    ${
              lastNameError !== ""
                ? " border-red5 ring-red3  focus:border-red5 focus:bg-white "
                : ""
            }`}
          />
          {lastNameError !== "" && (
            <p className="mr-2  text-xs text-red5">{lastNameError}</p>
          )}
        </div>

        <div className="mb-4 max-w-[50%]">
          <label htmlFor="alias" className="text-sm font-semibold block">
            Alias
          </label>
          <input
            type="alias"
            id="alias"
            ref={aliasRef}
            placeholder="JPerez22"
            className={`w-full p-1 border border-gray-500 rounded-md focus:ring ring-blue5  focus:border focus:border-blue6 focus:outline-none    ${
              aliasError !== ""
                ? " border-red5 ring-red3  focus:border-red5 focus:bg-white "
                : ""
            }`}
          />
          {aliasError !== "" && (
            <p className="mr-2  text-xs text-red5">{aliasError}</p>
          )}
        </div>

        <div className="mb-4 max-w-[50%]">
          <label htmlFor="address" className="text-sm font-semibold block">
            Dirección
          </label>
          <input
            type="address"
            id="address"
            ref={addressRef}
            placeholder="Las Heras 2029"
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

        <div className="mb-4 max-w-[50%]">
          <label htmlFor="email" className="text-sm font-semibold block">
            Correo Electrónico
          </label>
          <input
            type="email"
            id="email"
            ref={emailRef}
            placeholder="juanperez@example.com"
            className={`w-full p-1 border border-gray-500 rounded-md focus:ring ring-blue5  focus:border focus:border-blue6 focus:outline-none    ${
              emailError !== ""
                ? " border-red5 ring-red3  focus:border-red5 focus:bg-white "
                : ""
            }`}
          />
          {emailError !== "" && (
            <p className="mr-2  text-xs text-red5">{emailError}</p>
          )}
        </div>

        <div className="flex items-center justify-end ">
          <button
            className="flex h-[36px] w-[102px] text-sm items-center font-sans text-[13px] cursor-pointer text-gray-700 p-2 rounded-[8px] border border-solid border-gray-500 bg-gray-300 hover:bg-opacity-70 active:border active:border-gray-500 active:outline-none active:ring ring-blue-200  justify-center mr-2"
            onClick={props.hideNewClientFunction}
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
          Cliente Registrado.
        </div>
      )}
    </div>
  );
};

export default NewCustomer;
