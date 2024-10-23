import { useState, useContext } from "react";
import { FaCheckCircle } from "react-icons/fa";
import Loader from "../UI/Loader";
import { HiOutlineExclamationTriangle } from "react-icons/hi2";
import PopUpError from "../UI/PopUpError";
import PopUpSuccess from "../UI/PopUpSuccess";
import MeasureUnitContext from "@/store/MeasureUnitContext";
import MeasureUnitDetail from "./MeasureUnitDetail";

const MeasureUnitList = ({ filterText }) => {
  const [measureUnit, setMeasureUnit] = useState(null);
  const [showMeasureUnit, setShowMeasureUnit] = useState(false);
  const [showBackgroundMeasureUnit, setShowBackgroundMeasureUnit] =
    useState(false);

  const { measureUnitContext: measureUnitCtx, dispatchMeasureUnitsAction } =
    useContext(MeasureUnitContext);

  const handleClick = (measureUnit) => {
    setMeasureUnit(measureUnit);
    setShowMeasureUnit(true);
    setShowBackgroundMeasureUnit(true);
  };

  const handleClickHideMeasureUnitBoth = () => {
    setShowMeasureUnit(false);
    setShowBackgroundMeasureUnit(false);
    dispatchMeasureUnitsAction({ type: "SET_RESTART_ALL_DELETE_ITEM" });
    dispatchMeasureUnitsAction({ type: "SET_RESTART_ALL_UPDATE_NAME" });
  };

  const handleClickHideMeasureUnitBackground = () => {
    setShowMeasureUnit(false);
  };

  const handleClickAccept = () => {
    setShowBackgroundMeasureUnit(false);
    dispatchMeasureUnitsAction({ type: "SET_RESTART_ALL_DELETE_ITEM" });
  };

  const MeasureUnits = measureUnitCtx.items;

  const filteredMeasureUnit = MeasureUnits.filter((measureUnit) =>
    measureUnit.name.toLowerCase().includes(filterText)
  );

  if (
    MeasureUnits.length === 0 &&
    !measureUnitCtx.error &&
    !measureUnitCtx.errorDeleteItem &&
    !measureUnitCtx.successDeleteItem
  ) {
    return (
      <div className="font-sans text-blackText h-[420px] flex justify-center items-center font-medium">
        No tienes unidades de medida aún.
      </div>
    );
  }

  return (
    <div>
      <ul className="h-[420px] overflow-y-auto font-sans text-blackText">
        {measureUnitCtx.isLoading && (
          <div className="justify-center items-center flex w-full h-full ">
            <Loader></Loader>
          </div>
        )}
        {measureUnitCtx.error && (
          <div className="h-full justify-center flex flex-col items-center">
            <p>{measureUnitCtx.error.message}</p>
            <small>{measureUnitCtx.error.messageinfo}</small>
          </div>
        )}

        {!measureUnitCtx.error &&
          !measureUnitCtx.isLoading &&
          (filteredMeasureUnit.length > 0 ? (
            filteredMeasureUnit.map((measureUnit, index) => (
              <li
                key={measureUnit._id}
                onClick={() => handleClick(measureUnit)}
                className={`py-2 px-2 cursor-pointer hover:bg-grayBg2 hover:bg-opacity-70 ${
                  index !== MeasureUnits.length - 1
                    ? "border-b border-b-grayBorder"
                    : "border-b border-b-grayBorder"
                }`}
              >
                <strong>{measureUnit.name}</strong>
              </li>
            ))
          ) : (
            <li className="font-sans text-blackText font-medium flex justify-center items-center h-full w-full">
              No hay coincidencias con el filtro.
            </li>
          ))}
      </ul>

      {showMeasureUnit && measureUnit && (
        <MeasureUnitDetail
          measureUnitData={measureUnit}
          hideMeasureUnitFunctionBoth={handleClickHideMeasureUnitBoth}
          hideMeasureUnitFunctionBackground={
            handleClickHideMeasureUnitBackground
          }
        ></MeasureUnitDetail>
      )}

      {showBackgroundMeasureUnit && (
        <div
          onClick={handleClickHideMeasureUnitBoth}
          className=" fixed top-0 left-0 z-30  h-full  w-full  bg-black opacity-80  transition-opacity duration-1000"
        ></div>
      )}

      {measureUnitCtx.successDeleteItem && !measureUnitCtx.errorDeleteItem && (
        <PopUpSuccess
          message="Unidad de medida Eliminada."
          onAccept={handleClickAccept}
          icon={FaCheckCircle}
        />
      )}

      {!measureUnitCtx.successDeleteItem && measureUnitCtx.errorDeleteItem && (
        <PopUpError
          message={measureUnitCtx.errorDeleteItem.message}
          messageinfo={measureUnitCtx.errorDeleteItem.messageinfo}
          onAccept={handleClickAccept}
          icon={HiOutlineExclamationTriangle}
        />
      )}
    </div>
  );
};

export default MeasureUnitList;
