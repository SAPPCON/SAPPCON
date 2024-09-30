import Link from "next/link";
import { RxCross1 } from "react-icons/rx";
import { BiAccessibility } from "react-icons/bi";
import { useState, useRef, Fragment } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { HiOutlineExclamationTriangle } from "react-icons/hi2";

//Si bien CustomerProfile esta contenido dentro de su padre CustomerList, al ser Absolute --> Customer Profile se va a ubicar en referencia al primer padre no estatico que haya. En este caso, como CustomerList que es el primer padre es Estatico, sube un nivel mas, es decir al padre de CustomerList y llega a Customer el cual es RELATIVE, entonces se va ubicar en referencia a ese (al igual que hace NewCustomer, y asi tanto NewCustomer y CustomerProfile estan en referencia al mismo contenedor y puedo ubicarlos igual y seguir un disenio similar)

const BuildingDetail = (props) => {
  const [errorRequestClient, setErrorRequestClient] = useState("");
  const [correctRequestClient, setCorrectRequestClient] = useState(false);
  const [errorRequestActualState, setErrorRequestActualState] = useState("");
  const [correctRequestActualState, setCorrectRequestActualState] =
    useState(false);
  const [showDelete, setShowDelete] = useState(false);

  //Y en esta funcion se deberia mandar la request al back para cambiar este valor.
  const handleActualStateChange = (newValue) => {
    console.log("Nuevo valor seleccionado:", newValue);

    if (errorRequestActualState) {
      setErrorRequestActualState("Error al actualizar la Unidad de Medida");
      setCorrectRequestActualState(false);
    } else {
      setErrorRequestActualState("");
      setCorrectRequestActualState(true);
    }
  };

  const handleClientChange = (newValue) => {
    console.log("Nuevo valor seleccionado:", newValue);

    if (errorRequestClient) {
      setErrorRequestClient("Error al actualizar el Cliente");
      setCorrectRequestClient(false);
    } else {
      setErrorRequestClient("");
      setCorrectRequestClient(true);
    }
  };

  const handleDelete = () => {
    setShowDelete(true);
  };

  const handleClickHideDelete = () => {
    setShowDelete(false);
  };

  const handleConfirmDelete = () => {
    console.log("Eliminado");
  };

  //Todos los otros carteles de exito estan a 5px del titulo. Este mide 56px de ancho entonces se sube 56 + 5 = 61.
  return (
    <Fragment>
      <div className=" absolute top-12 left-1/2 transform -translate-x-1/2  z-40 bg-gray-100 rounded-[8px] border border-solid border-grayBorder w-[600px] ">
        {/*TODO lo relacionado a exito o error de las 2 actualizaciones de Select estan en estos 4 pedazos de codigo. Ambos absolutos respecto al contenedor padre (este div absoluto de arriba) */}

        {correctRequestClient && (
          <div
            className=" flex h-[56px] w-full   items-center rounded-xl border-[2px] border-l-[12px] border-solid border-greenBorder bg-white px-[18px] pb-[18px] pt-[14px] font-sans text-[14px] text-blackText absolute left-0 top-[-61px]
           "
          >
            <FaCheckCircle className="mr-1.5  align-top text-[18px] text-greenText"></FaCheckCircle>
            Cliente actualizado.
          </div>
        )}

        {correctRequestClient && (
          <div
            className=" flex h-20 w-full   rounded-xl border border-red5 bg-white p-4 ring-4 ring-inset 	
          ring-red2 ring-opacity-20 absolute left-0 top-[-85px]"
          >
            <HiOutlineExclamationTriangle className="mr-4  align-top text-[30px] text-red5"></HiOutlineExclamationTriangle>
            <div className="flex flex-col justify-center font-sans    ">
              <h1 className="text-lg  text-red5 ">Hubo un problema</h1>
              <h2 className="  text-xs text-blackText ">
                {correctRequestClient}
              </h2>
            </div>
          </div>
        )}

        {correctRequestActualState && (
          <div
            className=" flex h-[56px] w-full   items-center rounded-xl border-[2px] border-l-[12px] border-solid border-greenBorder bg-white px-[18px] pb-[18px] pt-[14px] font-sans text-[14px] text-blackText absolute left-0 top-[-61px]
           "
          >
            <FaCheckCircle className="mr-1.5  align-top text-[18px] text-greenText"></FaCheckCircle>
            Estado actual actualizado.
          </div>
        )}

        {errorRequestActualState && (
          <div
            className=" flex h-20 w-full   rounded-xl border border-red5 bg-white p-4 ring-4 ring-inset 	
          ring-red2 ring-opacity-20 absolute left-0 top-[-85px]"
          >
            <HiOutlineExclamationTriangle className="mr-4  align-top text-[30px] text-red5"></HiOutlineExclamationTriangle>
            <div className="flex flex-col justify-center font-sans    ">
              <h1 className="text-lg  text-red5 ">Hubo un problema</h1>
              <h2 className="  text-xs text-blackText ">
                {errorRequestActualState}
              </h2>
            </div>
          </div>
        )}

        <RxCross1
          className="text-[20px] absolute top-[10px] right-[10px] text-blackText cursor-pointer"
          onClick={props.hideBuildingFunction}
        ></RxCross1>
        <h1 className="font-sans text-[28px] font-normal text-blackText text-center border-b border-b-grayBorder">
          Datos de la Obra
        </h1>

        {/* Quito el px-6  del ul porque sino el borde inferior no llega hasta el contenedor padre, y coloco el px-6  en los elementos individuales menos el borde */}
        <ul className="flex flex-col  pt-3 pb-2 ">
          <li className="flex  justify-between border-b border-b-grayBorder text-blackText font-sans text-[14px] mb-4">
            <div className="pl-6 mb-[12px] w-full truncate">
              <h1 className="mb-[4px] font-bold">ID</h1>
              <h1>
                {/* {profileCtx.name} */}
                {props.buildingData.id}
              </h1>
            </div>
          </li>

          <li className="flex  justify-between border-b border-b-grayBorder text-blackText font-sans text-[14px] mb-4 ">
            <div className="pl-6 mb-[12px] w-full truncate">
              <h1 className="mb-[4px] font-bold">Nombre</h1>
              <h1>
                {/* {profileCtx.name} */}
                {props.buildingData.nombre}
              </h1>
            </div>
            <Link href="/building/name" className="pr-6">
              <button className=" h-[29px] px-2 cursor-pointer rounded-[8px] border border-solid border-grayBorder bg-grayBg1 text-[13px] shadow-md ring-blue5 hover:bg-grayBg2 hover:bg-opacity-15 active:border active:border-blue6 active:outline-none active:ring">
                Editar
              </button>
            </Link>
          </li>

          <li className="flex  justify-between text-blackText font-sans text-[14px] px-6 ">
            <div className="mb-4 w-[49%]">
              <label htmlFor="client" className="mb-[4px] font-bold">
                Cliente
              </label>
              <select
                id="client"
                //ref={categoryRef}
                defaultValue={props.buildingData.cliente}
                onChange={(e) => handleClientChange(e.target.value)}
                className={`w-full p-1 border border-gray-500 rounded-md focus:ring ring-blue5 focus:border focus:border-blue6 focus:outline-none cursor-pointer `}
              >
                <option value="Cliente A">Cliente A</option>
                <option value="Cliente B">Cliente B</option>
                <option value="Cliente C">Cliente C</option>
                <option value="Cliente D">Cliente D</option>
                <option value="Cliente E">Cliente E</option>
                <option value="Cliente F">Cliente F</option>
                <option value="Cliente G">Cliente G</option>
                <option value="Cliente H">Cliente H</option>
                <option value="Cliente I">Cliente I</option>
                <option value="Cliente J">Cliente J</option>
              </select>
            </div>

            <div className="mb-4 w-[49%]">
              <label htmlFor="initialState" className="mb-[4px] font-bold">
                Estado Actual
              </label>
              <select
                id="initialState"
                //ref={unitOfMeasurementRef} No es necesario usar la ref para este caso de obtener el valor cuando cambia, onChange ya nos permite acceder a ir directamente.
                defaultValue={props.buildingData.estadoInicial}
                //value={props.buildingData.unidadDeMedida}
                onChange={(e) => handleActualStateChange(e.target.value)}
                className={`w-full p-1 border border-gray-500 rounded-md focus:ring ring-blue5 focus:border focus:border-blue6 focus:outline-none cursor-pointer`}
              >
                {/*<option value="">Seleccione una opción</option> */}
                <option value="iniciado">iniciado</option>
                <option value="en proceso">en proceso</option>
                <option value="finalizado">finalizado</option>
              </select>
            </div>
          </li>
          <div className="h-[1px] bg-[#d5d9d9] w-full mb-[16px]"></div>

          <li className="flex  justify-between text-blackText font-sans text-[14px]  ">
            <div className="pl-6 mb-[12px] truncate">
              <h1 className="mb-[4px] font-bold">Dirección</h1>
              <h1>
                {/* {profileCtx.name} */}
                {props.buildingData.direccion}
              </h1>
            </div>
            <Link href="/building/address" className="pr-6">
              <button className=" h-[29px] px-2 cursor-pointer rounded-[8px] border border-solid border-grayBorder bg-grayBg1 text-[13px] shadow-md ring-blue5 hover:bg-grayBg2 hover:bg-opacity-15 active:border active:border-blue6 active:outline-none active:ring">
                Editar
              </button>
            </Link>
          </li>
          <div className="h-[1px] bg-[#d5d9d9] w-full mb-[16px]"></div>

          <li className="flex  justify-between text-blackText font-sans text-[14px]  ">
            <div className="pl-6 mb-[12px] line-clamp-5 overflow-y-auto">
              <h1 className="mb-[4px] font-bold">Descripción</h1>
              <h1 className="mr-1">
                {/* {profileCtx.name} */}
                {props.buildingData.descripcion}
              </h1>
            </div>
            <Link href="/building/description" className="pr-6">
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
                onClick={props.hideBuildingFunction}
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

      {/* Tuve que poner ambos afuera porque sino, el cartel estaba contenido en el DIV padre que tiene un Z-30 y si z-50 se veia pisado por eso. Entonces al sacar este afuera, le puede hacer competencia al z-40 del modal.
      Osea este cartel de chequear borrado y el modal estan posicionados respecto al contenedor de Servicio.js al igual que el Div de ServicioDetail*/}

      {showDelete && (
        <div
          className=" flex flex-col h-fit w-fit z-50   items-center rounded-xl border border-solid border-black  bg-white px-6 py-5 pb-2 font-sans text-[14px] text-blackText absolute top-2/3 left-1/2 transform -translate-x-1/2  -translate-y-1/2
           "
        >
          <h4 className="font-bold">
            ¿Está seguro de que desea eliminar esta obra?
          </h4>
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
