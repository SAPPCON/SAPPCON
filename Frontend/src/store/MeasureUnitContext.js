import React, { useEffect, useState, useContext, useReducer } from "react";
import AuthenticationContext from "./AuthenticationContext";

const MeasureUnitContext = React.createContext({
  items: [],
  addItem: (item) => {},
  isLoading: false,
  isLoadingAddItem: false,
  error: "",
  errorAddItem: "",
});

const defaultMeasureUnitState = {
  items: [],
};

// Función que obtiene los datos del backend
const fetchData = async (token) => {
  try {
    const response = await fetch(process.env.NEXT_PUBLIC_GET_MEASUREUNIT_URL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const responseData = await response.json();
      throw new Error(
        responseData.error || "Error al obtener las unidades de medida"
      );
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

const newMeasureUnit = async (name) => {
  try {
    const token = localStorage.getItem("token");
    //const token = localStorage.getItem("sadasdasd12312");
    const response = await fetch(process.env.NEXT_PUBLIC_ADD_MEASUREUNIT_URL, {
      method: "POST",
      body: JSON.stringify({ name }),
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const responseData = await response.json();
      throw new Error(
        responseData.error || "Error al agregar unidad de medida"
      );
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

const measureUnitReducer = (state, action) => {
  switch (action.type) {
    case "LOAD_MEASUREUNIT":
      return {
        ...state,
        items: action.measureUnits,
        isLoading: false,
        error: null,
      };
    case "SET_LOADING":
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case "SET_LOADING_ADD_ITEM":
      return {
        ...state,
        isLoading: false,
        isLoadingAddItem: true,
        error: null,
        errorAddItem: null,
        succesAddItem: false,
      };
    case "SET_ERROR":
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };
    case "SET_ERROR_ADD_ITEM":
      return {
        ...state,
        isLoading: false,
        isLoadingAddItem: false,
        error: null,
        errorAddItem: action.error,
        succesAddItem: false,
      };
    case "SET_SUCCES_ADD_ITEM":
      return {
        ...state,
        isLoading: false,
        isLoadingAddItem: false,
        error: null,
        errorAddItem: null,
        succesAddItem: true,
      };

    case "ADD_ITEM":
      return {
        ...state,
        items: [...state.items, action.item],
        isLoading: false,
        isLoadingAddItem: false,
        error: null,
        errorAddItem: null,
        succesAddItem: false,
      };
    case "SET_RESTART_ALL_ADD_ITEM_MEASUREUNIT":
      return {
        ...state,
        isLoadingAddItem: false,
        errorAddItem: null,
        succesAddItem: false,
      };
    default:
      return defaultMeasureUnitState;
  }
};

export const MeasureUnitContextProvider = (props) => {
  const [measureUnitsState, dispatchMeasureUnitsAction] = useReducer(
    measureUnitReducer,
    defaultMeasureUnitState
  );

  //const token = "sadasdasd12312";
  const { token } = useContext(AuthenticationContext);

  useEffect(() => {
    const loadMeasureUnits = async () => {
      dispatchMeasureUnitsAction({ type: "SET_LOADING" });
      try {
        const data = await fetchData(token);
        dispatchMeasureUnitsAction({
          type: "LOAD_MEASUREUNIT",
          measureUnits: data,
        });
      } catch (error) {
        dispatchMeasureUnitsAction({ type: "SET_ERROR", error: error.message });
      }
    };

    // Ejecutar la carga cuando se monta el componente o cambia el token
    if (token) {
      loadMeasureUnits();
    }
  }, [token]);

  const addItemHandler = async (name) => {
    dispatchMeasureUnitsAction({ type: "SET_LOADING_ADD_ITEM" });
    try {
      const data = await newMeasureUnit(name);
      const newCateg = {
        name: data.messageinfo.name,
        _id: data.messageinfo._id,
        user_id: data.messageinfo.user_id,
      };

      dispatchMeasureUnitsAction({
        type: "ADD_ITEM",
        item: newCateg,
      });
      dispatchMeasureUnitsAction({ type: "SET_SUCCES_ADD_ITEM" });
    } catch (error) {
      dispatchMeasureUnitsAction({
        type: "SET_ERROR_ADD_ITEM",
        error: error.message,
      });
    }
  };

  const measureUnitContext = {
    items: measureUnitsState.items,
    addItem: addItemHandler,
    isLoading: measureUnitsState.isLoading,
    isLoadingAddItem: measureUnitsState.isLoadingAddItem,
    error: measureUnitsState.error,
    errorAddItem: measureUnitsState.errorAddItem,
    succesAddItem: measureUnitsState.succesAddItem,
  };

  return (
    <MeasureUnitContext.Provider
      value={{ measureUnitContext, dispatchMeasureUnitsAction }}
    >
      {props.children}
    </MeasureUnitContext.Provider>
  );
};

export default MeasureUnitContext;
