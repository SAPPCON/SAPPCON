import Link from "next/link";
import { RxCross1 } from "react-icons/rx";
import { BiAccessibility } from "react-icons/bi";
import { RiImageAddFill } from "react-icons/ri";
import { useState, Fragment, useContext, useEffect } from "react";
import CustomerContext from "@/store/CustomerContext";
import Loader from "../UI/Loader";

//Si bien CustomerProfile esta contenido dentro de su padre CustomerList, al ser Absolute --> Customer Profile se va a ubicar en referencia al primer padre no estatico que haya. En este caso, como CustomerList que es el primer padre es Estatico, sube un nivel mas, es decir al padre de CustomerList y llega a Customer el cual es RELATIVE, entonces se va ubicar en referencia a ese (al igual que hace NewCustomer, y asi tanto NewCustomer y CustomerProfile estan en referencia al mismo contenedor y puedo ubicarlos igual y seguir un disenio similar)

const CustomerProfile = (props) => {
  const [showDelete, setShowDelete] = useState(false);
  const [errorRequest, setErrorRequest] = useState("");
  const [errorRequestAdd, setErrorRequestAdd] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [bigImageError, setBigImageError] = useState("");
  const { customerContext: customerCtx } = useContext(CustomerContext);

  //Muestra el modal y confirmacion de eliminacion. Este esta en el boton de eliminar original.
  const handleDelete = () => {
    setShowDelete(true);
  };

  //Esconde el fondo negro nuevo y confirmacion de eliminacion. Va al fondo negro nuevo y al boton de atras de la confirmacion de eliminacion.
  const handleClickHideDelete = () => {
    setShowDelete(false);
  };

  //Este va en el boton de eliminar de la confirmacion.
  const handleConfirmDelete = () => {
    //Escondo el nuevo fondo negro y el cartel de confimacion de eliminacion.
    setShowDelete(false);

    //Mando la request para borrar el cliente tanto de la BD como del contexto.
    customerCtx.deleteItem(props.clientData._id);

    //Saca solo la planilla, y deja el fondo negro original. Y quedan renderizados ambos fondos y el cartel de exito o error de la eliminacion (x el estado del context)
    props.hideClientFunctionBackground();
  };

  const [base64Image, setBase64Image] = useState(null); // Imagen en base64

  //Cuando se abre el perfil, se hace la request para la imagen.
  useEffect(() => {
    const fetchImage = async () => {
      try {
        setErrorRequest("");
        const token = localStorage.getItem("token");
        setIsLoading(true);

        const response = await fetch(
          process.env.NEXT_PUBLIC_DOWNLOAD_IMAGE_URL,
          {
            method: "POST", // Especifica el método POST (u otro adecuado)
            body: JSON.stringify({
              object_type: "Customer",
              object_id: props.clientData._id,
            }),
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          const responseData = await response.json();
          throw {
            message: responseData.message || "Error al cargar la imagen",
            messageinfo: responseData.messageinfo || "Detalles no disponibles",
          };
        }

        const data = await response.json();
        setBase64Image(data.image_b64 || null); // Usar el base64 recibido
      } catch (error) {
        setErrorRequest({
          message: error.message || "Error desconocido",
          messageinfo: error.messageinfo || "Detalles no disponibles",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchImage();
  }, []);

  // File Reader es asincrónico, entonces es necesario una promesa.
  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  // Esta es para mandar la request para cargar una imagen.
  const handleAddImage = async (e) => {
    setBigImageError("");
    const file = e.target.files[0];
    if (!file) {
      return;
    }

    // Verificar si el archivo ya es menor a 200KB antes de comprimir
    if (file.size > 50 * 1024) {
      // 200KB en bytes
      setBigImageError("Tamaño máximo permitido: 50KB");
      return;
    }

    try {
      const imageBase64 = await convertToBase64(file);
      const token = localStorage.getItem("token");

      setIsLoading(true);
      const response = await fetch(process.env.NEXT_PUBLIC_UPLOAD_IMAGE_URL, {
        method: "POST",
        body: JSON.stringify({
          object_type: "Customer",
          object_id: props.clientData._id,
          image_b64: imageBase64,
        }),
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const responseData = await response.json();
        throw {
          message:
            responseData.message || "Error al agregar imagen del cliente",
          messageinfo: responseData.messageinfo || "Detalles no disponibles",
        };
      }

      //const data = await response.json();
      setBase64Image(imageBase64); // Actualiza la imagen subida
    } catch (error) {
      setErrorRequestAdd({
        message: error.message || "Error desconocido",
        messageinfo: error.messageinfo || "Detalles no disponibles",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Fragment>
      <div className=" absolute top-12 left-1/2 transform -translate-x-1/2  z-40 bg-gray-100 rounded-[8px] border border-solid border-grayBorder w-[600px] ">
        <RxCross1
          className="text-[20px] absolute top-[10px] right-[10px] text-blackText cursor-pointer"
          onClick={props.hideClientFunctionBoth}
        ></RxCross1>
        <h1 className="font-sans text-[28px] font-normal text-blackText text-center border-b border-b-grayBorder">
          Datos del Cliente
        </h1>

        {/* Quito el px-6  del ul porque sino el borde inferior no llega hasta el contenedor padre, y coloco el px-6  en los elementos individuales menos el borde */}
        <ul className="flex flex-col  pt-6 pb-2 relative">
          <div
            className="absolute right-[24px] top-[24px] w-[150px] h-[150px] bg-gray-300 flex justify-center items-center truncate cursor-pointer hover:bg-gray-400 hover:opacity-70 transition duration-300 ease-in-out"
            onClick={() => document.getElementById("imageUpload").click()}
          >
            {isLoading ? (
              <Loader /> // Reemplazar por un ícono de carga si lo prefieres
            ) : base64Image ? (
              <img
                src={base64Image}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            ) : (
              <RiImageAddFill className="text-[130px]" />
            )}
            <input
              id="imageUpload"
              type="file"
              accept="image/*"
              onChange={handleAddImage}
              className="hidden"
            />
          </div>
          {bigImageError && (
            <h1 className="text-xs  text-red5 absolute top-[180px] right-[10px] ">
              {bigImageError}
            </h1>
          )}

          <li className="flex w-[70%] justify-between border-b border-b-grayBorder text-blackText font-sans text-[14px] mb-4 ">
            <div className="pl-6 mb-[12px] w-full truncate">
              <h1 className="mb-[4px] font-bold">Nombre</h1>
              <h1>
                {/* {profileCtx.name} */}
                {props.clientData.name}
              </h1>
            </div>
            <Link
              href={`/customer/name/${props.clientData._id}`}
              className="pr-6"
            >
              <button className=" h-[29px] px-2 cursor-pointer rounded-[8px] border border-solid border-grayBorder bg-grayBg1 text-[13px] shadow-md ring-blue5 hover:bg-grayBg2 hover:bg-opacity-15 active:border active:border-blue6 active:outline-none active:ring">
                Editar
              </button>
            </Link>
          </li>

          <li className="flex w-[70%] justify-between border-b border-b-grayBorder text-blackText font-sans text-[14px] mb-4">
            <div className="pl-6 mb-[12px] truncate">
              <h1 className="mb-[4px] font-bold">Apellido</h1>
              <h1>
                {/* {profileCtx.name} */}
                {props.clientData.surname}
              </h1>
            </div>
            <Link
              href={`/customer/lastname/${props.clientData._id}`}
              className="pr-6"
            >
              <button className=" h-[29px] px-2 cursor-pointer rounded-[8px] border border-solid border-grayBorder bg-grayBg1 text-[13px] shadow-md ring-blue5 hover:bg-grayBg2 hover:bg-opacity-15 active:border active:border-blue6 active:outline-none active:ring">
                Editar
              </button>
            </Link>
          </li>

          <li className="flex w-[70%] justify-between text-blackText font-sans text-[14px]  ">
            <div className="pl-6 mb-[12px] truncate">
              <h1 className="mb-[4px] font-bold">Alias</h1>
              <h1>
                {/* {profileCtx.name} */}
                {props.clientData.alias}
              </h1>
            </div>
            <Link
              href={`/customer/alias/${props.clientData._id}`}
              className="pr-6"
            >
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
                {props.clientData.address}
              </h1>
            </div>
            <Link
              href={`/customer/address/${props.clientData._id}`}
              className="pr-6"
            >
              <button className=" h-[29px] px-2 cursor-pointer rounded-[8px] border border-solid border-grayBorder bg-grayBg1 text-[13px] shadow-md ring-blue5 hover:bg-grayBg2 hover:bg-opacity-15 active:border active:border-blue6 active:outline-none active:ring">
                Editar
              </button>
            </Link>
          </li>
          <div className="h-[1px] bg-[#d5d9d9] w-full mb-[16px]"></div>
          <li className="flex w-[70%] justify-between text-blackText font-sans text-[14px]  ">
            <div className="pl-6 mb-[12px] truncate">
              <h1 className="mb-[4px] font-bold">Teléfono</h1>
              <h1>
                {/* {profileCtx.name} */}
                {props.clientData.phone}
              </h1>
            </div>
            <Link
              href={`/customer/phone/${props.clientData._id}`}
              className="pr-6"
            >
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
            <Link
              href={`/customer/email/${props.clientData._id}`}
              className="pr-6"
            >
              <button className=" h-[29px] px-2 cursor-pointer rounded-[8px] border border-solid border-grayBorder bg-grayBg1 text-[13px] shadow-md ring-blue5 hover:bg-grayBg2 hover:bg-opacity-15 active:border active:border-blue6 active:outline-none active:ring">
                Editar
              </button>
            </Link>
          </li>
          <div className="h-[1px] bg-[#d5d9d9] w-full mb-[16px]"></div>

          <li className=" px-[18px] ">
            <div className="flex items-center justify-end ">
              <button
                className="flex h-[36px] w-[102px] text-sm items-center font-sans text-[13px] cursor-pointer text-gray-700 p-2 rounded-[8px] border border-solid border-gray-500 bg-gray-300 hover:bg-opacity-70 active:border active:border-gray-500 active:outline-none active:ring ring-blue-200  justify-center mr-2"
                onClick={props.hideClientFunctionBoth}
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

      {/* afuera para q el z-50 pueda competir xq sino si esta en el div padre toma el z-30 del padre.e */}
      {showDelete && (
        <div
          className=" flex flex-col h-fit w-fit z-50   items-center rounded-xl border border-solid border-black  bg-white px-6 py-5 pb-2 font-sans text-[14px] text-blackText absolute top-2/3 left-1/2 transform -translate-x-1/2  -translate-y-1/2
           "
        >
          <h4 className="font-bold">
            ¿Está seguro de que desea eliminar este cliente?
          </h4>

          {customerCtx.isLoadingDeleteItem && (
            <div className="h-[40px] mt-5 w-full flex items-center justify-center">
              <Loader></Loader>
            </div>
          )}

          {!customerCtx.isLoadingDeleteItem && (
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

      {/* Este es el fondo negro adicional que se coloca para el cartel de confirmar borrado. Z-40 para que se haga delante del fondo negro original (z-30) y el customerProfile tambien tiene z-40, pero se ubica respecto a el componente padre entonces el fondo negro queda con priodidad.*/}

      {showDelete && (
        <div
          onClick={handleClickHideDelete}
          className=" fixed top-0 left-0 z-40   h-full  w-full  bg-black opacity-30  transition-opacity duration-1000"
        ></div>
      )}
    </Fragment>
  );
};

export default CustomerProfile;

//border-red5 ring-red3  focus:border-red5 focus:bg-white
