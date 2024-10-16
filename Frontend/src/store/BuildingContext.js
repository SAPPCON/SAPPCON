import React, { useReducer, useEffect, useContext, useState } from "react";
import AuthenticationContext from "./AuthenticationContext";

const BuildingContext = React.createContext({
  items: [],
  addItem: (item) => {},
  deleteItem: (item) => {},
  updateCustomer: (item) => {},
  isLoading: false,
  isLoadingAddItem: false,
  isLoadingDeleteItem: false,
  isLoadingUpdateCustomer: false,
  error: "",
  errorAddItem: "",
  errorDeleteItem: "",
  errorUpdateCustomer: "",
  successAddItem: false,
  successDeleteItem: false,
  successUpdateCustomer: false,
});

const defaultBuildingState = {
  items: [],
};

// Función que obtiene los datos del backend
const fetchData = async (token) => {
  try {
    const response = await fetch(process.env.NEXT_PUBLIC_GET_BUILDING_URL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const responseData = await response.json();
      throw new Error(responseData.error || "Error al obtener las obras");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

const newBuilding = async (item) => {
  try {
    const token = localStorage.getItem("token");
    //const token = localStorage.getItem("sadasdasd12312");

    const response = await fetch(process.env.NEXT_PUBLIC_ADD_BUILDING_URL, {
      method: "POST",
      body: JSON.stringify(item),
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const responseData = await response.json();
      throw new Error(responseData.error || "Error al agregar la obra");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

const deleteBuilding = async (buildingId) => {
  try {
    const token = localStorage.getItem("token");
    //const token = localStorage.getItem("sadasdasd12312");

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_DELETE_BUILDING_URL}${buildingId}`,
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
      throw new Error(responseData.error || "Error al eliminar obra");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

const updateCustomerBuilding = async (building_id, newCustomerId) => {
  try {
    const token = localStorage.getItem("token");
    //const token = localStorage.getItem("sadasdasd12312");
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_UPDATE_BUILDING_URL}${building_id}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ customer_id: newCustomerId }),
      }
    );

    if (!response.ok) {
      const responseData = await response.json();
      throw new Error(
        responseData.error || "Error al actualizar el cliente de la obra"
      );
    }

    const data = await response.json();

    return data;
  } catch (error) {
    throw error;
  }
};

const buildingsReducer = (state, action) => {
  switch (action.type) {
    case "LOAD_BUILDINGS":
      return {
        ...state,
        items: action.services,
        isLoading: false,
        error: "",
      };
    case "SET_LOADING":
      return {
        ...state,
        isLoading: true,
        error: "",
      };
    case "SET_LOADING_ADD_ITEM":
      return {
        ...state,
        isLoadingAddItem: true,
        errorAddItem: "",
      };
    case "SET_LOADING_DELETE_ITEM":
      return {
        ...state,
        isLoadingDeleteItem: true,
        errorDeleteItem: "",
      };
    case "SET_LOADING_UPDATE_CUSTOMER_ITEM":
      return {
        ...state,
        isLoadingUpdateCustomer: true,
        errorUpdateCustomer: "",
        successUpdateCustomer: "",
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
        isLoadingAddItem: false,
        errorAddItem: action.error,
      };
    case "SET_ERROR_DELETE_ITEM":
      return {
        ...state,
        isLoadingDeleteItem: false,
        errorDeleteItem: action.error,
        successDeleteItem: false,
      };
    case "SET_ERROR_UPDATE_CUSTOMER":
      return {
        ...state,
        isLoadingUpdateCustomer: false,
        errorUpdateCustomer: action.error,
        successUpdateCustomer: false,
      };
    case "SET_SUCCESS_ADD_ITEM":
      return {
        ...state,
        isLoadingAddItem: false,
        errorAddItem: "",
        successAddItem: true,
      };
    case "SET_SUCCESS_DELETE_ITEM":
      return {
        ...state,
        isLoadingDeleteItem: false,
        errorDeleteItem: "",
        successDeleteItem: true,
      };
    case "SET_SUCCESS_UPDATE_CUSTOMER":
      return {
        ...state,
        isLoadingUpdateCustomer: false,
        errorUpdateCustomer: "",
        successUpdateCustomer: true,
      };
    case "ADD_ITEM":
      return {
        ...state,
        items: [...state.items, action.item],
        isLoadingAddItem: false,
        errorAddItem: "",
        successAddItem: false,
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
    case "UPDATE_CUSTOMER":
      const updatedCustomerItems = state.items.map((item) =>
        item._id === action.id
          ? { ...item, customer_id: action.customer_id }
          : item
      );
      return {
        ...state,
        items: updatedCustomerItems,
        isLoadingUpdateCustomer: false,
        errorUpdateCustomer: "",
        successUpdateCustomer: false,
      };
    case "SET_RESTART_ALL_NEW_ITEM":
      return {
        ...state,
        isLoadingAddItem: false,
        errorAddItem: "",
        successAddItem: false,
      };
    case "SET_RESTART_ALL_DELETE_ITEM":
      return {
        ...state,
        isLoadingDeleteItem: false,
        errorDeleteItem: "",
        successDeleteItem: false,
      };
    case "SET_RESTART_ALL_UPDATE_CUSTOMER":
      return {
        ...state,
        isLoadingUpdateCustomer: false,
        errorUpdateCustomer: "",
        successUpdateCustomer: false,
      };
    default:
      return defaultBuildingState;
  }
};

export const BuildingContextProvider = (props) => {
  const [buildingsState, dispatchBuildingsAction] = useReducer(
    buildingsReducer,
    defaultBuildingState
  );

  //const token = "sadasdasd12312";
  const { token } = useContext(AuthenticationContext);

  useEffect(() => {
    const loadServices = async () => {
      dispatchBuildingsAction({ type: "SET_LOADING" });
      try {
        const data = await fetchData(token);
        dispatchBuildingsAction({
          type: "LOAD_BUILDINGS",
          services: data,
        });
      } catch (error) {
        dispatchBuildingsAction({ type: "SET_ERROR", error: error.message });
      }
    };

    // Ejecutar la carga cuando se monta el componente o cambia el token
    if (token) {
      loadServices();
    }
  }, [token]);

  const addItemHandler = async (item) => {
    dispatchBuildingsAction({ type: "SET_LOADING_ADD_ITEM" });
    try {
      const data = await newBuilding(item);

      const newItem = {
        user_id: data.messageinfo.user_id,
        customer_id: data.messageinfo.customer_id,
        name: data.messageinfo.name,
        alias: data.messageinfo.alias,
        address: data.messageinfo.address,
        description: data.messageinfo.description,
        _id: data.messageinfo._id,
      };

      dispatchBuildingsAction({
        type: "ADD_ITEM",
        item: newItem, // La obra a agregar
      });
      dispatchBuildingsAction({ type: "SET_SUCCESS_ADD_ITEM" });
    } catch (error) {
      dispatchBuildingsAction({
        type: "SET_ERROR_ADD_ITEM",
        error: error.message,
      });
    }
  };

  const deleteItemHandler = async (id) => {
    try {
      dispatchBuildingsAction({ type: "SET_LOADING_DELETE_ITEM" });
      await deleteBuilding(id);
      dispatchBuildingsAction({ type: "DELETE_ITEM", id: id });
      dispatchBuildingsAction({ type: "SET_SUCCESS_DELETE_ITEM" });
    } catch (error) {
      dispatchBuildingsAction({
        type: "SET_ERROR_DELETE_ITEM",
        error: error.message,
      });
    }
  };

  const updateCustomerHandler = async (customer, newCustomerId) => {
    try {
      dispatchBuildingsAction({ type: "SET_LOADING_UPDATE_CUSTOMER_ITEM" });

      await updateCustomerBuilding(customer._id, newCustomerId);
      dispatchBuildingsAction({
        type: "UPDATE_CUSTOMER",
        id: customer._id,
        customer_id: newCustomerId,
      });

      dispatchBuildingsAction({ type: "SET_SUCCESS_UPDATE_CUSTOMER" });
    } catch (error) {
      dispatchBuildingsAction({
        type: "SET_ERROR_UPDATE_CUSTOMER",
        error: error.message,
      });
    }
  };

  const buildingContext = {
    items: buildingsState.items,
    addItem: addItemHandler,
    deleteItem: deleteItemHandler,
    updateCustomer: updateCustomerHandler,
    isLoading: buildingsState.isLoading,
    isLoadingAddItem: buildingsState.isLoadingAddItem,
    isLoadingDeleteItem: buildingsState.isLoadingDeleteItem,
    isLoadingUpdateCustomer: buildingsState.isLoadingUpdateCustomer,
    error: buildingsState.error,
    errorAddItem: buildingsState.errorAddItem,
    errorDeleteItem: buildingsState.errorDeleteItem,
    errorUpdateCustomer: buildingsState.errorUpdateCustomer,
    successDeleteItem: buildingsState.successDeleteItem,
    successAddItem: buildingsState.successAddItem,
    successUpdateCustomer: buildingsState.successUpdateCustomer,
  };

  return (
    <BuildingContext.Provider
      value={{ buildingContext, dispatchBuildingsAction }}
    >
      {props.children}
    </BuildingContext.Provider>
  );
};

export default BuildingContext;
