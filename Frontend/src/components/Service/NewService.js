import { useState, useRef } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { HiOutlineExclamationTriangle } from "react-icons/hi2";
import { RxCross1 } from "react-icons/rx";

const NewService = (props) => {
  const [nameError, setNameError] = useState("");
  const nameRef = useRef();
  const [categoryError, setCategoryError] = useState("");
  const categoryRef = useRef();
  const [unitOfMeasurementError, setUnitOfMeasurementError] = useState("");
  const unitOfMeasurementRef = useRef();
  const [unitCostError, setUnitCostError] = useState("");
  const unitCostRef = useRef();
  const [unitPriceError, setUnitPriceError] = useState("");
  const unitPriceRef = useRef();
  const [descriptionError, setDescriptionError] = useState("");
  const descriptionRef = useRef();

  const basicValidate = (word) => {
    const basicPattern = /^(?!.*\s).+$/;
    return basicPattern.test(word);
  };

  //Solo numeros, sin espacios y no nulo
  const numberValidate = (word) => {
    const basicPattern = /^\d+$/; // Solo números, sin espacios
    return word !== null && basicPattern.test(word);
  };

  const noEmptyValidate = (word) => {
    const noEmptyPattern = /^[^\s]+$/;
    return noEmptyPattern.test(word);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    const enteredName = nameRef.current.value;
    const enteredCategory = categoryRef.current.value;
    const enteredUnitOfMeasurement = unitOfMeasurementRef.current.value;
    const enteredUnitCost = unitCostRef.current.value;
    const enteredUnitPrice = unitPriceRef.current.value;
    const enteredDescription = descriptionRef.current.value;

    if (!basicValidate(enteredName)) {
      setNameError("Mínimo 1 carácter y sin espacios en blanco.");
    } else {
      setNameError("");
    }

    if (enteredCategory === "") {
      setCategoryError("Selecciona una categoria.");
    } else {
      setCategoryError("");
    }

    if (enteredUnitOfMeasurement === "") {
      setUnitOfMeasurementError("Selecciona una unidad de medida.");
    } else {
      setUnitOfMeasurementError("");
    }

    if (!numberValidate(enteredUnitCost)) {
      setUnitCostError("Solo numeros, sin espacios en blanco y no nulo.");
    } else {
      setUnitCostError("");
    }

    if (!numberValidate(enteredUnitPrice)) {
      setUnitPriceError("Solo numeros, sin espacios en blanco y no nulo.");
    } else {
      setUnitPriceError("");
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
        onClick={props.hideNewServiceFunction}
      ></RxCross1>
      <h1 className="font-sans text-[28px] font-normal text-blackText text-center border-b border-b-grayBorder">
        Registar Servicio
      </h1>

      <form className="flex flex-col px-6 pt-6 pb-2 relative ">
        <div className="mb-4 max-w-[50%]">
          <label htmlFor="name" className="text-sm font-semibold block w-72">
            Nombre
          </label>
          <input
            type="name"
            id="name"
            placeholder="Pintura de exteriores"
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
            <label htmlFor="category" className="text-sm font-semibold block">
              Categoria
            </label>
            <select
              id="category"
              ref={categoryRef}
              className={`w-full p-1 border border-gray-500 rounded-md focus:ring ring-blue5 focus:border focus:border-blue6 focus:outline-none cursor-pointer ${
                categoryError !== ""
                  ? " border-red5 ring-red3  focus:border-red5 focus:bg-white "
                  : ""
              }`}
            >
              <option value="">Seleccione una opción</option>
              <option value="opcion1">Opción 1</option>
              <option value="opcion2">Opción 2</option>
              <option value="opcion3">Opción 3</option>
            </select>
            {categoryError !== "" && (
              <p className="mr-2  text-xs text-red5">{categoryError}</p>
            )}
          </div>

          <div className="mb-4 w-[49%]">
            <label
              htmlFor="unitOfMeasurement"
              className="text-sm font-semibold block"
            >
              Unidad de Medida
            </label>
            <select
              id="unitOfMeasurement"
              ref={unitOfMeasurementRef}
              className={`w-full p-1 border border-gray-500 rounded-md focus:ring ring-blue5 focus:border focus:border-blue6 focus:outline-none cursor-pointer ${
                unitOfMeasurementError !== ""
                  ? " border-red5 ring-red3  focus:border-red5 focus:bg-white "
                  : ""
              }`}
            >
              <option value="">Seleccione una opción</option>
              <option value="opcion1">Opción 1</option>
              <option value="opcion2">Opción 2</option>
              <option value="opcion3">Opción 3</option>
            </select>
            {unitOfMeasurementError !== "" && (
              <p className="mr-2  text-xs text-red5">
                {unitOfMeasurementError}
              </p>
            )}
          </div>
        </div>

        <div className="mb-4 max-w-[50%]">
          <label htmlFor="unitCost" className="text-sm font-semibold block">
            Coste Unitario
          </label>
          <input
            type="unitCost"
            id="unitCost"
            ref={unitCostRef}
            placeholder="15,99"
            className={`w-full p-1 border border-gray-500 rounded-md focus:ring ring-blue5  focus:border focus:border-blue6 focus:outline-none    ${
              unitCostError !== ""
                ? " border-red5 ring-red3  focus:border-red5 focus:bg-white "
                : ""
            }`}
          />
          {unitCostError !== "" && (
            <p className="mr-2  text-xs text-red5">{unitCostError}</p>
          )}
        </div>

        <div className="mb-4 max-w-[50%]">
          <label htmlFor="unitPrice" className="text-sm font-semibold block">
            Precio Unitario
          </label>
          <input
            type="unitPrice"
            id="unitPrice"
            ref={unitPriceRef}
            placeholder="192,24"
            className={`w-full p-1 border border-gray-500 rounded-md focus:ring ring-blue5  focus:border focus:border-blue6 focus:outline-none    ${
              unitPriceError !== ""
                ? " border-red5 ring-red3  focus:border-red5 focus:bg-white "
                : ""
            }`}
          />
          {unitPriceError !== "" && (
            <p className="mr-2  text-xs text-red5">{unitPriceError}</p>
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
            placeholder="Pintura de superficies exteriores con recubrimientos resistentes al clima."
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
            onClick={props.hideNewServiceFunction}
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
          Servicio Registrado.
        </div>
      )}
    </div>
  );
};

export default NewService;
