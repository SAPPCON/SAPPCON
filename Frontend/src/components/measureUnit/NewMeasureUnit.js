import { useState, useRef, useContext, Fragment } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { HiOutlineExclamationTriangle } from "react-icons/hi2";
import { RxCross1 } from "react-icons/rx";
import { noEmptyValidate } from "@/utils/validationFunctions";
import Loader from "../UI/Loader";
import PopUpError from "../UI/PopUpError";
import PopUpSuccess from "../UI/PopUpSuccess";
import MeasureUnitContext from "@/store/MeasureUnitContext";

const NewMeasureUnit = (props) => {
  const [nameError, setNameError] = useState("");
  const nameRef = useRef();
  const [zNewMeasureUnit, setZNewMeasureUnit] = useState("z-40");

  const { measureUnitContext: measureUnitCtx } = useContext(MeasureUnitContext);

  const submitHandler = (event) => {
    event.preventDefault();
    const enteredName = nameRef.current.value;

    if (!noEmptyValidate(enteredName)) {
      setNameError("Ingrese el nombre.");
      return;
    } else {
      setNameError("");
    }

    measureUnitCtx.addItem(enteredName);
    setZNewMeasureUnit("z-20");
  };

  return (
    <Fragment>
      <div
        className={`absolute top-1/3 left-1/2 transform -translate-x-1/2  bg-gray-100 rounded-[8px] border border-solid border-grayBorder w-[600px] ${zNewMeasureUnit}`}
      >
        <RxCross1
          className="text-[20px] absolute top-[10px] right-[10px] text-blackText cursor-pointer"
          onClick={props.hideNewMeasureUnitFunction}
        ></RxCross1>
        <h1 className="font-sans text-[28px] font-normal text-blackText text-center border-b border-b-grayBorder">
          Registar Unidad de Medida
        </h1>

        <form className="flex flex-col px-6 pt-6 pb-2 relative ">
          <div className="mb-4 w-full relative">
            <label htmlFor="name" className="text-sm font-bold block w-72">
              Nombre
            </label>
            <input
              type="name"
              id="name"
              ref={nameRef}
              placeholder="Metro Cuadrado"
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

          {measureUnitCtx.isLoadingAddItem && (
            <div className="flex items-center justify-center ">
              <Loader></Loader>
            </div>
          )}

          {!measureUnitCtx.errorAddItem && !measureUnitCtx.isLoadingAddItem && (
            <div className="flex items-center justify-between h-[40px] mt-2 ">
              <button
                className="flex h-[36px] w-[102px] text-sm items-center font-sans text-[13px] cursor-pointer text-gray-700 p-2 rounded-[8px] border border-solid border-gray-500 bg-gray-300 hover:bg-opacity-70 active:border active:border-gray-500 active:outline-none active:ring ring-blue-200  justify-center mr-2"
                onClick={props.hideNewMeasureUnitFunction}
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
        </form>
      </div>

      {measureUnitCtx.errorAddItem && (
        <PopUpError
          message={measureUnitCtx.errorAddItem.message}
          messageinfo={measureUnitCtx.errorAddItem.messageinfo}
          onAccept={props.hideNewMeasureUnitFunction}
          icon={HiOutlineExclamationTriangle}
        />
      )}

      {measureUnitCtx.succesAddItem && (
        <PopUpSuccess
          message="Unidad de Medida Registrada."
          onAccept={props.hideNewMeasureUnitFunction}
          icon={FaCheckCircle}
        />
      )}
    </Fragment>
  );
};

export default NewMeasureUnit;
