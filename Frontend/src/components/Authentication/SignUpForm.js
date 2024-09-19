import { useState, useRef } from "react";

const SignUpForm = (props) => {
  const [nameError, setNameError] = useState("");
  const nameRef = useRef();
  const [lastNameError, setlastNameError] = useState("");
  const lastNameRef = useRef();
  const [userNameError, setuserNameError] = useState("");
  const userNameRef = useRef();
  const [password2Error, setPassword2Error] = useState("");
  const password2Ref = useRef();
  const [addressError, setaddressError] = useState("");
  const addressRef = useRef();

  const basicValidate = (word) => {
    const basicPattern = /^(?!.*\s).+$/;
    return basicPattern.test(word);
  };

  const noEmptyValidate = (word) => {
    const noEmptyPattern = /^[^\s]+$/;
    return noEmptyPattern.test(word);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    const enteredName = nameRef.current.value;
    const enteredLastName = lastNameRef.current.value;
    const enteredUserName = userNameRef.current.value;
    const enteredPassword2 = password2Ref.current.value;
    const enteredAddress = addressRef.current.value;

    if (!basicValidate(enteredName)) {
      setNameError("Mínimo 1 carácter y sin espacios en blanco.");
    } else {
      setNameError("");
    }

    if (!basicValidate(enteredLastName)) {
      setlastNameError("Mínimo 1 carácter y sin espacios en blanco.");
    } else {
      setlastNameError("");
    }

    if (!basicValidate(enteredUserName)) {
      setuserNameError("Mínimo 1 carácter y sin espacios en blanco.");
    } else {
      setuserNameError("");
    }

    if (!noEmptyValidate(enteredAddress)) {
      setaddressError("Mínimo 1 carácter.");
    } else {
      setaddressError("");
    }

    if (enteredPassword2 != props.password) {
      setPassword2Error("Las contraseñas no coinciden.");
    } else {
      setPassword2Error("");
    }
    console.log(props.password);
  };

  return (
    <div className="flex min-h-screen flex-col items-center bg-white text-black font-sans min-w-[1200px]  ">
      <h1 className="text-2xl font-bold mt-10 mb-4">SAPPCON</h1>
      <section className="mx-auto border p-7 rounded-md border-gray-300 max-w-96  ">
        <h1 className="font-medium text-xl mb-6 w-full">Registrarse</h1>
        <form className=" w-full " onSubmit={submitHandler}>
          <div className="mb-4">
            <label htmlFor="name" className="text-sm font-semibold block w-72">
              Nombre
            </label>
            <input
              type="name"
              id="name"
              ref={nameRef}
              className={`w-full p-1 border border-gray-500 rounded-md focus:ring ring-blue5  focus:border focus:border-blue6 focus:outline-none    ${
                nameError !== ""
                  ? " border-red5 ring-red3  focus:border-red5 focus:bg-white "
                  : ""
              }`}
            />
            {nameError !== "" && (
              <p className="mr-2  text-xs text-red5">{nameError}</p>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="lastName" className="text-sm font-semibold block">
              Apellido
            </label>
            <input
              type="lastName"
              id="lastName"
              ref={lastNameRef}
              className={`w-full p-1 border border-gray-500 rounded-md focus:ring ring-blue5  focus:border focus:border-blue6 focus:outline-none    ${
                lastNameError !== ""
                  ? " border-red5 ring-red3  focus:border-red5 focus:bg-white "
                  : ""
              }`}
            />
            {lastNameError !== "" && (
              <p className="mr-2  text-xs text-red5">{lastNameError}</p>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="userName" className="text-sm font-semibold block">
              Nombre de Usuario
            </label>
            <input
              type="userName"
              id="userName"
              ref={userNameRef}
              className={`w-full p-1 border border-gray-500 rounded-md focus:ring ring-blue5  focus:border focus:border-blue6 focus:outline-none    ${
                userNameError !== ""
                  ? " border-red5 ring-red3  focus:border-red5 focus:bg-white "
                  : ""
              }`}
            />
            {userNameError !== "" && (
              <p className="mr-2  text-xs text-red5">{userNameError}</p>
            )}
          </div>

          <div className="mb-4">
            <label type="password" className="text-sm font-semibold block">
              Repetir contraseña
            </label>
            <input
              type="password"
              id="password"
              ref={password2Ref}
              className={`w-full p-1 border border-gray-500 rounded-md focus:ring ring-blue5  focus:border focus:border-blue6 focus:outline-none    ${
                password2Error !== ""
                  ? " border-red5 ring-red3  focus:border-red5 focus:bg-white "
                  : ""
              }`}
            />
            {password2Error !== "" && (
              <p className="mr-2  text-xs text-red5">{password2Error}</p>
            )}
          </div>

          <div>
            <label htmlFor="address" className="text-sm font-semibold block">
              Dirección
            </label>
            <input
              type="address"
              id="address"
              ref={addressRef}
              className={`w-full p-1 border border-gray-500 rounded-md focus:ring ring-blue5  focus:border focus:border-blue6 focus:outline-none    ${
                addressError !== ""
                  ? " border-red5 ring-red3  focus:border-red5 focus:bg-white "
                  : ""
              }`}
            />
            {addressError !== "" && (
              <p className="mr-2  text-xs text-red5">{addressError}</p>
            )}
          </div>

          <button
            className="w-full mt-7 p-2 text-sm font-bold rounded-md   text-white   border border-solid border-white bg-darkblue  ring-blue5  hover:bg-opacity-90 active:border active:border-blue6 active:outline-none active:ring  transition  hover:duration-150"
            //onClick={props.onButtonClick}
          >
            Registrarse
          </button>
        </form>
      </section>
    </div>
  );
};

export default SignUpForm;
