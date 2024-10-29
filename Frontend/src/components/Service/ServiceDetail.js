import Link from "next/link";
import { RxCross1 } from "react-icons/rx";
import { useState, useContext, Fragment } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { HiOutlineExclamationTriangle } from "react-icons/hi2";
import ServiceContext from "@/store/ServiceContext";
import CategoryContext from "@/store/CategoryContext";
import MeasureUnitContext from "@/store/MeasureUnitContext";
import Loader from "../UI/Loader";
import ReactSelect from "react-select";

const ServiceDetail = (props) => {
  const [showDelete, setShowDelete] = useState(false);

  const { serviceContext: serviceCtx } = useContext(ServiceContext);
  const { categoryContext: categoryCtx } = useContext(CategoryContext);
  const { measureUnitContext: measureUnitCtx } = useContext(MeasureUnitContext);
  const Categories = categoryCtx.items;
  const measureUnits = measureUnitCtx.items;

  const categoriesOptions = Categories.map((category) => ({
    value: category._id,
    label: category.name,
  }));

  const defaultCategory = categoriesOptions.find(
    (option) => option.value === (props.serviceData.category_id || null)
  );

  const measureUnitsOptions = measureUnits.map((measureUnit) => ({
    value: measureUnit._id,
    label: measureUnit.name,
  }));

  const defaultMeasureUnit = measureUnitsOptions.find(
    (option) => option.value === (props.serviceData.measure_unit_id || null)
  );

  //Y en esta funcion se deberia mandar la request al back para cambiar este valor.
  const handleUnitChange = (newMeasureUnitId) => {
    serviceCtx.updateMeasureUnit(props.serviceData, newMeasureUnitId);
  };

  const handleCategoryChange = (newCategoryId) => {
    serviceCtx.updateCategory(props.serviceData, newCategoryId);
  };

  const handleDelete = () => {
    setShowDelete(true);
  };

  const handleClickHideDelete = () => {
    setShowDelete(false);
  };

  const handleConfirmDelete = () => {
    setShowDelete(false);
    serviceCtx.deleteItem(props.serviceData._id);
    props.hideServiceFunctionBackground();
  };

  return (
    <Fragment>
      <div className=" absolute top-12 left-1/2 transform -translate-x-1/2  z-40 bg-gray-100 rounded-[8px] border border-solid border-grayBorder w-[600px] ">
        {serviceCtx.successUpdateCategory && (
          <div
            className=" flex h-[56px] w-full   items-center rounded-xl border-[2px] border-l-[12px] border-solid border-greenBorder bg-white px-[18px] pb-[18px] pt-[14px] font-sans text-[14px] text-blackText absolute left-0 top-[-61px]
           "
          >
            <FaCheckCircle className="mr-1.5  align-top text-[18px] text-greenText"></FaCheckCircle>
            Categoria actualizada.
          </div>
        )}

        {serviceCtx.errorUpdateCategory && (
          <div
            className=" flex h-20 w-full   rounded-xl border border-red5 bg-white p-4 ring-4 ring-inset 	
          ring-red2 ring-opacity-20 absolute left-0 top-[-85px]"
          >
            <HiOutlineExclamationTriangle className="mr-4  align-top text-[30px] text-red5"></HiOutlineExclamationTriangle>
            <div className="flex flex-col justify-center font-sans    ">
              <h1 className="text-lg  text-red5 ">
                {serviceCtx.errorUpdateCategory.message}
              </h1>
              <h2 className="  text-xs text-blackText ">
                {serviceCtx.errorUpdateCategory.messageinfo}
              </h2>
            </div>
          </div>
        )}

        {serviceCtx.successUpdateMeasureUnit && (
          <div
            className=" flex h-[56px] w-full   items-center rounded-xl border-[2px] border-l-[12px] border-solid border-greenBorder bg-white px-[18px] pb-[18px] pt-[14px] font-sans text-[14px] text-blackText absolute left-0 top-[-61px]
           "
          >
            <FaCheckCircle className="mr-1.5  align-top text-[18px] text-greenText"></FaCheckCircle>
            Unidad de Medida actualizada.
          </div>
        )}

        {serviceCtx.errorUpdateMeasureUnit && (
          <div
            className=" flex h-20 w-full   rounded-xl border border-red5 bg-white p-4 ring-4 ring-inset 	
          ring-red2 ring-opacity-20 absolute left-0 top-[-85px]"
          >
            <HiOutlineExclamationTriangle className="mr-4  align-top text-[30px] text-red5"></HiOutlineExclamationTriangle>
            <div className="flex flex-col justify-center font-sans    ">
              <h1 className="text-lg  text-red5 ">
                {serviceCtx.errorUpdateMeasureUnit.message}
              </h1>
              <h2 className="  text-xs text-blackText ">
                {serviceCtx.errorUpdateMeasureUnit.messageinfo}
              </h2>
            </div>
          </div>
        )}

        <RxCross1
          className="text-[20px] absolute top-[10px] right-[10px] text-blackText cursor-pointer"
          onClick={props.hideServiceFunctionBoth}
        ></RxCross1>
        <h1 className="font-sans text-[28px] font-normal text-blackText text-center border-b border-b-grayBorder">
          Datos del Servicio
        </h1>

        <ul className="flex flex-col  pt-3 pb-2 ">
          <li className="flex  justify-between border-b border-b-grayBorder text-blackText font-sans text-[14px] mb-4 ">
            <div className="pl-6 mb-[12px] w-full max-w-[87%] overflow-y-auto line-clamp-4">
              <h1 className="mb-[4px] font-bold">Nombre</h1>
              <h1 className="break-words">{props.serviceData.name}</h1>
            </div>
            <Link
              href={`/service/name/${props.serviceData._id}`}
              className="pr-6 h-fit"
            >
              <button className=" h-[29px] px-2 cursor-pointer rounded-[8px] border border-solid border-grayBorder bg-grayBg1 text-[13px] shadow-md ring-blue5 hover:bg-grayBg2 hover:bg-opacity-15 active:border active:border-blue6 active:outline-none active:ring">
                Editar
              </button>
            </Link>
          </li>

          <li className="flex  justify-between text-blackText font-sans text-[14px] px-6 ">
            <div className="mb-4 w-[49%]">
              <label htmlFor="category" className="mb-[4px] font-bold">
                Categoria
              </label>
              {categoryCtx.isLoading && (
                <div className="h-[31px] flex items-center justify-center">
                  <Loader style={{ width: "100%", height: "100%" }}></Loader>
                </div>
              )}
              {categoryCtx.error && (
                <div className="flex flex-col justify-center items-center h-auto border   border-gray-500 rounded-md">
                  <p>{categoryCtx.error.message}</p>
                  <small>{categoryCtx.error.messageinfo}</small>
                </div>
              )}

              {!categoryCtx.error && !categoryCtx.isLoading && (
                <ReactSelect
                  options={categoriesOptions}
                  defaultValue={defaultCategory}
                  onChange={(selectedOption) =>
                    handleCategoryChange(selectedOption.value)
                  }
                  isDisabled={serviceCtx.isLoadingUpdateCategory}
                  menuPlacement="auto"
                  styles={{
                    control: (provided, state) => ({
                      ...provided,
                      width: "100%",
                      border: state.isFocused
                        ? "1px solid #0092f3"
                        : "1px solid #6b7280",
                      boxShadow: state.isFocused ? "0 0 0 3px #79c5f8" : null,
                      "&:hover": {
                        border: state.isFocused
                          ? "1px solid #0092f3"
                          : "1px solid #6b7280",
                      },
                    }),
                    menu: (provided) => ({
                      ...provided,
                      maxWidth: "100%",
                      wordWrap: "break-word",
                      border: "1px solid #6b7280",
                    }),
                    option: (provided, state) => ({
                      ...provided,
                      whiteSpace: "normal",
                      backgroundColor: state.isSelected ? "#0071bb" : "white",
                      "&:hover": {
                        backgroundColor: state.isFocused
                          ? "#79c5f8"
                          : " #white",
                      },
                    }),
                    singleValue: (provided, state) => ({
                      ...provided,
                      color: "#0F1111",
                    }),
                  }}
                />
              )}
            </div>

            <div className="mb-4 w-[49%]">
              <label htmlFor="unitOfMeasurement" className="mb-[4px] font-bold">
                Unidad de Medida
              </label>

              {measureUnitCtx.isLoading && (
                <div className="h-[31px] flex items-center justify-center">
                  <Loader style={{ width: "100%", height: "100%" }}></Loader>
                </div>
              )}
              {measureUnitCtx.error && (
                <div className="flex flex-col justify-center items-center h-auto border   border-gray-500 rounded-md">
                  <p>{measureUnitCtx.error.message}</p>
                  <small>{measureUnitCtx.error.messageinfo}</small>
                </div>
              )}

              {!measureUnitCtx.error && !measureUnitCtx.isLoading && (
                <ReactSelect
                  options={measureUnitsOptions}
                  defaultValue={defaultMeasureUnit}
                  onChange={(selectedOption) =>
                    handleUnitChange(selectedOption.value)
                  }
                  isDisabled={serviceCtx.isLoadingUpdateMeasureUnit}
                  menuPlacement="auto"
                  styles={{
                    control: (provided, state) => ({
                      ...provided,
                      width: "100%",
                      border: state.isFocused
                        ? "1px solid #0092f3"
                        : "1px solid #6b7280",
                      boxShadow: state.isFocused ? "0 0 0 3px #79c5f8" : null,
                      "&:hover": {
                        border: state.isFocused
                          ? "1px solid #0092f3"
                          : "1px solid #6b7280",
                      },
                    }),
                    menu: (provided) => ({
                      ...provided,
                      maxWidth: "100%",
                      wordWrap: "break-word",
                      border: "1px solid #6b7280",
                    }),
                    option: (provided, state) => ({
                      ...provided,
                      whiteSpace: "normal",
                      backgroundColor: state.isSelected ? "#0071bb" : "white",
                      "&:hover": {
                        backgroundColor: state.isFocused
                          ? "#79c5f8"
                          : " #white",
                      },
                    }),
                    singleValue: (provided, state) => ({
                      ...provided,
                      color: "#0F1111",
                    }),
                  }}
                />
              )}
            </div>
          </li>
          <div className="h-[1px] bg-[#d5d9d9] w-full mb-[16px]"></div>

          <li className="flex  justify-between text-blackText font-sans text-[14px]  ">
            <div className="pl-6 mb-[12px] truncate">
              <h1 className="mb-[4px] font-bold">Coste Unitario</h1>
              <h1>${props.serviceData.cost}</h1>
            </div>
            <Link
              href={`/service/unitcost/${props.serviceData._id}`}
              className="pr-6 h-fit"
            >
              <button className=" h-[29px] px-2 cursor-pointer rounded-[8px] border border-solid border-grayBorder bg-grayBg1 text-[13px] shadow-md ring-blue5 hover:bg-grayBg2 hover:bg-opacity-15 active:border active:border-blue6 active:outline-none active:ring">
                Editar
              </button>
            </Link>
          </li>
          <div className="h-[1px] bg-[#d5d9d9] w-full mb-[16px]"></div>
          <li className="flex  justify-between text-blackText font-sans text-[14px]  ">
            <div className="pl-6 mb-[12px] truncate">
              <h1 className="mb-[4px] font-bold">Precio Unitario</h1>
              <h1>${props.serviceData.price}</h1>
            </div>
            <Link
              href={`/service/unitprice/${props.serviceData._id}`}
              className="pr-6 h-fit"
            >
              <button className=" h-[29px] px-2 cursor-pointer rounded-[8px] border border-solid border-grayBorder bg-grayBg1 text-[13px] shadow-md ring-blue5 hover:bg-grayBg2 hover:bg-opacity-15 active:border active:border-blue6 active:outline-none active:ring">
                Editar
              </button>
            </Link>
          </li>
          <div className="h-[1px] bg-[#d5d9d9] w-full mb-[16px]"></div>

          <li className="flex  justify-between text-blackText font-sans text-[14px]  ">
            <div className="pl-6 mb-[12px] w-full max-w-[87%] overflow-y-auto line-clamp-5">
              <h1 className="mb-[4px] font-bold">Descripción</h1>
              <h1 className="break-words">{props.serviceData.description}</h1>
            </div>

            <Link
              href={`/service/description/${props.serviceData._id}`}
              className="pr-6 h-fit"
            >
              <button className=" h-[29px] px-2 cursor-pointer rounded-[8px] border border-solid border-grayBorder bg-grayBg1 text-[13px] shadow-md ring-blue5 hover:bg-grayBg2 hover:bg-opacity-15 active:border active:border-blue6 active:outline-none active:ring">
                Editar
              </button>
            </Link>
          </li>
          <div className="h-[1px] bg-[#d5d9d9] w-full mb-[16px]"></div>

          <li className=" px-[23px] ">
            <div className="flex items-center justify-end ">
              <button
                className="flex h-[36px] w-[102px] text-sm items-center font-sans text-[13px] cursor-pointer text-gray-700 p-2 rounded-[8px] border border-solid border-gray-500 bg-gray-300 hover:bg-opacity-70 active:border active:border-gray-500 active:outline-none active:ring ring-blue-200  justify-center mr-2"
                onClick={props.hideServiceFunctionBoth}
              >
                Atrás
              </button>

              <button
                className=" flex h-[36px] w-[102px] text-sm items-center  font-sans text-[13px]  cursor-pointer  text-white  p-2 rounded-[8px] border  border-white bg-darkred  ring-red3  hover:bg-opacity-90 active:border active:border-red5 active:outline-none active:ring justify-center"
                onClick={handleDelete}
              >
                Eliminar
              </button>
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
            ¿Está seguro de que desea eliminar este servicio?
          </h4>

          {serviceCtx.isLoadingDeleteItem && (
            <div className="h-[40px] mt-5 w-full flex items-center justify-center">
              <Loader style={{ width: "100%", height: "100%" }}></Loader>
            </div>
          )}
          {!serviceCtx.isLoadingDeleteItem && (
            <div className="flex w-full items-center justify-between mt-5 ">
              <button
                className="flex h-[40px] w-[102px] text-sm items-center font-sans text-[13px] cursor-pointer text-gray-700 p-2 rounded-[8px] border border-solid border-gray-500 bg-gray-300 hover:bg-opacity-70 active:border active:border-gray-500 active:outline-none active:ring ring-blue-200  justify-center mr-2"
                onClick={handleClickHideDelete}
              >
                Atrás
              </button>

              <button
                className=" flex h-[40px] w-[102px] text-sm items-center  font-sans text-[13px]  cursor-pointer  text-white  p-2 rounded-[8px] border  border-white bg-darkred  ring-red3  hover:bg-opacity-90 active:border active:border-red5 active:outline-none active:ring justify-center"
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

export default ServiceDetail;
