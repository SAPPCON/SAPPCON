import React, { useReducer, useEffect, useContext, useState } from "react";
import AuthenticationContext from "./AuthenticationContext";

const CustomerContext = React.createContext({
  items: [],
  addItem: (item) => {},
  deleteItem: (item) => {},
  isLoading: false,
  isLoadingAddItem: false,
  isLoadingDeleteItem: false,
  error: "",
  errorAddItem: "",
  errorDeleteItem: "",
  successDeleteItem: false,
  successAddItem: false,
});

const defaultCustomerState = {
  items: [],
};

// Función que obtiene los datos del backend
const fetchData = async (token) => {
  try {
    const response = await fetch(process.env.NEXT_PUBLIC_GET_CUSTOMER_URL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const responseData = await response.json();
      throw {
        message: responseData.message || "Error al cargar clientes",
        messageinfo: responseData.messageinfo || "Detalles no disponibles",
      };
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};


const newCustomer = async (item) => {
  try {
    const token = localStorage.getItem("token");
    //const token = localStorage.getItem("sadasdasd12312");

    const response = await fetch(process.env.NEXT_PUBLIC_ADD_CUSTOMER_URL, {
      method: "POST",
      body: JSON.stringify(item),
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const responseData = await response.json();
      throw {
        message: responseData.message || "Error al agregar cliente",
        messageinfo: responseData.messageinfo || "Detalles no disponibles",
      };
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

const deleteCustomer = async (customerId) => {
  try {
    const token = localStorage.getItem("token");
    //const token = localStorage.getItem("sadasdasd12312");

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_DELETE_CUSTOMER_URL}${customerId}`,
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
        message: responseData.message || "Error al eliminar cliente",
        messageinfo: responseData.messageinfo || "Detalles no disponibles",
      };
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

const customerReducer = (state, action) => {
  switch (action.type) {
    case "LOAD_CUSTOMERS":
      return {
        ...state,
        items: action.customers,
        isLoading: false,
        isLoadingAddItem: false,
        isLoadingDeleteItem: false,
        error: "",
        errorAddItem: "",
        errorDeleteItem: "",
        successAddItem: false,
        successDeleteItem: false,
      };
    case "SET_LOADING":
      return {
        ...state,
        isLoading: true,
        isLoadingAddItem: false,
        isLoadingDeleteItem: false,
        error: "",
        errorAddItem: "",
        errorDeleteItem: "",
        successAddItem: false,
        successDeleteItem: false,
      };
    case "SET_LOADING_ADD_ITEM":
      return {
        ...state,
        isLoading: false,
        isLoadingAddItem: true,
        isLoadingDeleteItem: false,
        error: "",
        errorAddItem: "",
        errorDeleteItem: "",
        successAddItem: false,
        successDeleteItem: false,
      };
    case "SET_LOADING_DELETE_ITEM":
      return {
        ...state,
        isLoading: false,
        isLoadingAddItem: false,
        isLoadingDeleteItem: true,
        error: "",
        errorAddItem: "",
        errorDeleteItem: "",
        successAddItem: false,
        successDeleteItem: false,
      };
    case "SET_ERROR":
      return {
        ...state,
        isLoading: false,
        isLoadingAddItem: false,
        isLoadingDeleteItem: false,
        error: {
          message: action.error.message,
          messageinfo: action.error.messageinfo,
        },
        errorAddItem: "",
        errorDeleteItem: "",
        successAddItem: false,
        successDeleteItem: false,
      };
    case "SET_ERROR_ADD_ITEM":
      return {
        ...state,
        isLoading: false,
        isLoadingAddItem: false,
        isLoadingDeleteItem: false,
        error: "",
        errorAddItem: {
          message: action.error.message,
          messageinfo: action.error.messageinfo,
        },
        errorDeleteItem: "",
        successAddItem: false,
        successDeleteItem: false,
      };
    case "SET_ERROR_DELETE_ITEM":
      return {
        ...state,
        isLoading: false,
        isLoadingAddItem: false,
        isLoadingDeleteItem: false,
        error: "",
        errorAddItem: "",
        errorDeleteItem: {
          message: action.error.message,
          messageinfo: action.error.messageinfo,
        },
        successAddItem: false,
        successDeleteItem: false,
      };
    case "SET_SUCCESS_ADD_ITEM":
      return {
        ...state,
        isLoading: false,
        isLoadingAddItem: false,
        isLoadingDeleteItem: false,
        error: "",
        errorAddItem: "",
        errorDeleteItem: "",
        successAddItem: true,
        successDeleteItem: false,
      };
    case "SET_SUCCESS_DELETE_ITEM":
      return {
        ...state,
        isLoading: false,
        isLoadingAddItem: false,
        isLoadingDeleteItem: false,
        error: "",
        errorAddItem: "",
        errorDeleteItem: "",
        successAddItem: false,
        successDeleteItem: true,
      };
    case "ADD_ITEM":
      return {
        ...state,
        items: [...state.items, action.item],
        isLoading: false,
        isLoadingAddItem: false,
        isLoadingDeleteItem: false,
        error: "",
        errorAddItem: "",
        errorDeleteItem: "",
        successAddItem: false,
        successDeleteItem: false,
      };
    case "DELETE_ITEM":
      const updatedItems = state.items.filter((item) => item._id !== action.id);
      return {
        ...state,
        items: updatedItems,
        isLoading: false,
        isLoadingAddItem: false,
        isLoadingDeleteItem: false,
        error: "",
        errorAddItem: "",
        errorDeleteItem: "",
        successAddItem: false,
        successDeleteItem: false,
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
    default:
      return defaultCustomerState;
  }
};

export const CustomerContextProvider = (props) => {
  const [customerState, dispatchCustomersAction] = useReducer(
    customerReducer,
    defaultCustomerState
  );

  //const token = "sadasdasd12312";
  const { token } = useContext(AuthenticationContext);

  useEffect(() => {
    const loadCustomers = async () => {
      dispatchCustomersAction({ type: "SET_LOADING" });
      try {
        const data = await fetchData(token);
        dispatchCustomersAction({
          type: "LOAD_CUSTOMERS",
          customers: data,
        });
      } catch (error) {
        dispatchCustomersAction({
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
      loadCustomers();
    }
  }, [token]);

  const addItemHandler = async (item) => {
    dispatchCustomersAction({ type: "SET_LOADING_ADD_ITEM" });
    try {
      const data = await newCustomer(item);

      const newItem = {
        name: data.messageinfo.name,
        surname: data.messageinfo.surname,
        alias: data.messageinfo.alias,
        address: data.messageinfo.address,
        phone: data.messageinfo.phone,
        email: data.messageinfo.email,
        _id: data.messageinfo._id,
      };

      dispatchCustomersAction({
        type: "ADD_ITEM",
        item: newItem,
      });
      dispatchCustomersAction({ type: "SET_SUCCESS_ADD_ITEM" });
    } catch (error) {
      dispatchCustomersAction({
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
      dispatchCustomersAction({ type: "SET_LOADING_DELETE_ITEM" });
      await deleteCustomer(id);
      dispatchCustomersAction({ type: "DELETE_ITEM", id: id });
      dispatchCustomersAction({ type: "SET_SUCCESS_DELETE_ITEM" });
    } catch (error) {
      dispatchCustomersAction({
        type: "SET_ERROR_DELETE_ITEM",
        error: {
          message: error.message || "Error desconocido",
          messageinfo: error.messageinfo || "Detalles no disponibles",
        },
      });
    }
  };

  const customerContext = {
    items: customerState.items,
    addItem: addItemHandler,
    deleteItem: deleteItemHandler,
    isLoading: customerState.isLoading,
    isLoadingAddItem: customerState.isLoadingAddItem,
    isLoadingDeleteItem: customerState.isLoadingDeleteItem,
    error: customerState.error,
    errorAddItem: customerState.errorAddItem,
    errorDeleteItem: customerState.errorDeleteItem,
    successDeleteItem: customerState.successDeleteItem,
    successAddItem: customerState.successAddItem,
  };

  return (
    <CustomerContext.Provider
      value={{ customerContext, dispatchCustomersAction }}
    >
      {props.children}
    </CustomerContext.Provider>
  );
};

export default CustomerContext;
