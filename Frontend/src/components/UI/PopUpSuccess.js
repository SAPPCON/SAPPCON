const PopUpSuccess = ({ message, onAccept, icon: Icon }) => {
  return (
    <div className="flex flex-col h-fit min-h-[97px] w-auto min-w-[250px] items-center rounded-xl border-[2px] border-l-[12px] border-solid border-greenBorder bg-white px-[18px] pt-[14px] font-sans text-[14px] text-blackText z-50 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
      <div className="flex items-center">
        <Icon className="mr-1.5 align-top text-[18px] text-greenText" />
        {message}
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

export default PopUpSuccess;
