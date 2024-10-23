import { RxCross1 } from "react-icons/rx";
import { useState, Fragment, useContext } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { HiOutlineExclamationTriangle } from "react-icons/hi2";
import Loader from "../UI/Loader";
import { noEmptyValidate } from "@/utils/validationFunctions";
import MeasureUnitContext from "@/store/MeasureUnitContext";

const MeasureUnitDetail = (props) => {
  const [showDelete, setShowDelete] = useState(false);
  const [name, setName] = useState(props.measureUnitData.name);
  const [error, setError] = useState("");
  const [isModified, setIsModified] = useState(false);

  const { measureUnitContext: measureUnitCtx } = useContext(MeasureUnitContext);

  const handleNameChange = (e) => {
    setName(e.target.value);
    setIsModified(e.target.value !== props.measureUnitData.name);
  };

  const handleSave = () => {
    setError("");
    if (!noEmptyValidate(name)) {
      setError("Ingresa un nombre");
      return;
    }

    measureUnitCtx.updateItem(props.measureUnitData, name);
  };

  const handleDelete = () => {
    setShowDelete(true);
  };

  const handleClickHideDelete = () => {
    setShowDelete(false);
  };

  const handleConfirmDelete = () => {
    setShowDelete(false);
    measureUnitCtx.deleteItem(props.measureUnitData._id);
    props.hideMeasureUnitFunctionBackground();
  };

  return (
    <Fragment>
      <div className=" absolute top-1/3 left-1/2 transform -translate-x-1/2  z-40 bg-gray-100 rounded-[8px] border border-solid border-grayBorder w-[600px] ">
        {measureUnitCtx.succesUpdateName && (
          <div
            className=" flex h-[56px] w-full   items-center rounded-xl border-[2px] border-l-[12px] border-solid border-greenBorder bg-white px-[18px] pb-[18px] pt-[14px] font-sans text-[14px] text-blackText absolute left-0 top-[-61px]
           "
          >
            <FaCheckCircle className="mr-1.5  align-top text-[18px] text-greenText"></FaCheckCircle>
            Unidad de medida actualizada.
          </div>
        )}

        {measureUnitCtx.errorUpdateName && (
          <div
            className=" flex h-20 w-full   rounded-xl border border-red5 bg-white p-4 ring-4 ring-inset 	
          ring-red2 ring-opacity-20 absolute left-0 top-[-85px]"
          >
            <HiOutlineExclamationTriangle className="mr-4  align-top text-[30px] text-red5"></HiOutlineExclamationTriangle>
            <div className="flex flex-col justify-center font-sans    ">
              <h1 className="text-lg  text-red5 ">
                {measureUnitCtx.errorUpdateName.message}
              </h1>
              <h2 className="  text-xs text-blackText ">
                {measureUnitCtx.errorUpdateName.messageinfo}
              </h2>
            </div>
          </div>
        )}

        <RxCross1
          className="text-[20px] absolute top-[10px] right-[10px] text-blackText cursor-pointer"
          onClick={props.hideMeasureUnitFunctionBoth}
        ></RxCross1>
        <h1 className="font-sans text-[28px] font-normal text-blackText text-center border-b border-b-grayBorder">
          Editar unidad de medida
        </h1>

        <ul className="flex flex-col pt-3 pb-2 ">
          <li className="flex justify-between border-b border-b-grayBorder text-blackText font-sans text-[14px] mb-4">
            <div className="mb-[12px] w-full h-[80px] truncate px-6 relative">
              <h1 className="mb-[4px] font-bold">Nombre</h1>
              <input
                value={name}
                onChange={handleNameChange}
                placeholder={props.measureUnitData.name}
                className={`w-full p-1 border border-gray-500 rounded-md focus:ring ring-blue5  focus:border focus:border-blue6 focus:outline-none mb-1   ${
                  error !== ""
                    ? " border-red5 ring-red3  focus:border-red5 focus:bg-white "
                    : ""
                }`}
              />
              {error !== "" && (
                <p className="mr-2  text-xs text-red5 absolute">{error}</p>
              )}
            </div>
          </li>

          <li className="px-[23px]">
            <div className="flex items-center justify-between">
              <button
                className={`flex h-[36px] w-[102px] text-sm items-center font-sans text-[13px] cursor-pointer text-white p-2 rounded-[8px] border border-solid border-white justify-center 
        ${
          isModified
            ? "bg-darkblue hover:bg-opacity-90 active:border-blue6 active:ring ring-blue5"
            : "bg-darkblue opacity-50 cursor-not-allowed"
        }`}
                onClick={handleSave}
                disabled={!isModified}
              >
                Guardar
              </button>
              <div className="flex">
                <button
                  className="flex h-[36px] w-[102px] text-sm items-center font-sans text-[13px] cursor-pointer text-gray-700 p-2 rounded-[8px] border border-solid border-gray-500 bg-gray-300 hover:bg-opacity-70 active:border active:border-gray-500 active:outline-none active:ring ring-blue-200 justify-center mr-2"
                  onClick={props.hideMeasureUnitFunctionBoth}
                >
                  Atrás
                </button>
                <button
                  className="flex h-[36px] w-[102px] text-sm items-center font-sans text-[13px] cursor-pointer text-white p-2 rounded-[8px] border border-white bg-darkred ring-red3 hover:bg-opacity-90 active:border active:border-red5 active:outline-none active:ring justify-center mr-2"
                  onClick={handleDelete}
                >
                  Eliminar
                </button>
              </div>
            </div>
          </li>
        </ul>
      </div>

      {showDelete && (
        <div
          className=" flex flex-col h-fit w-fit z-50   items-center rounded-xl border border-solid border-black  bg-white px-6 py-5 pb-2 font-sans text-[14px] text-blackText absolute top-2/3 left-1/2 transform -translate-x-1/2  -translate-y-1/2
           "
        >
          <h4 className="font-bold">
            ¿Está seguro de que desea eliminar esta unidad de medida?
          </h4>

          {measureUnitCtx.isLoadingDeleteItem && (
            <div className="h-[40px] mt-5 w-full flex items-center justify-center">
              <Loader></Loader>
            </div>
          )}

          {!measureUnitCtx.isLoadingDeleteItem && (
            <div className="flex w-full items-center justify-between mt-5 ">
              <button
                className="flex h-[36px] w-[102px] text-sm items-center font-sans text-[13px] cursor-pointer text-gray-700 p-2 rounded-[8px] border border-solid border-gray-500 bg-gray-300 hover:bg-opacity-70 active:border active:border-gray-500 active:outline-none active:ring ring-blue-200  justify-center mr-2"
                onClick={handleClickHideDelete}
              >
                Atrás
              </button>

              <button
                className=" flex h-[36px] w-[102px] text-sm items-center  font-sans text-[13px]  cursor-pointer  text-white  p-2 rounded-[8px] border  border-white bg-darkred  ring-red3  hover:bg-opacity-90 active:border active:border-red5 active:outline-none active:ring justify-center"
                onClick={handleConfirmDelete}
              >
                Eliminar
              </button>
            </div>
          )}
        </div>
      )}

      {showDelete && (
        <div
          onClick={handleClickHideDelete}
          className=" fixed top-0 left-0 z-40   h-full  w-full  bg-black opacity-30  transition-opacity duration-1000"
        ></div>
      )}
    </Fragment>
  );
};

export default MeasureUnitDetail;
