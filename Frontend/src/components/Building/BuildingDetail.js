import Link from "next/link";
import { RxCross1 } from "react-icons/rx";
import { useState, Fragment, useContext } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { HiOutlineExclamationTriangle } from "react-icons/hi2";
import BuildingContext from "@/store/BuildingContext";
import CustomerContext from "@/store/CustomerContext";
import Loader from "../UI/Loader";

const BuildingDetail = (props) => {
  const [showDelete, setShowDelete] = useState(false);

  const { customerContext: customerCtx } = useContext(CustomerContext);
  const { buildingContext: buildingCtx } = useContext(BuildingContext);

  const Customers = customerCtx.items;

  const handleCustomerChange = (newCustomerId) => {
    buildingCtx.updateCustomer(props.buildingData, newCustomerId);
  };

  const handleDelete = () => {
    setShowDelete(true);
  };

  const handleClickHideDelete = () => {
    setShowDelete(false);
  };

  const handleConfirmDelete = () => {
    setShowDelete(false);
    buildingCtx.deleteItem(props.buildingData._id);
    props.hideBuildingFunctionBackground();
  };

  return (
    <Fragment>
      <div className=" absolute top-12 left-1/2 transform -translate-x-1/2  z-40 bg-gray-100 rounded-[8px] border border-solid border-grayBorder w-[600px] ">
        {buildingCtx.successUpdateCustomer && (
          <div
            className=" flex h-[56px] w-full   items-center rounded-xl border-[2px] border-l-[12px] border-solid border-greenBorder bg-white px-[18px] pb-[18px] pt-[14px] font-sans text-[14px] text-blackText absolute left-0 top-[-61px]
           "
          >
            <FaCheckCircle className="mr-1.5  align-top text-[18px] text-greenText"></FaCheckCircle>
            Cliente actualizado.
          </div>
        )}

        {buildingCtx.errorUpdateCustomer && (
          <div
            className=" flex h-20 w-full   rounded-xl border border-red5 bg-white p-4 ring-4 ring-inset 	
          ring-red2 ring-opacity-20 absolute left-0 top-[-85px]"
          >
            <HiOutlineExclamationTriangle className="mr-4  align-top text-[30px] text-red5"></HiOutlineExclamationTriangle>
            <div className="flex flex-col justify-center font-sans    ">
              <h1 className="text-lg  text-red5 ">
                {buildingCtx.errorUpdateCustomer.message}
              </h1>
              <h2 className="  text-xs text-blackText ">
                {buildingCtx.errorUpdateCustomer.messageinfo}
              </h2>
            </div>
          </div>
        )}

        <RxCross1
          className="text-[20px] absolute top-[10px] right-[10px] text-blackText cursor-pointer"
          onClick={props.hideBuildingFunctionBoth}
        ></RxCross1>
        <h1 className="font-sans text-[28px] font-normal text-blackText text-center border-b border-b-grayBorder">
          Datos de la Obra
        </h1>

        <ul className="flex flex-col  pt-3 pb-2 ">
          <li className="flex  justify-between border-b border-b-grayBorder text-blackText font-sans text-[14px] mb-4 ">
            <div className="pl-6 mb-[12px] w-full truncate">
              <h1 className="mb-[4px] font-bold">Nombre</h1>
              <h1>{props.buildingData.name}</h1>
            </div>
            <Link
              href={`/building/name/${props.buildingData._id}`}
              className="pr-6"
            >
              <button className=" h-[29px] px-2 cursor-pointer rounded-[8px] border border-solid border-grayBorder bg-grayBg1 text-[13px] shadow-md ring-blue5 hover:bg-grayBg2 hover:bg-opacity-15 active:border active:border-blue6 active:outline-none active:ring">
                Editar
              </button>
            </Link>
          </li>

          <li className="flex  justify-between text-blackText font-sans text-[14px] px-6 ">
            <div className="mb-4 w-[50%]">
              <label htmlFor="client" className="mb-[4px] font-bold">
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
                  id="client"
                  defaultValue={props.buildingData.customer_id}
                  onChange={(e) => handleCustomerChange(e.target.value)}
                  className={`w-full p-1 border border-gray-500 rounded-md focus:ring ring-blue5 focus:border focus:border-blue6 focus:outline-none cursor-pointer `}
                  disabled={customerCtx.isLoadingUpdateCustomer}
                >
                  {Customers.map((customer) => (
                    <option key={customer._id} value={customer._id}>
                      {customer.name}
                    </option>
                  ))}
                </select>
              )}
            </div>
          </li>
          <div className="h-[1px] bg-[#d5d9d9] w-full mb-[16px]"></div>

          <li className="flex  justify-between text-blackText font-sans text-[14px]  ">
            <div className="pl-6 mb-[12px] truncate">
              <h1 className="mb-[4px] font-bold">Dirección</h1>
              <h1>{props.buildingData.address}</h1>
            </div>
            <Link
              href={`/building/address/${props.buildingData._id}`}
              className="pr-6"
            >
              <button className=" h-[29px] px-2 cursor-pointer rounded-[8px] border border-solid border-grayBorder bg-grayBg1 text-[13px] shadow-md ring-blue5 hover:bg-grayBg2 hover:bg-opacity-15 active:border active:border-blue6 active:outline-none active:ring">
                Editar
              </button>
            </Link>
          </li>
          <div className="h-[1px] bg-[#d5d9d9] w-full mb-[16px]"></div>

          <li className="flex  justify-between text-blackText font-sans text-[14px]  ">
            <div className="pl-6 mb-[12px] line-clamp-5 overflow-y-auto">
              <h1 className="mb-[4px] font-bold">Descripción</h1>
              <h1 className="mr-1">{props.buildingData.description}</h1>
            </div>
            <Link
              href={`/building/description/${props.buildingData._id}`}
              className="pr-6"
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
                onClick={props.hideBuildingFunctionBoth}
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
            ¿Está seguro de que desea eliminar esta obra?
          </h4>

          {buildingCtx.isLoadingDeleteItem && (
            <div className="h-[40px] mt-5 w-full flex items-center justify-center">
              <Loader></Loader>
            </div>
          )}

          {!buildingCtx.isLoadingDeleteItem && (
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

export default BuildingDetail;
