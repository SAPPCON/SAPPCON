const PopUpError = ({ message, messageinfo, onAccept, icon: Icon }) => {
  return (
    <div className="flex flex-col items-center h-fit  min-w-[250px] max-w-full rounded-xl border border-red5 bg-white ring-4 ring-inset ring-red2 ring-opacity-20 absolute z-50 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 px-[18px] py-[14px] ">
      <div className="flex w-full">
        <div className="flex items-center mr-3">
          <Icon className="text-[25px] text-red5" />
        </div>
        <div className="flex flex-col justify-center font-sans w-full ">
          <h1 className="text-lg text-red5">{message}</h1>
          <h2 className="text-xs h-auto text-blackText break-words ">
            {messageinfo}
          </h2>
        </div>
      </div>

      <button
        className="flex h-[36px] w-[102px] text-sm items-center font-sans text-[13px] cursor-pointer text-gray-700 p-2 rounded-[8px] border border-solid border-gray-500 bg-gray-300 hover:bg-opacity-70 active:border active:border-gray-500 active:outline-none active:ring ring-blue-200 justify-center mt-2"
        onClick={onAccept}
      >
        Aceptar
      </button>
    </div>
  );
};

export default PopUpError;
