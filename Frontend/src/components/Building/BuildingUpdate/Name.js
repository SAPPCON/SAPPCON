import BudgetNav from "../../Navigation/BudgetNav";
import BuildingNav from "../../Navigation/BuildingNav";
import CustomerNav from "../../Navigation/CustomerNav";
import StatsNav from "../../Navigation/StatsNav";
import HomeNav from "../../Navigation/HomeNav";
import Link from "next/link";
import { IoIosArrowForward } from "react-icons/io";
import { FaCheckCircle } from "react-icons/fa";
import { HiOutlineExclamationTriangle } from "react-icons/hi2";
import { useContext, useEffect, useRef, useState } from "react";
import Loader from "@/components/UI/Loader";
import ProfileNav from "@/components/Navigation/ProfileNav";
import ServiceNav from "@/components/Navigation/ServiceNav";
import { noEmptyValidate } from "@/utils/validationFunctions";
import BuildingContext from "@/store/BuildingContext";
import { useRouter } from "next/router";

const Name = ({ buildingId }) => {
  const [errorRequest, setErrorRequest] = useState("");
  const [correctRequest, setCorrectRequest] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const newNameInputRef = useRef();

  const { buildingContext: buildingCtx } = useContext(BuildingContext);

  const router = useRouter();

  const building = buildingCtx.items.find((item) => item._id === buildingId);
  const buildingName = building ? building.name : "Nombre no encontrado";

  useEffect(() => {
    const reloadViaRouter = sessionStorage.getItem("reloadViaRouter");

    if (reloadViaRouter) {
      sessionStorage.removeItem("reloadViaRouter");
      setCorrectRequest(true);
    }
  }, [router.asPath]);

  const submitHandler = async (event) => {
    event.preventDefault();
    setCorrectRequest(false);
    const enteredName = newNameInputRef.current.value;

    if (!noEmptyValidate(enteredName)) {
      setErrorRequest({
        message: "Hubo un problema",
        messageinfo: "Ingrese el nombre",
      });
      return;
    } else {
      setErrorRequest("");
    }

    setIsLoading(true);

    try {
      const token = localStorage.getItem("token");
      //const token = localStorage.getItem("sadasdasd12312");
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_UPDATE_BUILDING_URL}${buildingId}`,
        {
          method: "PUT",
          body: JSON.stringify({
            name: enteredName,
          }),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setIsLoading(false);

      if (!response.ok) {
        const responseData = await response.json();
        throw {
          message: responseData.message || "Error al actualizar el nombre",
          messageinfo: responseData.messageinfo || "Detalles no disponibles",
        };
      }

      setCorrectRequest(true);
      newNameInputRef.current.value = "";
      setErrorRequest("");

      sessionStorage.setItem("reloadViaRouter", "true");

      router.reload();
    } catch (error) {
      setErrorRequest({
        message: error.message || "Error desconocido",
        messageinfo: error.messageinfo || "Detalles no disponibles",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className=" min-h-screen flex flex-col  bg-gray-100 text-blackText font-sans min-w-[1200px] ">
      <div className="flex bg-white h-20 ">
        <div className="mx-auto flex justify-between items-center w-4/6 ">
          <HomeNav></HomeNav>
          <div className="flex items-center space-x-4 ">
            <ServiceNav></ServiceNav>
            <CustomerNav></CustomerNav>
            <div
              className=" rounded-md px-2 py-1   border-2 
                bg-darkblue border-white text-white cursor-default  "
            >
              Obras
            </div>
            <BudgetNav></BudgetNav>
            <StatsNav></StatsNav>
            <ProfileNav></ProfileNav>
          </div>
        </div>
      </div>

      <div className="flex justify-center px-[83px] pb-[130px]  pt-[14px]">
        <div className="mx-auto my-0 flex  max-w-[600px] grow flex-col">
          <div className="mb-[16px] mt-[8px] flex w-full  items-center text-[14px] ">
            <Link href="/building">
              <p className="cursor-pointer font-sans text-blueText hover:text-orangeText hover:underline">
                Tus Obras
              </p>
            </Link>
            <IoIosArrowForward className=" mx-1 text-[12px] text-[#555555]"></IoIosArrowForward>
            <p className="font-sans text-[#C45500]">
              Cambia el nombre de la obra
            </p>
          </div>

          {correctRequest && (
            <div
              className="mb-[5px] mt-[8px] flex h-[56px] w-full   items-center rounded-xl border-[2px] border-l-[12px] border-solid border-greenBorder bg-white px-[18px] pb-[18px] pt-[14px] font-sans text-[14px] text-blackText
           "
            >
              <FaCheckCircle className="mr-1.5  align-top text-[18px] text-greenText"></FaCheckCircle>
              Nombre de la obra actualizado.
            </div>
          )}

          {errorRequest && (
            <div
              className="mb-[5px] mt-[8px] flex h-20 w-full   rounded-xl border border-red5 bg-white p-4 ring-4 ring-inset 	
          ring-red2 ring-opacity-20 "
            >
              <HiOutlineExclamationTriangle className="mr-4  align-top text-[30px] text-red5"></HiOutlineExclamationTriangle>
              <div className="flex flex-col justify-center font-sans    ">
                <h1 className="text-lg  text-red5 ">{errorRequest.message}</h1>
                <h2 className="  text-xs text-blackText ">
                  {errorRequest.messageinfo}
                </h2>
              </div>
            </div>
          )}

          <h1 className="mb-[8px] font-sans text-[28px] font-normal text-blackText">
            Cambia el nombre de la obra
          </h1>
          <div className="flex flex-col rounded-[8px] border border-solid border-[#D5D9D9] px-[18px] py-[14px] font-sans">
            <div className="w-full text-[13px]">
              Si desea cambiar el nombre de la obra, puede hacerlo a
              continuación. Asegúrese de hacer clic en botón
              <strong> Guardar </strong> cuando termine.
            </div>
            <div className="mt-[22px] w-full">
              <form onSubmit={submitHandler}>
                <div className="pb-[2px] pl-[2px]  text-[13px] font-bold text-blackText">
                  Nuevo Nombre
                </div>
                <div className="mb-[22px]">
                  <input
                    className="m-[1px] w-[154px] rounded-[3px] border border-solid border-gray-500 px-[7px] py-[3px] ring-blue5  focus:border focus:border-blue6 focus:outline-none focus:ring"
                    ref={newNameInputRef}
                    placeholder={buildingName}
                  ></input>
                </div>

                {!isLoading && (
                  <button
                    className="mt-[14px] flex h-[36px] w-[102px] text-sm items-center  font-sans text-[13px]  cursor-pointer  text-white  p-2 rounded-md border border-solid border-white bg-darkblue  ring-blue5  hover:bg-opacity-90 active:border active:border-blue6 active:outline-none active:ring justify-center "
                    onClick={submitHandler}
                  >
                    Guardar
                  </button>
                )}

                {isLoading && <Loader />}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Name;
