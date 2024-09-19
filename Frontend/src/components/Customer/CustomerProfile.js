import Link from "next/link";
import { RxCross1 } from "react-icons/rx";
import { BiAccessibility } from "react-icons/bi";

//Si bien CustomerProfile esta contenido dentro de su padre CustomerList, al ser Absolute --> Customer Profile se va a ubicar en referencia al primer padre no estatico que haya. En este caso, como CustomerList que es el primer padre es Estatico, sube un nivel mas, es decir al padre de CustomerList y llega a Customer el cual es RELATIVE, entonces se va ubicar en referencia a ese (al igual que hace NewCustomer, y asi tanto NewCustomer y CustomerProfile estan en referencia al mismo contenedor y puedo ubicarlos igual y seguir un disenio similar)

const CustomerProfile = (props) => {
  return (
    <div className=" absolute top-12 left-1/2 transform -translate-x-1/2  z-40 bg-gray-100 rounded-[8px] border border-solid border-grayBorder w-[600px] ">
      <RxCross1
        className="text-[20px] absolute top-[10px] right-[10px] text-blackText cursor-pointer"
        onClick={props.hideClientFunction}
      ></RxCross1>
      <h1 className="font-sans text-[28px] font-normal text-blackText text-center border-b border-b-grayBorder">
        Datos del Cliente
      </h1>

      {/* Quito el px-6  del ul porque sino el borde inferior no llega hasta el contenedor padre, y coloco el px-6  en los elementos individuales menos el borde */}
      <ul className="flex flex-col  pt-6 pb-2 relative">
        <div className="absolute right-[24px] top-[24px] w-[150px] h-[150px] bg-gray-300 flex justify-center items-center truncate ">
          <BiAccessibility className="text-[130px] "></BiAccessibility>
        </div>
        <li className="flex w-[70%] justify-between border-b border-b-grayBorder text-blackText font-sans text-[14px] mb-4">
          <div className="pl-6 mb-[12px] w-full truncate">
            <h1 className="mb-[4px] font-bold">ID</h1>
            <h1>
              {/* {profileCtx.name} */}
              {props.clientData.id}
            </h1>
          </div>
        </li>

        <li className="flex w-[70%] justify-between border-b border-b-grayBorder text-blackText font-sans text-[14px] mb-4 ">
          <div className="pl-6 mb-[12px] w-full truncate">
            <h1 className="mb-[4px] font-bold">Nombre</h1>
            <h1>
              {/* {profileCtx.name} */}
              {props.clientData.name}
            </h1>
          </div>
          <Link href="/profile/name" className="pr-6">
            <button className=" h-[29px] px-2 cursor-pointer rounded-[8px] border border-solid border-grayBorder bg-grayBg1 text-[13px] shadow-md ring-blue5 hover:bg-grayBg2 hover:bg-opacity-15 active:border active:border-blue6 active:outline-none active:ring">
              Editar
            </button>
          </Link>
        </li>

        <li className="flex w-[70%] justify-between text-blackText font-sans text-[14px]  ">
          <div className="pl-6 mb-[12px] truncate">
            <h1 className="mb-[4px] font-bold">Apellido</h1>
            <h1>
              {/* {profileCtx.name} */}
              {props.clientData.apellido}
            </h1>
          </div>
          <Link href="/profile/name" className="pr-6">
            <button className=" h-[29px] px-2 cursor-pointer rounded-[8px] border border-solid border-grayBorder bg-grayBg1 text-[13px] shadow-md ring-blue5 hover:bg-grayBg2 hover:bg-opacity-15 active:border active:border-blue6 active:outline-none active:ring">
              Editar
            </button>
          </Link>
        </li>
        <div className="h-[1px] bg-[#d5d9d9] w-full mb-[16px]"></div>

        <li className="flex w-[70%] justify-between text-blackText font-sans text-[14px]  ">
          <div className="pl-6 mb-[12px] truncate">
            <h1 className="mb-[4px] font-bold">Nombre de Usuario</h1>
            <h1>
              {/* {profileCtx.name} */}
              {props.clientData.username}
            </h1>
          </div>
          <Link href="/profile/name" className="pr-6">
            <button className=" h-[29px] px-2 cursor-pointer rounded-[8px] border border-solid border-grayBorder bg-grayBg1 text-[13px] shadow-md ring-blue5 hover:bg-grayBg2 hover:bg-opacity-15 active:border active:border-blue6 active:outline-none active:ring">
              Editar
            </button>
          </Link>
        </li>
        <div className="h-[1px] bg-[#d5d9d9] w-full mb-[16px]"></div>

        <li className="flex w-[70%] justify-between text-blackText font-sans text-[14px]  ">
          <div className="pl-6 mb-[12px] truncate">
            <h1 className="mb-[4px] font-bold">Dirección</h1>
            <h1>
              {/* {profileCtx.name} */}
              {props.clientData.direccion}
            </h1>
          </div>
          <Link href="/profile/name" className="pr-6">
            <button className=" h-[29px] px-2 cursor-pointer rounded-[8px] border border-solid border-grayBorder bg-grayBg1 text-[13px] shadow-md ring-blue5 hover:bg-grayBg2 hover:bg-opacity-15 active:border active:border-blue6 active:outline-none active:ring">
              Editar
            </button>
          </Link>
        </li>
        <div className="h-[1px] bg-[#d5d9d9] w-full mb-[16px]"></div>
        <li className="flex w-[70%] justify-between text-blackText font-sans text-[14px]  ">
          <div className="pl-6 mb-[12px] truncate">
            <h1 className="mb-[4px] font-bold">Correo Electrónico</h1>
            <h1>
              {/* {profileCtx.name} */}
              {props.clientData.email}
            </h1>
          </div>
          <Link href="/profile/name" className="pr-6">
            <button className=" h-[29px] px-2 cursor-pointer rounded-[8px] border border-solid border-grayBorder bg-grayBg1 text-[13px] shadow-md ring-blue5 hover:bg-grayBg2 hover:bg-opacity-15 active:border active:border-blue6 active:outline-none active:ring">
              Editar
            </button>
          </Link>
        </li>
        <div className="h-[1px] bg-[#d5d9d9] w-full mb-[16px]"></div>

        <li className=" px-[18px] ">
          <div className="flex items-center justify-between ">
            <button
              className=" flex h-[36px] w-[102px] text-sm items-center  font-sans text-[13px]  cursor-pointer  text-white  p-2 rounded-[8px] border  border-white bg-darkred  ring-red3  hover:bg-opacity-90 active:border active:border-red5 active:outline-none active:ring justify-center"
              //onClick={submitHandler}
            >
              Eliminar
            </button>

            <button
              className=" flex h-[36px] w-[102px] text-sm items-center  font-sans text-[13px]  cursor-pointer  text-white  p-2 rounded-[8px] border border-solid border-white bg-darkblue  ring-blue5  hover:bg-opacity-90 active:border active:border-blue6 active:outline-none active:ring justify-center "
              onClick={props.hideClientFunction}
            >
              Atras
            </button>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default CustomerProfile;

//border-red5 ring-red3  focus:border-red5 focus:bg-white
