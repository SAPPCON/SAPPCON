import React, { useReducer, useEffect, useContext, useState } from "react";
import AuthenticationContext from "./AuthenticationContext";

const BudgetContext = React.createContext({
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

const defaultBudgetState = {
  items: [],
};

// Función que obtiene los datos del backend, en el caso del presupuesto solo los headers.
const fetchData = async (token) => {
  try {
    const response = await fetch(
      process.env.NEXT_PUBLIC_GET_BUDGET_HEADERS_URL,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      const responseData = await response.json();
      throw new Error(
        responseData.error || "Error al obtener los presupuestos"
      );
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

const newBudget = async (item) => {
  try {
    const token = localStorage.getItem("token");
    //const token = localStorage.getItem("sadasdasd12312");

    const response = await fetch(process.env.NEXT_PUBLIC_ADD_BUDGET_URL, {
      method: "POST",
      body: JSON.stringify(item),
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const responseData = await response.json();
      throw new Error(responseData.error || "Error al agregar el presupuesto");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

const deleteBudget = async (budgetId) => {
  try {
    const token = localStorage.getItem("token");
    //const token = localStorage.getItem("sadasdasd12312");

    console.log("ID QUE LLEGA AL BORRAR DEL CONTEXTO: ", budgetId);

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_DELETE_BUDGET_URL}${budgetId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("HACE EL FETCH ", response);

    if (!response.ok) {
      console.log(" HAY ERROR");
      const responseData = await response.json();
      console.log("ERROR: ", responseData);
      throw new Error(responseData.error || "Error al eliminar el presupuesto");
    }

    console.log("NO HAY ERROR");
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

const budgetsReducer = (state, action) => {
  switch (action.type) {
    case "LOAD_BUDGETS":
      return {
        ...state,
        items: action.budgets,
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
      return defaultBudgetState;
  }
};

export const BudgetContextProvider = (props) => {
  const [budgetsState, dispatchBudgetsAction] = useReducer(
    budgetsReducer,
    defaultBudgetState
  );

  //const token = "sadasdasd12312";
  const { token } = useContext(AuthenticationContext);

  useEffect(() => {
    const loadBudgets = async () => {
      dispatchBudgetsAction({ type: "SET_LOADING" });
      try {
        const data = await fetchData(token);
        dispatchBudgetsAction({
          type: "LOAD_BUDGETS",
          budgets: data,
        });
      } catch (error) {
        dispatchBudgetsAction({ type: "SET_ERROR", error: error.message });
      }
    };

    // Ejecutar la carga cuando se monta el componente o cambia el token
    if (token) {
      loadBudgets();
    }
  }, [token]);

  const addItemHandler = async (item) => {
    dispatchBudgetsAction({ type: "SET_LOADING_ADD_ITEM" });
    try {
      const data = await newBudget(item);

      //Creamos el presupuesto a partir del presupuesto creado que nos retorna la base de datos, para almacenarlo en el contexto.
      const newItem = {
        user_id: data.messageinfo.user_id,
        building_id: data.messageinfo.building_id,
        customer_id: data.messageinfo.customer_id,
        customer_name: data.messageinfo.customer_name,
        amount: data.messageinfo.amount,
        status: data.messageinfo.status,
        _id: data.messageinfo._id,
      };

      //Agrego el presupuesto tambien en el contexto, asi se actualiza la lista de presupuestos.
      dispatchBudgetsAction({
        type: "ADD_ITEM",
        item: newItem,
      });
      dispatchBudgetsAction({ type: "SET_SUCCESS_ADD_ITEM" });
    } catch (error) {
      dispatchBudgetsAction({
        type: "SET_ERROR_ADD_ITEM",
        error: error.message,
      });
    }
  };

  const deleteItemHandler = async (id) => {
    try {
      dispatchBudgetsAction({ type: "SET_LOADING_DELETE_ITEM" });
      await deleteBudget(id);
      dispatchBudgetsAction({ type: "DELETE_ITEM", id: id });
      dispatchBudgetsAction({ type: "SET_SUCCESS_DELETE_ITEM" });
    } catch (error) {
      dispatchBudgetsAction({
        type: "SET_ERROR_DELETE_ITEM",
        error: error.message,
      });
    }
  };

  const updateCustomerHandler = async (customer, newCustomerId) => {
    try {
      dispatchBudgetsAction({ type: "SET_LOADING_UPDATE_CUSTOMER_ITEM" });

      await updateCustomerBuilding(customer._id, newCustomerId);
      dispatchBudgetsAction({
        type: "UPDATE_CUSTOMER",
        id: customer._id,
        customer_id: newCustomerId,
      });

      dispatchBudgetsAction({ type: "SET_SUCCESS_UPDATE_CUSTOMER" });
    } catch (error) {
      dispatchBudgetsAction({
        type: "SET_ERROR_UPDATE_CUSTOMER",
        error: error.message,
      });
    }
  };

  const budgetContext = {
    items: budgetsState.items,
    addItem: addItemHandler,
    deleteItem: deleteItemHandler,
    updateCustomer: updateCustomerHandler,
    isLoading: budgetsState.isLoading,
    isLoadingAddItem: budgetsState.isLoadingAddItem,
    isLoadingDeleteItem: budgetsState.isLoadingDeleteItem,
    isLoadingUpdateCustomer: budgetsState.isLoadingUpdateCustomer,
    error: budgetsState.error,
    errorAddItem: budgetsState.errorAddItem,
    errorDeleteItem: budgetsState.errorDeleteItem,
    errorUpdateCustomer: budgetsState.errorUpdateCustomer,
    successDeleteItem: budgetsState.successDeleteItem,
    successAddItem: budgetsState.successAddItem,
    successUpdateCustomer: budgetsState.successUpdateCustomer,
  };

  return (
    <BudgetContext.Provider value={{ budgetContext, dispatchBudgetsAction }}>
      {props.children}
    </BudgetContext.Provider>
  );
};

export default BudgetContext;
