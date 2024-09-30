import CategoryContext from "@/store/CategoryContext";
import MeasureUnitContext from "@/store/MeasureUnitContext";
import ServiceContext from "@/store/ServiceContext";
import { useState, useRef, useContext, Fragment } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { HiOutlineExclamationTriangle } from "react-icons/hi2";
import { RxCross1 } from "react-icons/rx";
import { CiSquarePlus } from "react-icons/ci";
import {
  noEmptyValidate,
  numberFormatValidate,
} from "@/utils/validationFunctions";

const NewService = (props) => {
  const serviceCtx = useContext(ServiceContext);
  const categoryCtx = useContext(CategoryContext);
  const measureUnitCtx = useContext(MeasureUnitContext);

  {
    /* ESTADOS Y REFERENCIAS DEL FORM */
  }
  const [nameError, setNameError] = useState("");
  const [categoryError, setCategoryError] = useState("");
  const [measureUnitError, setMeasureUnitError] = useState("");
  const [unitCostError, setUnitCostError] = useState("");
  const [unitPriceError, setUnitPriceError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");

  const nameRef = useRef();
  const categoryRef = useRef();
  const measureUnitRef = useRef();
  const unitCostRef = useRef();
  const unitPriceRef = useRef();
  const descriptionRef = useRef();

  {
    /* ESTADOS Y FUNCIONES DE NUEVO SERVICIO */
  }
  const [zNewService, setZNewService] = useState("z-40"); //Al aparecer ACEPTAR del exito o error de agregar nuevo servicio se hace Z de la planilla mas chico para que quede detras el fondo negro.
  //Esto de Aceptar exito o fallo de planilla se modifica el Z de la misma porque al tocar el boton o el fondo negro, queremos que se salga la planilla y volver a los servicios. A diferencia de el registrar categoria o unidad de medida que ponemos otro fondo cosa de al aceptar o tocar el fondo, que se quede la nueva planilla y el fondo negro original.

  //Ambos carteles se salen al tocar el boton "aceptar" con la funcion de props que oculta el fondo negro y la planilla de nuevo registro
  const [showAccept, setShowAccept] = useState(false); //Estado cartel de exito de registro.
  const [showAcceptFail, setShowAcceptFail] = useState(false); //Estado cartel de fallo de registro.

  //Funcion que trabaja el Registro de Nuevo Servicio
  const submitHandler = (event) => {
    event.preventDefault();

    const enteredName = nameRef.current.value;
    const enteredCategory = categoryRef.current.value;
    const enteredUnitOfMeasurement = measureUnitRef.current.value;
    const enteredUnitCost = unitCostRef.current.value;
    const enteredUnitPrice = unitPriceRef.current.value;
    const enteredDescription = descriptionRef.current.value;

    if (!noEmptyValidate(enteredName)) {
      setNameError("Ingrese el nombre.");
      return;
    } else {
      setNameError("");
    }

    if (enteredCategory === "") {
      setCategoryError("Selecciona una categoria.");
      return;
    } else {
      setCategoryError("");
    }

    if (enteredUnitOfMeasurement === "") {
      setMeasureUnitError("Selecciona una unidad de medida.");
      return;
    } else {
      setMeasureUnitError("");
    }

    if (!numberFormatValidate(enteredUnitCost)) {
      setUnitCostError("Ingrese un numero correcto.");
      return;
    } else {
      setUnitCostError("");
    }

    if (!numberFormatValidate(enteredUnitPrice)) {
      setUnitPriceError("Ingrese un numero correcto.");
      return;
    } else {
      setUnitPriceError("");
    }

    if (!noEmptyValidate(enteredDescription)) {
      setDescriptionError("Ingrese la descripción.");
      return;
    } else {
      setDescriptionError("");
    }

    //Si la request sale mal:
    //setShowAcceptFail(true);

    //Una vez que los chequeos estan bien, se hace la request a la BD y si esta bien nos retorna el objeto creado. Y ESE OBJETO AGREGAMOS AL CONTEXTO asi seguimos trabajando con info actualizada. Pero como aun no esta la parte del back, creo uno aca y agrego eso para simular.
    //De todas maneras, el agregar al contexto hace que se vea reflejado automaticamente en el componente porque se renderizan nuevamente aquellos componentes que usan el contexto que recien tuvo un cambio. Y luego, al hacer f5 o algo, siempre se ejecuta el LOADDATA y ya esta el nuevo elemento siempre.

    //Si sale todo bien se agrega al contexto y tambien se debe cambiar el Z del div del formulario a 20 para hacerlo mas chico que el background y que se vea el boton de exito con aceptar que oculta todo (background y planilla )

    setZNewService("z-20");
    setShowAccept(true);

    const newService = {
      id: Date.now(), // Puedes usar otro método para generar IDs únicos
      unidadDeMedida: enteredUnitOfMeasurement,
      categoria: enteredCategory,
      nombre: enteredName,
      descripcion: enteredDescription,
      costeUnitario: parseFloat(enteredUnitCost),
      precioUnitario: parseFloat(enteredUnitPrice),
    };

    // Agregar el nuevo servicio
    serviceCtx.addItem(newService);
  };

  {
    /* ESTADOS Y FUNCIONES DE NUEVA CATEGORIA */
  }
  const [showAddCategory, setShowAddCategory] = useState(false); //Estado para renderizar el form de nueva categoria
  const [showfondonegro, setshowfondonegro] = useState(false); //Estado para renderizar el nuevo fondo negro con Z mayor a la planilla nuevo Servicio y al fondo negro.
  const [showAddCategoryAcceptSuccess, setShowAddCategoryAcceptSuccess] =
    useState(false); //Estado para renderizar cartel de exito o error de registro de nueva categoria.
  const [showAddCategoryAcceptFail, setShowAddCategoryAcceptFail] =
    useState(false); //Estado para renderizar cartel de exito o error de registro de nueva categoria.
  const [nameNewCategoryError, setNameNewCategoryError] = useState(""); //Estado para renderizar el error de nueva categoria si el campo es incrrecto

  const nameNewCategoryRef = useRef(); //Referencia al input de nueva categoria.

  //Esta funcion responde al boton (+) y renderiza el fondo y el form de categoria.
  const handleNewCategory = () => {
    setShowAddCategory(true);
    setshowfondonegro(true);
  };

  //Esta funcion responde al boton atras o tocar el fondo negro y saca el fondo y el form de nuevo categoria.
  const handleNewCategoryBack = () => {
    setShowAddCategory(false);
    setshowfondonegro(false);

    //En caso q se toque el fondo negro y estemos en el cartel de aceptar de exito o error de registro, tambien se pone en falso dicho cartel. Para no hacer una funcion especifica para eso.
    setShowAddCategoryAcceptSuccess(false);
    setShowAddCategoryAcceptFail(false);
    setNameNewCategoryError(""); //Reseteamos el error en caso de que se equivoque y vuelva atras y vuelva a tocar para registrar categoria y no siga estando el error.
  };

  //Esta funcion se encarga de hacer la request para registrar el servicio. Si la request sale bien muestra cartel de exito y sino de error.
  const submitHandlerNewCategory = (event) => {
    event.preventDefault();
    const enteredNewCategory = nameNewCategoryRef.current.value;

    if (!noEmptyValidate(enteredNewCategory)) {
      setNameNewCategoryError("Ingrese el nombre.");
      return;
    } else {
      //Si el campo es correcto se manda la request.
      setNameNewCategoryError("");
      //Se quita la planilla de nueva categoria.
      setShowAddCategory(false);
      //Se muestra mensaje de EXITO o de ERROR segun corresponda. Tambien se agrega el isLoading.
      setShowAddCategoryAcceptSuccess(true); //exito request
      setShowAddCategoryAcceptFail(true); //error request

      //Suponiendo que sale todo bien, se agrega la categoria a el contexto
      const newcategory = {
        id: Date.now(),
        name: enteredNewCategory,
      };
      categoryCtx.addItem(newcategory);
    }
  };

  //Esta funcion es para quitar el cartel de aceptar exito u error y quitar el nuevo fondo negro.
  const handleAcceptCategory = () => {
    setShowAddCategoryAcceptSuccess(false);
    setShowAddCategoryAcceptFail(false);
    setshowfondonegro(false);
  };

  {
    /* ESTADOS Y FUNCIONES DE NUEVA CATEGORIA */
  }
  const [showAddMeasureUnit, setShowAddMeasureUnit] = useState(false);
  const [showAddMeasureUnitAcceptSuccess, setShowAddMeasureUnitAcceptSuccess] =
    useState(false);
  const [showAddMeasureUnitAcceptFail, setShowAddMeasureUnitAcceptFail] =
    useState(false);
  const [nameNewMeasureUnitError, setNameNewMeasureUnitError] = useState(""); //Estado para renderizar el error de nueva categoria si el campo es incrrecto

  const nameNewMeasureUnitRef = useRef(); //Referencia al input de nueva categoria.

  //Esta funcion responde al boton (+) y renderiza el fondo y el form de categoria.
  const handleNewMeasureUnit = () => {
    setShowAddMeasureUnit(true);
    setshowfondonegro(true);
  };

  //Esta funcion responde al boton atras o tocar el fondo negro y saca el fondo y el form de nuevo categoria.
  const handleNewMeasureUnitBack = () => {
    setShowAddMeasureUnit(false);
    setshowfondonegro(false);

    //En caso q se toque el fondo negro y estemos en el cartel de aceptar de exito o error de registro, tambien se pone en falso dicho cartel. Para no hacer una funcion especifica para eso.
    setShowAddMeasureUnitAcceptSuccess(false);
    setShowAddMeasureUnitAcceptFail(false);
    setNameNewMeasureUnitError(""); //Reseteamos el error en caso de que se equivoque y vuelva atras y vuelva a tocar para registrar categoria y no siga estando el error.
  };

  //Esta funcion se encarga de hacer la request para registrar el servicio. Si la request sale bien muestra cartel de exito y sino de error.
  const submitHandlerNewMeasureUnit = (event) => {
    event.preventDefault();
    const enteredNewMeasureUnit = nameNewMeasureUnitRef.current.value;

    if (!noEmptyValidate(enteredNewMeasureUnit)) {
      setNameNewMeasureUnitError("Ingrese el nombre.");
      return;
    } else {
      //Si el campo es correcto se manda la request.
      setNameNewMeasureUnitError("");
      //Se quita la planilla de nueva categoria.
      setShowAddMeasureUnit(false);
      //Se muestra mensaje de EXITO o de ERROR segun corresponda. Tambien se agrega el isLoading.
      setShowAddMeasureUnitAcceptSuccess(true); //exito request
      setShowAddMeasureUnitAcceptFail(true); //error request

      //Suponiendo que sale todo bien, se agrega la categoria a el contexto
      const newmeasureunit = {
        id: Date.now(),
        name: enteredNewMeasureUnit,
      };
      measureUnitCtx.addItem(newmeasureunit);
    }
  };

  //Esta funcion es para quitar el cartel de aceptar exito u error y quitar el nuevo fondo negro.
  const handleAcceptMeasureUnit = () => {
    setShowAddMeasureUnitAcceptSuccess(false);
    setShowAddMeasureUnitAcceptFail(false);
    setshowfondonegro(false);
  };

  const handleBothBack = () => {
    handleNewCategoryBack();
    handleNewMeasureUnitBack();
  };

  //Absoluto al contenedor padre que es relativo (Customer)

  return (
    <Fragment>
      <div
        className={`absolute top-12 left-1/2 transform -translate-x-1/2  bg-gray-100 rounded-[8px] border border-solid border-grayBorder w-[600px] ${zNewService}`}
      >
        <RxCross1
          className="text-[20px] absolute top-[10px] right-[10px] text-blackText cursor-pointer"
          onClick={props.hideNewServiceFunction}
        ></RxCross1>
        <h1 className="font-sans text-[28px] font-normal text-blackText text-center border-b border-b-grayBorder">
          Registar Servicio
        </h1>

        <form className="flex flex-col px-6 pt-6 pb-2 relative ">
          <div className="mb-4 max-w-[49%] relative">
            <label htmlFor="name" className="text-sm font-semibold block w-72">
              Nombre
            </label>
            <input
              id="name"
              type="name"
              placeholder="Pintura de exteriores"
              ref={nameRef}
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

          <div className="mb-4 w-full flex relative  ">
            <div className="w-[49%]">
              <label htmlFor="category" className="text-sm font-semibold block">
                Categoria
              </label>
              <select
                id="category"
                type="category"
                ref={categoryRef}
                className={`w-full p-1 border border-gray-500 rounded-md focus:ring ring-blue5 focus:border focus:border-blue6 focus:outline-none cursor-pointer ${
                  categoryError !== ""
                    ? " border-red5 ring-red3  focus:border-red5 focus:bg-white "
                    : ""
                }`}
              >
                <option value="">Seleccione una categoria</option>
                {categoryCtx.items.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
              {/*Lo hago absoluto y al div relativo asi el msg no entra en el flujo html y el boton + me queda siempre bien puesto */}
              {categoryError !== "" && (
                <p className="text-xs text-red5 absolute">{categoryError}</p>
              )}
            </div>

            {/*transition-transform permite animar transformaciones (sclae y rotate). La transformacion tiene 200ms y la animacion es ease-in-out -> suave al inicio y final) y hover:scale y active:scale son las transformaciones de escalar */}
            <div className="flex items-center">
              <CiSquarePlus
                className="text-[35px] cursor-pointer mt-[19px] text-blueTextDark hover:text-opacity-90 active:text-opacity-90 transition-transform duration-200 ease-in-out hover:scale-110 active:scale-95"
                onClick={handleNewCategory}
              />
            </div>
          </div>

          <div className="mb-4 w-full flex relative">
            <div className="w-[49%]">
              <label
                htmlFor="measureUnit"
                className="text-sm font-semibold block"
              >
                Unidad de Medida
              </label>
              <select
                id="measureUnit"
                type="measureUnit"
                ref={measureUnitRef}
                className={`w-full p-1 border border-gray-500 rounded-md focus:ring ring-blue5 focus:border focus:border-blue6 focus:outline-none cursor-pointer ${
                  measureUnitError !== ""
                    ? " border-red5 ring-red3  focus:border-red5 focus:bg-white "
                    : ""
                }`}
              >
                <option value="">Seleccione una unidad de medida</option>
                {measureUnitCtx.items.map((unit) => (
                  <option key={unit.id} value={unit.id}>
                    {unit.name}
                  </option>
                ))}
              </select>
              {measureUnitError !== "" && (
                <p className="mr-2  text-xs text-red5 absolute">
                  {measureUnitError}
                </p>
              )}
            </div>
            <div className="flex items-center">
              <CiSquarePlus
                className="text-[35px] cursor-pointer mt-[19px] text-blueTextDark hover:text-opacity-90 active:text-opacity-90 transition-transform duration-200 ease-in-out hover:scale-110 active:scale-95"
                onClick={handleNewMeasureUnit}
              />
            </div>
          </div>

          <div className="flex justify-between relative">
            <div className="mb-4 w-[49%]">
              <label htmlFor="unitCost" className="text-sm font-semibold block">
                Coste Unitario
              </label>
              <input
                id="unitCost"
                type="unitCost"
                ref={unitCostRef}
                placeholder="15,99"
                className={`w-full p-1 border border-gray-500 rounded-md focus:ring ring-blue5  focus:border focus:border-blue6 focus:outline-none    ${
                  unitCostError !== ""
                    ? " border-red5 ring-red3  focus:border-red5 focus:bg-white "
                    : ""
                }`}
              />
              {unitCostError !== "" && (
                <p className="mr-2  text-xs text-red5 absolute">
                  {unitCostError}
                </p>
              )}
            </div>

            <div className="mb-4 w-[49%] relative">
              <label
                htmlFor="unitPrice"
                className="text-sm font-semibold block"
              >
                Precio Unitario
              </label>
              <input
                id="unitPrice"
                type="unitPrice"
                ref={unitPriceRef}
                placeholder="192,24"
                className={`w-full p-1 border border-gray-500 rounded-md focus:ring ring-blue5  focus:border focus:border-blue6 focus:outline-none    ${
                  unitPriceError !== ""
                    ? " border-red5 ring-red3  focus:border-red5 focus:bg-white "
                    : ""
                }`}
              />
              {unitPriceError !== "" && (
                <p className="mr-2  text-xs text-red5 absolute">
                  {unitPriceError}
                </p>
              )}
            </div>
          </div>

          <div className="mb-4 w-full relative">
            <label
              htmlFor="description"
              className="text-sm font-semibold block"
            >
              Descripción
            </label>
            <input
              id="description"
              type="description"
              ref={descriptionRef}
              placeholder="Pintura de superficies exteriores con recubrimientos resistentes al clima."
              className={`w-full p-1 border border-gray-500 rounded-md focus:ring ring-blue5  focus:border focus:border-blue6 focus:outline-none    ${
                descriptionError !== ""
                  ? " border-red5 ring-red3  focus:border-red5 focus:bg-white "
                  : ""
              }`}
            />
            {descriptionError !== "" && (
              <p className="mr-2  text-xs text-red5 absolute">
                {descriptionError}
              </p>
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
      </div>

      {/*Uso FRAGMENT -> Todos los elementos que sean ABSOLUTE al estar fuera del DIV absoluto de NewService se van a ubicar respecto al contenedor de Service que es el padre no estatico mas cercano que tienen.*/}

      {showAcceptFail && (
        <div
          className="flex flex-col items-center h-fit w-[250px]   rounded-xl border border-red5 bg-white  ring-4 ring-inset 	
          ring-red2 ring-opacity-20 z-50 absolute top-1/2 left-1/2 transform -translate-x-1/2  -translate-y-1/2   px-[18px]  py-[14px]    "
        >
          <div className="flex w-full ">
            <div className="flex items-center mr-3">
              <HiOutlineExclamationTriangle className="text-[25px] text-red5"></HiOutlineExclamationTriangle>
            </div>
            <div className="flex flex-col justify-center font-sans   ">
              <h1 className="text-lg  text-red5 ">Hubo un problema</h1>
              <h2 className="  text-xs h-[30px] text-blackText line-clamp-2 ">
                Msg de erroaasdasdsa asdasdas asdasdasdasdasas
                dddddddddddddddddddddddd dddddd asdasdas asd
              </h2>
            </div>
          </div>

          <button
            className=" flex h-[36px] w-[102px] text-sm items-center font-sans text-[13px] cursor-pointer text-gray-700 p-2 rounded-[8px] border border-solid border-gray-500 bg-gray-300 hover:bg-opacity-70 active:border active:border-gray-500 active:outline-none active:ring ring-blue-200  justify-center mt-2"
            onClick={props.hideNewServiceFunction}
          >
            Aceptar
          </button>
        </div>
      )}

      {showAccept && (
        <div
          className=" flex flex-col h-fit w-[250px]  items-center rounded-xl border-[2px] border-l-[12px] border-solid border-greenBorder bg-white px-[18px]  py-[14px] font-sans text-[14px] text-blackText z-50 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
         "
        >
          <div className="flex">
            <FaCheckCircle className="mr-1.5  align-top text-[18px] text-greenText"></FaCheckCircle>
            Servicio Registrado.
          </div>

          <button
            className=" flex h-[36px] w-[102px] text-sm items-center font-sans text-[13px] cursor-pointer text-gray-700 p-2 rounded-[8px] border border-solid border-gray-500 bg-gray-300 hover:bg-opacity-70 active:border active:border-gray-500 active:outline-none active:ring ring-blue-200  justify-center mt-2"
            onClick={props.hideNewServiceFunction}
          >
            Aceptar
          </button>
        </div>
      )}

      {/* POP UP AGREGAR CATEGORIA */}
      {showAddCategory && (
        <div
          className={`absolute z-50 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  bg-gray-100 rounded-[8px] border border-solid border-grayBorder w-[300px]  `}
        >
          <h1 className="font-sans text-[22px] font-normal text-blackText text-center border-b border-b-grayBorder">
            Registar Categoria
          </h1>
          <form className="flex flex-col px-6 pt-6 pb-2 relative ">
            <div className="mb-4 w-full relative">
              <label
                htmlFor="newcategory"
                className="text-sm font-semibold block w-72"
              >
                Nombre
              </label>
              <input
                id="newcategory"
                type="newcategory"
                placeholder="Instalaciones eléctricas"
                ref={nameNewCategoryRef}
                className={`w-full p-1 border   border-gray-500 rounded-md focus:ring ring-blue5  focus:border focus:border-blue6 focus:outline-none    ${
                  nameNewCategoryError !== ""
                    ? " border-red5 ring-red3  focus:border-red5 focus:bg-white "
                    : ""
                }`}
              />
              {nameNewCategoryError !== "" && (
                <p className="mr-2  text-xs text-red5 absolute">
                  {nameNewCategoryError}
                </p>
              )}
            </div>

            <div className="flex items-center justify-center mt-2 ">
              <button
                className="flex h-[36px] w-[102px] text-sm items-center font-sans text-[13px] cursor-pointer text-gray-700 p-2 rounded-[8px] border border-solid border-gray-500 bg-gray-300 hover:bg-opacity-70 active:border active:border-gray-500 active:outline-none active:ring ring-blue-200  justify-center mr-2"
                onClick={handleNewCategoryBack}
              >
                Atrás
              </button>

              <button
                className=" flex h-[36px] w-[102px] text-sm items-center  font-sans text-[13px]  cursor-pointer  text-white  p-2 rounded-[8px] border border-solid border-white bg-darkblue  ring-blue5  hover:bg-opacity-90 active:border active:border-blue6 active:outline-none active:ring justify-center"
                onClick={submitHandlerNewCategory}
              >
                Registrar
              </button>
            </div>
          </form>
        </div>
      )}

      {/* POP UP DE EXITO AGREGAR CATEGORIA -> Se queda el fondo negro y se va la planilla de registrar categoria*/}
      {showAddCategoryAcceptSuccess && (
        <div
          className=" flex flex-col h-fit w-[250px]  items-center rounded-xl border-[2px] border-l-[12px] border-solid border-greenBorder bg-white px-[18px]  py-[14px] font-sans text-[14px] text-blackText absolute z-50 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
"
        >
          <div className="flex">
            <FaCheckCircle className="mr-1.5  align-top text-[18px] text-greenText"></FaCheckCircle>
            Categoria registrada.
          </div>

          <button
            className=" flex h-[36px] w-[102px] text-sm items-center font-sans text-[13px] cursor-pointer text-gray-700 p-2 rounded-[8px] border border-solid border-gray-500 bg-gray-300 hover:bg-opacity-70 active:border active:border-gray-500 active:outline-none active:ring ring-blue-200  justify-center mt-2"
            onClick={handleAcceptCategory}
          >
            Aceptar
          </button>
        </div>
      )}

      {/* POP UP DE EXITO AGREGAR CATEGORIA -> Se queda el fondo negro y se va la planilla de registrar categoria*/}
      {showAddCategoryAcceptFail && (
        <div
          className="flex flex-col items-center h-fit w-[250px]   rounded-xl border border-red5 bg-white  ring-4 ring-inset 	
          ring-red2 ring-opacity-20 absolute z-50 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  px-[18px]  py-[14px]    "
        >
          <div className="flex w-full ">
            <div className="flex items-center mr-3">
              <HiOutlineExclamationTriangle className="text-[25px] text-red5"></HiOutlineExclamationTriangle>
            </div>
            <div className="flex flex-col justify-center font-sans   ">
              <h1 className="text-lg  text-red5 ">Hubo un problema</h1>
              <h2 className="  text-xs h-[30px] text-blackText line-clamp-2 ">
                Msg de erroaasdasdsa asdasdas asdasdasdasdasas
                dddddddddddddddddddddddd dddddd asdasdas asd
              </h2>
            </div>
          </div>

          <button
            className=" flex h-[36px] w-[102px] text-sm items-center font-sans text-[13px] cursor-pointer text-gray-700 p-2 rounded-[8px] border border-solid border-gray-500 bg-gray-300 hover:bg-opacity-70 active:border active:border-gray-500 active:outline-none active:ring ring-blue-200  justify-center mt-2"
            onClick={handleAcceptCategory}
          >
            Aceptar
          </button>
        </div>
      )}

      {/* POP UP AGREGAR UNIDAD DE MEDIDA */}

      {showAddMeasureUnit && (
        <div
          className={`absolute z-50 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  bg-gray-100 rounded-[8px] border border-solid border-grayBorder w-[300px]  `}
        >
          <h1 className="font-sans text-[22px] font-normal text-blackText text-center border-b border-b-grayBorder">
            Registar Unidad de medida
          </h1>
          <form className="flex flex-col px-6 pt-6 pb-2 relative ">
            <div className="mb-4 w-full relative">
              <label
                htmlFor="newmeasureunit"
                className="text-sm font-semibold block w-72"
              >
                Nombre
              </label>
              <input
                id="newmeasureunit"
                type="newmeasureunit"
                placeholder="Metro Cuadrados"
                ref={nameNewMeasureUnitRef}
                className={`w-full p-1 border   border-gray-500 rounded-md focus:ring ring-blue5  focus:border focus:border-blue6 focus:outline-none    ${
                  nameNewMeasureUnitError !== ""
                    ? " border-red5 ring-red3  focus:border-red5 focus:bg-white "
                    : ""
                }`}
              />
              {nameNewMeasureUnitError !== "" && (
                <p className="mr-2  text-xs text-red5 absolute">
                  {nameNewMeasureUnitError}
                </p>
              )}
            </div>

            <div className="flex items-center justify-center mt-2 ">
              <button
                className="flex h-[36px] w-[102px] text-sm items-center font-sans text-[13px] cursor-pointer text-gray-700 p-2 rounded-[8px] border border-solid border-gray-500 bg-gray-300 hover:bg-opacity-70 active:border active:border-gray-500 active:outline-none active:ring ring-blue-200  justify-center mr-2"
                onClick={handleNewMeasureUnitBack}
              >
                Atrás
              </button>

              <button
                className=" flex h-[36px] w-[102px] text-sm items-center  font-sans text-[13px]  cursor-pointer  text-white  p-2 rounded-[8px] border border-solid border-white bg-darkblue  ring-blue5  hover:bg-opacity-90 active:border active:border-blue6 active:outline-none active:ring justify-center"
                onClick={submitHandlerNewMeasureUnit}
              >
                Registrar
              </button>
            </div>
          </form>
        </div>
      )}

      {/* POP UP DE EXITO AGREGAR Unidad de medida -> Se queda el fondo negro y se va la planilla de registrar unidad de medida*/}
      {showAddMeasureUnitAcceptSuccess && (
        <div
          className=" flex flex-col h-fit w-[250px]  items-center rounded-xl border-[2px] border-l-[12px] border-solid border-greenBorder bg-white px-[18px]  py-[14px] font-sans text-[14px] text-blackText absolute z-50 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
"
        >
          <div className="flex">
            <FaCheckCircle className="mr-1.5  align-top text-[18px] text-greenText"></FaCheckCircle>
            Unidad de Medida registrada.
          </div>

          <button
            className=" flex h-[36px] w-[102px] text-sm items-center font-sans text-[13px] cursor-pointer text-gray-700 p-2 rounded-[8px] border border-solid border-gray-500 bg-gray-300 hover:bg-opacity-70 active:border active:border-gray-500 active:outline-none active:ring ring-blue-200  justify-center mt-2"
            onClick={handleAcceptMeasureUnit}
          >
            Aceptar
          </button>
        </div>
      )}

      {/* POP UP DE EXITO AGREGAR UNIDAD DE MEDIDA -> Se queda el fondo negro y se va la planilla de registrar unidad de medida*/}
      {showAddMeasureUnitAcceptFail && (
        <div
          className="flex flex-col items-center h-fit w-[250px]   rounded-xl border border-red5 bg-white  ring-4 ring-inset 	
          ring-red2 ring-opacity-20 absolute z-50 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  px-[18px]  py-[14px]    "
        >
          <div className="flex w-full ">
            <div className="flex items-center mr-3">
              <HiOutlineExclamationTriangle className="text-[25px] text-red5"></HiOutlineExclamationTriangle>
            </div>
            <div className="flex flex-col justify-center font-sans   ">
              <h1 className="text-lg  text-red5 ">Hubo un problema</h1>
              <h2 className="  text-xs h-[30px] text-blackText line-clamp-2 ">
                Msg de erroaasdasdsa asdasdas asdasdasdasdasas
                dddddddddddddddddddddddd dddddd asdasdas asd
              </h2>
            </div>
          </div>

          <button
            className=" flex h-[36px] w-[102px] text-sm items-center font-sans text-[13px] cursor-pointer text-gray-700 p-2 rounded-[8px] border border-solid border-gray-500 bg-gray-300 hover:bg-opacity-70 active:border active:border-gray-500 active:outline-none active:ring ring-blue-200  justify-center mt-2"
            onClick={handleAcceptMeasureUnit}
          >
            Aceptar
          </button>
        </div>
      )}

      {/* NUEVO FONDO NEGRO -> Se usa para nueva cateogria y nueva unidad de medida*/}
      {showfondonegro && (
        <div
          onClick={handleBothBack}
          className=" fixed top-0 left-0 z-40   h-full  w-full  bg-black opacity-30  transition-opacity duration-1000"
        ></div>
      )}
    </Fragment>
  );
};

export default NewService;
