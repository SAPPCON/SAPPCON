import React, { useEffect, useState, useContext, useReducer } from "react";
import AuthenticationContext from "./AuthenticationContext";

const MeasureUnitContext = React.createContext({
  items: [],
  addItem: (item) => {},
  deleteItem: (item) => {},
  updateItem: (item) => {},
  isLoading: false,
  isLoadingAddItem: false,
  isLoadingDeleteItem: false,
  isLoadingUpdateName: false,
  error: "",
  errorAddItem: "",
  errorDeleteItem: "",
  errorUpdateName: "",
  succesAddItem: false,
  successDeleteItem: false,
  succesUpdateName: false,
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
      throw {
        message:
          responseData.message || "Error al cargar las unidades de medida",
        messageinfo: responseData.messageinfo || "Detalles no disponibles",
      };
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
      throw {
        message: responseData.message || "Error al crear unidad de medida",
        messageinfo: responseData.messageinfo || "Detalles no disponibles",
      };
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

const deleteMeasureUnit = async (measureUnitId) => {
  try {
    const token = localStorage.getItem("token");
    //const token = localStorage.getItem("sadasdasd12312");

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_DELETE_MEASUREUNIT_URL}${measureUnitId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      const responseData = await response.json();
      throw {
        message:
          responseData.message || "Error al eliminar la unidad de medida",
        messageinfo: responseData.messageinfo || "Detalles no disponibles",
      };
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

const updateMeasureUnitName = async (measureUnit_id, newName) => {
  try {
    const token = localStorage.getItem("token");
    //const token = localStorage.getItem("sadasdasd12312");
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_UPDATE_MEASUREUNIT_URL}${measureUnit_id}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: newName }),
      }
    );

    if (!response.ok) {
      const responseData = await response.json();
      throw {
        message:
          responseData.message ||
          "Error al actualizar nombre de la unidad de medida",
        messageinfo: responseData.messageinfo || "Detalles no disponibles",
      };
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
    case "SET_LOADING_DELETE_ITEM":
      return {
        ...state,
        isLoadingDeleteItem: true,
        errorDeleteItem: "",
        successDeleteItem: false,
      };
    case "SET_LOADING_UPDATE_NAME_ITEM":
      return {
        ...state,
        isLoadingUpdateName: true,
        errorUpdateName: "",
        succesUpdateName: false,
      };
    case "SET_ERROR":
      return {
        ...state,
        isLoading: false,
        error: {
          message: action.error.message,
          messageinfo: action.error.messageinfo,
        },
      };
    case "SET_ERROR_ADD_ITEM":
      return {
        ...state,
        isLoading: false,
        isLoadingAddItem: false,
        error: null,
        errorAddItem: {
          message: action.error.message,
          messageinfo: action.error.messageinfo,
        },
        succesAddItem: false,
      };

    case "SET_ERROR_DELETE_ITEM":
      return {
        ...state,
        isLoadingDeleteItem: false,
        errorDeleteItem: {
          message: action.error.message,
          messageinfo: action.error.messageinfo,
        },
        successDeleteItem: false,
      };
    case "SET_ERROR_UPDATE_NAME":
      return {
        ...state,
        isLoadingUpdateName: false,
        errorUpdateName: {
          message: action.error.message,
          messageinfo: action.error.messageinfo,
        },
        succesUpdateName: false,
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

    case "SET_SUCCES_DELETE_ITEM":
      return {
        ...state,
        isLoadingDeleteItem: false,
        errorDeleteItem: "",
        successDeleteItem: true,
      };
    case "SET_SUCCES_UPDATE_NAME":
      return {
        ...state,
        isLoadingUpdateName: false,
        errorUpdateName: "",
        succesUpdateName: true,
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

    case "DELETE_ITEM":
      const updatedItems = state.items.filter((item) => item._id !== action.id);
      return {
        ...state,
        items: updatedItems,
        isLoadingDeleteItem: false,
        errorDeleteItem: "",
        successDeleteItem: false,
      };
    case "UPDATE_NAME":
      const updatedNameItems = state.items.map((item) =>
        item._id === action.id ? { ...item, name: action.name } : item
      );
      return {
        ...state,
        items: updatedNameItems,
        isLoadingUpdateName: false,
        errorUpdateName: "",
        succesUpdateName: false,
      };
    case "SET_RESTART_ALL_ADD_ITEM_MEASUREUNIT":
      return {
        ...state,
        isLoadingAddItem: false,
        errorAddItem: null,
        succesAddItem: false,
      };
    case "SET_RESTART_ALL_DELETE_ITEM":
      return {
        ...state,
        isLoadingDeleteItem: false,
        errorDeleteItem: "",
        successDeleteItem: false,
      };
    case "SET_RESTART_ALL_UPDATE_NAME":
      return {
        ...state,
        isLoadingUpdateName: false,
        errorUpdateName: "",
        succesUpdateName: false,
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
        dispatchMeasureUnitsAction({
          type: "SET_ERROR",
          error: {
            message: error.message || "Error desconocido",
            messageinfo: error.messageinfo || "Detalles no disponibles",
          },
        });
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
        error: {
          message: error.message || "Error desconocido",
          messageinfo: error.messageinfo || "Detalles no disponibles",
        },
      });
    }
  };

  const deleteItemHandler = async (id) => {
    try {
      dispatchMeasureUnitsAction({ type: "SET_LOADING_DELETE_ITEM" });
      await deleteMeasureUnit(id);
      dispatchMeasureUnitsAction({ type: "DELETE_ITEM", id: id });
      dispatchMeasureUnitsAction({ type: "SET_SUCCES_DELETE_ITEM" });
    } catch (error) {
      dispatchMeasureUnitsAction({
        type: "SET_ERROR_DELETE_ITEM",
        error: {
          message: error.message || "Error desconocido",
          messageinfo: error.messageinfo || "Detalles no disponibles",
        },
      });
    }
  };

  const updateMeasureUnitHandler = async (measureUnit, newName) => {
    try {
      dispatchMeasureUnitsAction({ type: "SET_LOADING_UPDATE_NAME_ITEM" });

      await updateMeasureUnitName(measureUnit._id, newName);
      dispatchMeasureUnitsAction({
        type: "UPDATE_NAME",
        id: measureUnit._id,
        name: newName,
      });

      dispatchMeasureUnitsAction({ type: "SET_SUCCES_UPDATE_NAME" });
    } catch (error) {
      dispatchMeasureUnitsAction({
        type: "SET_ERROR_UPDATE_NAME",
        error: {
          message: error.message || "Error desconocido",
          messageinfo: error.messageinfo || "Detalles no disponibles",
        },
      });
    }
  };

  const measureUnitContext = {
    items: measureUnitsState.items,
    addItem: addItemHandler,
    deleteItem: deleteItemHandler,
    updateItem: updateMeasureUnitHandler,
    isLoading: measureUnitsState.isLoading,
    isLoadingAddItem: measureUnitsState.isLoadingAddItem,
    isLoadingDeleteItem: measureUnitsState.isLoadingDeleteItem,
    isLoadingUpdateName: measureUnitsState.isLoadingUpdateName,
    error: measureUnitsState.error,
    errorAddItem: measureUnitsState.errorAddItem,
    errorDeleteItem: measureUnitsState.errorDeleteItem,
    errorUpdateName: measureUnitsState.errorUpdateName,
    succesAddItem: measureUnitsState.succesAddItem,
    successDeleteItem: measureUnitsState.successDeleteItem,
    succesUpdateName: measureUnitsState.succesUpdateName,
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
