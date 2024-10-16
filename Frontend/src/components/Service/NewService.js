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
import Loader from "../UI/Loader";
import PopUpError from "../UI/PopUpError";
import PopUpSuccess from "../UI/PopUpSuccess";

const NewService = (props) => {
  const { serviceContext: serviceCtx } = useContext(ServiceContext);
  const { categoryContext: categoryCtx, dispatchCategoriesAction } =
    useContext(CategoryContext);
  const { measureUnitContext: measureUnitCtx, dispatchMeasureUnitsAction } =
    useContext(MeasureUnitContext);

  const Categories = categoryCtx.items;
  const measureUnits = measureUnitCtx.items;
  {
    /* ESTADOS Y REFERENCIAS DEL FORM */
  }
  const [nameError, setNameError] = useState("");
  const [categoryError, setCategoryError] = useState("");
  const [measureUnitError, setMeasureUnitError] = useState("");
  const [unitCostError, setUnitCostError] = useState("");
  const [unitPriceError, setUnitPriceError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const [showLoading, setShowLoading] = useState(false);

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

    const newService = {
      measure_unit_id: enteredUnitOfMeasurement,
      category_id: enteredCategory,
      name: enteredName,
      description: enteredDescription,
      cost: parseFloat(enteredUnitCost),
      price: parseFloat(enteredUnitPrice),
    };

    // Agregar el nuevo servicio
    serviceCtx.addItem(newService);
    setZNewService("z-20");
  };

  {
    /* ESTADOS Y FUNCIONES DE NUEVA CATEGORIA */
  }
  const [showAddCategory, setShowAddCategory] = useState(false); //Estado para renderizar el form de nueva categoria
  const [showfondonegro, setshowfondonegro] = useState(false); //Estado para renderizar el nuevo fondo negro con Z mayor a la planilla nuevo Servicio y al fondo negro.

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

      //Suponiendo que sale todo bien, se agrega la categoria a el contexto
      categoryCtx.addItem(enteredNewCategory);
    }
  };

  //Esta funcion es para quitar el cartel de aceptar exito u error y quitar el nuevo fondo negro.
  const handleAcceptCategory = () => {
    setshowfondonegro(false);
    dispatchCategoriesAction({ type: "SET_RESTART_ALL_ADD_ITEM" });
  };

  {
    /* ESTADOS Y FUNCIONES DE NUEVA CATEGORIA */
  }
  const [showAddMeasureUnit, setShowAddMeasureUnit] = useState(false);
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

      measureUnitCtx.addItem(enteredNewMeasureUnit);
    }
  };

  //Esta funcion es para quitar el cartel de aceptar exito u error y quitar el nuevo fondo negro.
  const handleAcceptMeasureUnit = () => {
    setshowfondonegro(false);
    dispatchMeasureUnitsAction({
      type: "SET_RESTART_ALL_ADD_ITEM_MEASUREUNIT",
    });
  };

  const handleBothBack = () => {
    handleNewCategoryBack();
    handleNewMeasureUnitBack();
    dispatchCategoriesAction({ type: "SET_RESTART_ALL_ADD_ITEM" });
    dispatchMeasureUnitsAction({
      type: "SET_RESTART_ALL_ADD_ITEM_MEASUREUNIT",
    });
  };

  //Absoluto al contenedor padre que es relativo

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
                <select
                  id="category"
                  //defaultValue={props.serviceData.categoria}
                  //onChange={(e) => handleCategoryChange(e.target.value)}
                  ref={categoryRef}
                  className={`w-full p-1 border border-gray-500 rounded-md focus:ring ring-blue5 focus:border focus:border-blue6 focus:outline-none cursor-pointer h-[31px]`}
                >
                  {Categories.map((category) => (
                    <option key={category._id} value={category._id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              )}
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
                <select
                  id="unitOfMeasurement"
                  ref={measureUnitRef}
                  //defaultValue={props.serviceData.unidadDeMedida}
                  //onChange={(e) => handleUnitChange(e.target.value)}
                  className={`w-full p-1 border border-gray-500 rounded-md focus:ring ring-blue5 focus:border focus:border-blue6 focus:outline-none cursor-pointer h-[31px]`}
                >
                  {measureUnits.map((measureUnit) => (
                    <option key={measureUnit._id} value={measureUnit._id}>
                      {measureUnit.name}
                    </option>
                  ))}
                </select>
              )}
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

          {/* Min h - 40 para que coincida con el alto del loader */}
          {!serviceCtx.isLoadingAddItem && (
            <div className="flex items-center justify-end min-h-[40px] ">
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
          )}

          {serviceCtx.isLoadingAddItem && (
            <div className="flex items-center justify-center ">
              <Loader></Loader>
            </div>
          )}
        </form>
      </div>

      {/*Uso FRAGMENT -> Todos los elementos que sean ABSOLUTE al estar fuera del DIV absoluto de NewService se van a ubicar respecto al contenedor de Service que es el padre no estatico mas cercano que tienen.*/}

      {serviceCtx.errorAddItem && (
        <PopUpError
          message={serviceCtx.errorAddItem.message}
          messageinfo={serviceCtx.errorAddItem.messageinfo}
          onAccept={props.hideNewServiceFunction}
          icon={HiOutlineExclamationTriangle}
        />
      )}

      {serviceCtx.successAddItem && (
        <PopUpSuccess
          message="Servicio Registrado."
          onAccept={props.hideNewServiceFunction}
          icon={FaCheckCircle}
        />
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

            {!categoryCtx.errorAddItem && !categoryCtx.isLoadingAddItem && (
              <div className="flex items-center justify-center h-[40px] mt-2 ">
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
            )}

            {categoryCtx.isLoadingAddItem && (
              <div className="flex items-center justify-center mt-2 ">
                <Loader></Loader>
              </div>
            )}
          </form>
        </div>
      )}

      {/* POP UP DE EXITO AGREGAR CATEGORIA -> Se queda el fondo negro y se va la planilla de registrar categoria*/}
      {categoryCtx.succesAddItem && (
        <PopUpSuccess
          message="Categoria registrada."
          onAccept={handleAcceptCategory}
          icon={FaCheckCircle}
        />
      )}

      {/* POP UP DE ERROR AGREGAR CATEGORIA -> Se queda el fondo negro y se va la planilla de registrar categoria*/}
      {categoryCtx.errorAddItem && (
        <PopUpError
          message={categoryCtx.errorAddItem.message}
          messageinfo={categoryCtx.errorAddItem.messageinfo}
          onAccept={handleAcceptCategory}
          icon={HiOutlineExclamationTriangle}
        />
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

            {!measureUnitCtx.errorAddItem &&
              !measureUnitCtx.isLoadingAddItem && (
                <div className="flex items-center justify-center h-[40px] mt-2 ">
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
              )}

            {measureUnitCtx.isLoadingAddItem && (
              <div className="flex items-center justify-center mt-2 ">
                <Loader></Loader>
              </div>
            )}
          </form>
        </div>
      )}

      {measureUnitCtx.succesAddItem && (
        <PopUpSuccess
          message="Unidad de Medida registrada."
          onAccept={handleAcceptMeasureUnit}
          icon={FaCheckCircle}
        />
      )}

      {/* POP UP DE ERROR AGREGAR CATEGORIA -> Se queda el fondo negro y se va la planilla de registrar categoria*/}
      {measureUnitCtx.errorAddItem && (
        <PopUpError
          message={measureUnitCtx.errorAddItem.message}
          messageinfo={measureUnitCtx.errorAddItem.messageinfo}
          onAccept={handleAcceptMeasureUnit}
          icon={HiOutlineExclamationTriangle}
        />
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
