import React, { useReducer, useEffect, useContext } from "react";
import AuthenticationContext from "./AuthenticationContext";

const BudgetContext = React.createContext({
  items: [],
  addItem: (item) => {},
  deleteItem: (item) => {},
  updateBuilding: (item) => {},
  updateBudgetStatus: (item) => {},
  updateBudgetDate: (item) => {},
  isLoading: false,
  isLoadingAddItem: false,
  isLoadingDeleteItem: false,
  isLoadingUpdateBuilding: false,
  isLoadingUpdateBudgetStatus: false,
  isLoadingUpdateBudgetDate: false,
  error: "",
  errorAddItem: "",
  errorDeleteItem: "",
  errorUpdateBuilding: "",
  errorUpdateBudgetStatus: "",
  errorUpdateBudgetDate: "",
  successAddItem: false,
  successDeleteItem: false,
  successUpdateBuilding: false,
  successUpdateBudgetStatus: false,
  successUpdateBudgetDate: false,
});

const defaultBudgetState = {
  items: [],
};

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
      throw {
        message: responseData.message || "Error al cargar los presupuestos",
        messageinfo: responseData.messageinfo || "Detalles no disponibles",
      };
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
      throw {
        message: responseData.message || "Error al crear presupuesto",
        messageinfo: responseData.messageinfo || "Detalles no disponibles",
      };
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

    if (!response.ok) {
      const responseData = await response.json();
      throw {
        message: responseData.message || "Error al eliminar presupuesto",
        messageinfo: responseData.messageinfo || "Detalles no disponibles",
      };
    }

    const data = await response.json();

    return data;
  } catch (error) {
    throw error;
  }
};

const updateBuildingBudget = async (budget_id, newBuildingId) => {
  try {
    const token = localStorage.getItem("token");
    //const token = localStorage.getItem("sadasdasd12312");
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_UPDATE_BUDGET_URL}${budget_id}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ building_id: newBuildingId }),
      }
    );

    if (!response.ok) {
      const responseData = await response.json();
      throw {
        message:
          responseData.message || "Error al actualizar cliente del presupuesto",
        messageinfo: responseData.messageinfo || "Detalles no disponibles",
      };
    }

    const data = await response.json();

    return data;
  } catch (error) {
    throw error;
  }
};

const updateStateBudget = async (budget_id, newState) => {
  try {
    const token = localStorage.getItem("token");
    //const token = localStorage.getItem("sadasdasd12312");
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_UPDATE_BUDGET_URL}${budget_id}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newState }),
      }
    );

    if (!response.ok) {
      const responseData = await response.json();
      throw {
        message:
          responseData.message || "Error al actualizar estado del presupuesto",
        messageinfo: responseData.messageinfo || "Detalles no disponibles",
      };
    }

    const data = await response.json();

    return data;
  } catch (error) {
    throw error;
  }
};

const updateDateBudget = async (budget_id, date) => {
  try {
    const token = localStorage.getItem("token");
    //const token = localStorage.getItem("sadasdasd12312");
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_UPDATE_BUDGET_URL}${budget_id}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ date: date }),
      }
    );

    if (!response.ok) {
      const responseData = await response.json();
      throw {
        message:
          responseData.message || "Error al actualizar fecha del presupuesto",
        messageinfo: responseData.messageinfo || "Detalles no disponibles",
      };
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
    case "SET_LOADING_UPDATE_BUILDING_ITEM":
      return {
        ...state,
        isLoadingUpdateBuilding: true,
        errorUpdateBuilding: "",
        successUpdateBuilding: "",
      };

    case "SET_LOADING_UPDATE_BUDGET_STATUS_ITEM":
      return {
        ...state,
        isLoadingUpdateBudgetStatus: true,
        errorUpdateBudgetStatus: "",
        successUpdateBudgetStatus: "",
      };

    case "SET_LOADING_UPDATE_BUDGET_DATE_ITEM":
      return {
        ...state,
        isLoadingUpdateBudgetDate: true,
        errorUpdateBudgetDate: "",
        successUpdateBudgetDate: "",
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
        isLoadingAddItem: false,
        errorAddItem: {
          message: action.error.message,
          messageinfo: action.error.messageinfo,
        },
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
    case "SET_ERROR_UPDATE_BUILDING":
      return {
        ...state,
        isLoadingUpdateBuilding: false,
        errorUpdateBuilding: {
          message: action.error.message,
          messageinfo: action.error.messageinfo,
        },
        successUpdateBuilding: false,
      };
    case "SET_ERROR_UPDATE_BUDGET_STATUS":
      return {
        ...state,
        isLoadingUpdateBudgetStatus: false,
        errorUpdateBudgetStatus: {
          message: action.error.message,
          messageinfo: action.error.messageinfo,
        },
        successUpdateBudgetStatus: false,
      };
    case "SET_ERROR_UPDATE_BUDGET_DATE":
      return {
        ...state,
        isLoadingUpdateBudgetDate: false,
        errorUpdateBudgetDate: {
          message: action.error.message,
          messageinfo: action.error.messageinfo,
        },
        successUpdateBudgetDate: false,
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
    case "SET_SUCCESS_UPDATE_BUILDING":
      return {
        ...state,
        isLoadingUpdateBuilding: false,
        errorUpdateBuilding: "",
        successUpdateBuilding: true,
      };
    case "SET_SUCCESS_UPDATE_BUDGET_STATUS":
      return {
        ...state,
        isLoadingUpdateBudgetStatus: false,
        errorUpdateBudgetStatus: "",
        successUpdateBudgetStatus: true,
      };
    case "SET_SUCCESS_UPDATE_BUDGET_DATE":
      return {
        ...state,
        isLoadingUpdateBudgetDate: false,
        errorUpdateBudgetDate: "",
        successUpdateBudgetDate: true,
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
    case "UPDATE_BUILDING":
      const updatedBuildingItems = state.items.map((item) =>
        item._id === action.id
          ? {
              ...item,
              building_id: action.building_id,
              customer_id: action.customer_id,
            }
          : item
      );
      return {
        ...state,
        items: updatedBuildingItems,
        isLoadingUpdateBuilding: false,
        errorUpdateBuilding: "",
        successUpdateBuilding: false,
        isLoadingUpdateBudgetStatus: false,
        errorUpdateBudgetStatus: "",
        successUpdateBudgetStatus: false,
        isLoadingUpdateBudgetDate: false,
        errorUpdateBudgetDate: "",
        successUpdateBudgetDate: false,
      };

    case "UPDATE_BUDGET_STATUS":
      const updatedBudgetItemsStatus = state.items.map((item) =>
        item._id === action.id ? { ...item, status: action.status } : item
      );
      return {
        ...state,
        items: updatedBudgetItemsStatus,
        isLoadingUpdateBudgetStatus: false,
        errorUpdateBudgetStatus: "",
        successUpdateBudgetStatus: false,
        isLoadingUpdateBuilding: false,
        errorUpdateBuilding: "",
        successUpdateBuilding: false,
        isLoadingUpdateBudgetDate: false,
        errorUpdateBudgetDate: "",
        successUpdateBudgetDate: false,
      };
    case "UPDATE_BUDGET_DATE":
      const updatedBudgetItemsDate = state.items.map((item) =>
        item._id === action.id ? { ...item, date: action.date } : item
      );
      return {
        ...state,
        items: updatedBudgetItemsDate,
        isLoadingUpdateBudgetDate: false,
        errorUpdateBudgetDate: "",
        successUpdateBudgetDate: false,
        isLoadingUpdateBuilding: false,
        errorUpdateBuilding: "",
        successUpdateBuilding: false,
        isLoadingUpdateBudgetStatus: false,
        errorUpdateBudgetStatus: "",
        successUpdateBudgetStatus: false,
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
    case "SET_RESTART_ALL_UPDATE_BUILDING":
      return {
        ...state,
        isLoadingUpdateBuilding: false,
        errorUpdateBuilding: "",
        successUpdateBuilding: false,
        isLoadingUpdateBudgetStatus: false,
        errorUpdateBudgetStatus: "",
        successUpdateBudgetStatus: false,
        isLoadingUpdateBudgetDate: false,
        errorUpdateBudgetDate: "",
        successUpdateBudgetDate: false,
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
        dispatchBudgetsAction({
          type: "SET_ERROR",
          error: {
            message: error.message || "Error desconocido",
            messageinfo: error.messageinfo || "Detalles no disponibles",
          },
        });
      }
    };

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

      //Retorno el ID del budget creado para asi usarlo en la creacion de las lineas de servicio en caso de q haya.
      return data.messageinfo._id;
    } catch (error) {
      dispatchBudgetsAction({
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
      dispatchBudgetsAction({ type: "SET_LOADING_DELETE_ITEM" });
      await deleteBudget(id);
      dispatchBudgetsAction({ type: "DELETE_ITEM", id: id });
      dispatchBudgetsAction({ type: "SET_SUCCESS_DELETE_ITEM" });
    } catch (error) {
      dispatchBudgetsAction({
        type: "SET_ERROR_DELETE_ITEM",
        error: {
          message: error.message || "Error desconocido",
          messageinfo: error.messageinfo || "Detalles no disponibles",
        },
      });
    }
  };

  const updateBuildingHandler = async (building, newBuildingId) => {
    try {
      dispatchBudgetsAction({ type: "SET_LOADING_UPDATE_BUILDING_ITEM" });

      const newBudget = await updateBuildingBudget(building._id, newBuildingId);
      console.log(newBudget, newBudget.messageinfo.customer_id);
      dispatchBudgetsAction({
        type: "UPDATE_BUILDING",
        id: building._id,
        building_id: newBuildingId,
        customer_id: newBudget.messageinfo.customer_id,
      });

      dispatchBudgetsAction({ type: "SET_SUCCESS_UPDATE_BUILDING" });
    } catch (error) {
      dispatchBudgetsAction({
        type: "SET_ERROR_UPDATE_BUILDING",
        error: {
          message: error.message || "Error desconocido",
          messageinfo: error.messageinfo || "Detalles no disponibles",
        },
      });
    }
  };

  const updateBudgetStatusHandler = async (budget, newStatus) => {
    try {
      dispatchBudgetsAction({
        type: "SET_LOADING_UPDATE_BUDGET_STATUS_ITEM",
      });

      await updateStateBudget(budget._id, newStatus);
      dispatchBudgetsAction({
        type: "UPDATE_BUDGET_STATUS",
        id: budget._id,
        status: newStatus,
      });

      dispatchBudgetsAction({ type: "SET_SUCCESS_UPDATE_BUDGET_STATUS" });
    } catch (error) {
      dispatchBudgetsAction({
        type: "SET_ERROR_UPDATE_BUDGET_STATUS",
        error: {
          message: error.message || "Error desconocido",
          messageinfo: error.messageinfo || "Detalles no disponibles",
        },
      });
    }
  };

  const updateBudgetDateHandler = async (budget, newDate) => {
    try {
      dispatchBudgetsAction({
        type: "SET_LOADING_UPDATE_BUDGET_DATE_ITEM",
      });

      await updateDateBudget(budget._id, newDate);
      dispatchBudgetsAction({
        type: "UPDATE_BUDGET_DATE",
        id: budget._id,
        date: newDate,
      });

      dispatchBudgetsAction({ type: "SET_SUCCESS_UPDATE_BUDGET_DATE" });
    } catch (error) {
      dispatchBudgetsAction({
        type: "SET_ERROR_UPDATE_BUDGET_DATE",
        error: {
          message: error.message || "Error desconocido",
          messageinfo: error.messageinfo || "Detalles no disponibles",
        },
      });
    }
  };

  const budgetContext = {
    items: budgetsState.items,
    addItem: addItemHandler,
    deleteItem: deleteItemHandler,
    updateBuilding: updateBuildingHandler,
    updateBudgetStatus: updateBudgetStatusHandler,
    updateBudgetDate: updateBudgetDateHandler,
    isLoading: budgetsState.isLoading,
    isLoadingAddItem: budgetsState.isLoadingAddItem,
    isLoadingDeleteItem: budgetsState.isLoadingDeleteItem,
    isLoadingUpdateBuilding: budgetsState.isLoadingUpdateBuilding,
    isLoadingUpdateBudgetStatus: budgetsState.isLoadingUpdateBudgetStatus,
    isLoadingUpdateBudgetDate: budgetsState.isLoadingUpdateBudgetDate,
    error: budgetsState.error,
    errorAddItem: budgetsState.errorAddItem,
    errorDeleteItem: budgetsState.errorDeleteItem,
    errorUpdateBuilding: budgetsState.errorUpdateBuilding,
    errorUpdateBudgetStatus: budgetsState.errorUpdateBudgetStatus,
    errorUpdateBudgetDate: budgetsState.errorUpdateBudgetDate,
    successDeleteItem: budgetsState.successDeleteItem,
    successAddItem: budgetsState.successAddItem,
    successUpdateBuilding: budgetsState.successUpdateBuilding,
    successUpdateBudgetStatus: budgetsState.successUpdateBudgetStatus,
    successUpdateBudgetDate: budgetsState.successUpdateBudgetDate,
  };

  return (
    <BudgetContext.Provider value={{ budgetContext, dispatchBudgetsAction }}>
      {props.children}
    </BudgetContext.Provider>
  );
};

export default BudgetContext;
