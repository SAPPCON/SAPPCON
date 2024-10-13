import React, { useReducer, useEffect, useContext, useState } from "react";
import AuthenticationContext from "./AuthenticationContext";

const ServiceContext = React.createContext({
  items: [],
  addItem: (item) => {},
  deleteItem: (item) => {},
  updateCategory: (name) => {},
  updateMeasureUnit: (name) => {},
  isLoading: false,
  isLoadingAddItem: false,
  isLoadingDeleteItem: false,
  isLoadingUpdateCategory: false,
  isLoadingUpdateMeasureUnit: false,
  error: "",
  errorAddItem: "",
  errorDeleteItem: "",
  errorUpdateCategory: "",
  errorUpdateMeasureUnit: "",
  successDeleteItem: false,
  successUpdateCategory: false,
  successUpdateMeasureUnit: false,
});

const defaultServiceState = {
  items: [],
};

// Función que obtiene los datos del backend
const fetchData = async (token) => {

  try {
    const response = await fetch(process.env.NEXT_PUBLIC_GET_SERVICE_URL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const responseData = await response.json();
      throw new Error(responseData.error || "Error al obtener los servicios");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

const newService = async (item) => {
  try {
    const token = localStorage.getItem("token");
    //const token = localStorage.getItem("sadasdasd12312");

    const response = await fetch(process.env.NEXT_PUBLIC_ADD_SERVICE_URL, {
      method: "POST",
      body: JSON.stringify(item),
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const responseData = await response.json();
      throw new Error(responseData.error || "Error al agregar servicio");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

const deleteService = async (serviceId) => {
  try {
    const token = localStorage.getItem("token");
    //const token = localStorage.getItem("sadasdasd12312");

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_DELETE_SERVICE_URL}${serviceId}`,
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
      throw new Error(responseData.error || "Error al eliminar servicio");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

const updateCategoryService = async (service_id, newCategoryId) => {
  try {
    const token = localStorage.getItem("token");
    //const token = localStorage.getItem("sadasdasd12312");

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_UPDATE_SERVICE_URL}${service_id}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ category_id: newCategoryId }),
      }
    );

    if (!response.ok) {
      const responseData = await response.json();
      throw new Error(
        responseData.error || "Error al actualizar la categoría del servicio"
      );
    }

    const data = await response.json();

    return data;
  } catch (error) {
    throw error;
  }
};

const updateMeasureUnitService = async (service_id, newMeasureUnitId) => {
  try {
    const token = localStorage.getItem("token");
    //const token = localStorage.getItem("sadasdasd12312");

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_UPDATE_SERVICE_URL}${service_id}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ measure_unit_id: newMeasureUnitId }),
      }
    );

    if (!response.ok) {
      const responseData = await response.json();
      throw new Error(
        responseData.error ||
          "Error al actualizar la unidad de medida del servicio"
      );
    }

    const data = await response.json();

    return data;
  } catch (error) {
    throw error;
  }
};

// State es el último estado manejado. Action es determinada por nosotros.
// La función retorna el nuevo y último estado.
const servicesReducer = (state, action) => {
  switch (action.type) {
    case "LOAD_SERVICES":
      return {
        ...state,
        items: action.services,
        isLoading: false,
        isLoadingAddItem: false,
        error: null,
        errorAddItem: null,
      };
    case "SET_LOADING":
      return {
        ...state,
        isLoading: true,
        isLoadingAddItem: false,
        error: null,
        errorAddItem: null,
      };
    case "SET_LOADING_ADD_ITEM":
      return {
        ...state,
        isLoading: false,
        isLoadingAddItem: true,
        error: null,
        errorAddItem: null,
      };
    case "SET_LOADING_DELETE_ITEM":
      return {
        ...state,
        isLoading: false,
        isLoadingAddItem: false,
        isLoadingDeleteItem: true,
        error: null,
        errorAddItem: null,
        errorDeleteItem: null,
      };
    case "SET_LOADING_UPDATE_CATEGORY_ITEM":
      return {
        ...state,
        isLoading: false,
        isLoadingAddItem: false,
        isLoadingDeleteItem: true,
        isLoadingUpdateCategory: true,
        error: null,
        errorAddItem: null,
        errorDeleteItem: null,
        errorUpdateCategory: false,
        successUpdateCategory: false,
      };
    case "SET_LOADING_UPDATE_MEASUREUNIT_ITEM":
      return {
        ...state,
        isLoadingUpdateMeasureUnit: true,
        errorUpdateMeasureUnit: false,
        successUpdateMeasureUnit: false,
      };
    case "SET_ERROR":
      return {
        ...state,
        isLoading: false,
        isLoadingAddItem: false,
        error: action.error,
        errorAddItem: null,
      };
    case "SET_ERROR_ADD_ITEM":
      return {
        ...state,
        isLoading: false,
        isLoadingAddItem: false,
        error: null,
        errorAddItem: action.error,
      };
    case "SET_ERROR_DELETE_ITEM":
      return {
        ...state,
        isLoading: false,
        isLoadingAddItem: false,
        isLoadingDeleteItem: false,
        error: null,
        errorAddItem: null,
        errorDeleteItem: action.error,
        successDeleteItem: false,
      };
    case "SET_ERROR_UPDATE_CATEGORY":
      return {
        ...state,
        isLoading: false,
        isLoadingAddItem: false,
        isLoadingDeleteItem: false,
        isLoadingUpdateCategory: false,
        error: null,
        errorAddItem: null,
        errorDeleteItem: null,
        errorUpdateCategory: action.error,
        successDeleteItem: false,
        successUpdateCategory: false,
      };
    case "SET_ERROR_UPDATE_MEASUREUNIT":
      return {
        ...state,
        isLoadingUpdateMeasureUnit: true,
        errorUpdateMeasureUnit: action.error,
        successUpdateMeasureUnit: false,
      };
    case "SET_SUCCESS_DELETE_ITEM":
      return {
        ...state,
        isLoading: false,
        isLoadingAddItem: false,
        isLoadingDeleteItem: false,
        error: null,
        errorAddItem: null,
        errorDeleteItem: null,
        successDeleteItem: true,
      };
    case "SET_SUCCESS_UPDATE_CATEGORY":
      return {
        ...state,
        isLoading: false,
        isLoadingAddItem: false,
        isLoadingDeleteItem: false,
        isLoadingUpdateCategory: false,
        error: null,
        errorAddItem: null,
        errorDeleteItem: null,
        successDeleteItem: false,
        successUpdateCategory: true,
        errorUpdateCategory: null,
      };
    case "SET_SUCCESS_UPDATE_MEASUREUNIT":
      return {
        ...state,
        isLoadingUpdateMeasureUnit: true,
        errorUpdateMeasureUnit: null,
        successUpdateMeasureUnit: true,
      };
    case "ADD_ITEM":
      return {
        ...state,
        items: [...state.items, action.item],
        isLoading: false,
        isLoadingAddItem: false,
        error: null,
        errorAddItem: null,
      };
    case "DELETE_ITEM":
      const updatedItems = state.items.filter((item) => item._id !== action.id);
      return {
        ...state,
        items: updatedItems,
        isLoading: false,
        isLoadingAddItem: false,
        isLoadingDeleteItem: false,
        error: null,
        errorAddItem: null,
        errorDeleteItem: null,
        successDeleteItem: false,
      };
    case "UPDATE_CATEGORY":
      const updatedCategoryItems = state.items.map((item) =>
        item._id === action.id
          ? { ...item, category_id: action.category_id }
          : item
      );
      return {
        ...state,
        items: updatedCategoryItems,
        isLoading: false,
        isLoadingAddItem: false,
        isLoadingUpdateCategory: false,
        error: null,
        errorAddItem: null,
        errorUpdateCategory: null,
        successUpdateCategory: false,
        //Por si hay error de unidad de medida y se lanza categoria, para que no se sobrepongan los carteles.
        isLoadingUpdateMeasureUnit: false,
        errorUpdateMeasureUnit: null,
        successUpdateMeasureUnit: false,
      };
    case "UPDATE_MEASUREUNIT":
      const updatedMeasureUnitItems = state.items.map((item) =>
        item._id === action.id
          ? { ...item, measure_unit_id: action.measure_unit_id }
          : item
      );
      return {
        ...state,
        items: updatedMeasureUnitItems,
        isLoadingUpdateMeasureUnit: false,
        errorUpdateMeasureUnit: null,
        successUpdateMeasureUnit: false,
        isLoadingUpdateCategory: false,
        successUpdateCategory: false,
        errorUpdateCategory: null,
      };
    case "SET_RESTART_ALL_UPDATE_CATEGORY":
      return {
        ...state,
        isLoadingUpdateCategory: false,
        successUpdateCategory: false,
        errorUpdateCategory: null,
      };
    case "SET_RESTART_ALL_UPDATE_MEASUREUNIT":
      return {
        ...state,
        isLoadingUpdateMeasureUnit: false,
        errorUpdateMeasureUnit: null,
        successUpdateMeasureUnit: false,
      };
    default:
      return defaultServiceState;
  }
};

export const ServiceContextProvider = (props) => {
  const [servicesState, dispatchServicesAction] = useReducer(
    servicesReducer,
    defaultServiceState
  );

  //const token = "sadasdasd12312";
  const { token } = useContext(AuthenticationContext);

  useEffect(() => {
    const loadServices = async () => {
      dispatchServicesAction({ type: "SET_LOADING" });
      try {
        const data = await fetchData(token);
        dispatchServicesAction({
          type: "LOAD_SERVICES",
          services: data,
        });
      } catch (error) {
        dispatchServicesAction({ type: "SET_ERROR", error: error.message });
      }
    };

    // Ejecutar la carga cuando se monta el componente o cambia el token
    if (token) {
      loadServices();
    }
  }, [token]);

  const addItemHandler = async (item) => {
    dispatchServicesAction({ type: "SET_LOADING_ADD_ITEM" });
    try {
      const data = await newService(item);

      const newItem = {
        measure_unit_id: data.messageinfo.measure_unit_id,
        category_id: data.messageinfo.category_id,
        name: data.messageinfo.name,
        description: data.messageinfo.description,
        cost: data.messageinfo.cost,
        price: data.messageinfo.price,
        _id: data.messageinfo._id,
      };

      dispatchServicesAction({
        type: "ADD_ITEM",
        item: newItem, // El servicio a agregar
      });
    } catch (error) {
      dispatchServicesAction({
        type: "SET_ERROR_ADD_ITEM",
        error: error.message,
      });
    }
  };

  const deleteItemHandler = async (id) => {
    try {
      dispatchServicesAction({ type: "SET_LOADING_DELETE_ITEM" });
      await deleteService(id);
      dispatchServicesAction({ type: "DELETE_ITEM", id: id });
      dispatchServicesAction({ type: "SET_SUCCESS_DELETE_ITEM" });
    } catch (error) {
      dispatchServicesAction({
        type: "SET_ERROR_DELETE_ITEM",
        error: error.message,
      });
    }
  };

  const updateCategoryHandler = async (service, newCategoryId) => {
    try {
      dispatchServicesAction({ type: "SET_LOADING_UPDATE_CATEGORY_ITEM" });
      const updatedService = {
        _id: service._id,
        measure_unit_id: service.measure_unit_id,
        category_id: newCategoryId,
        name: service.name,
        description: service.description,
        cost: service.cost,
        price: service.price,
      };

      //Le paso ya el servicio con el nuevo id de categoria.
      await updateCategoryService(service._id, newCategoryId);
      dispatchServicesAction({
        type: "UPDATE_CATEGORY",
        id: service._id,
        category_id: newCategoryId,
      });

      dispatchServicesAction({ type: "SET_SUCCESS_UPDATE_CATEGORY" });
    } catch (error) {
      dispatchServicesAction({
        type: "SET_ERROR_UPDATE_CATEGORY",
        error: error.message,
      });
    }
  };

  const updateMeasureUnitHandler = async (service, newMeasureUnitId) => {
    try {
      dispatchServicesAction({ type: "SET_LOADING_UPDATE_MEASUREUNIT_ITEM" });

      //Le paso ya el servicio con el nuevo id de categoria.
      await updateMeasureUnitService(service._id, newMeasureUnitId);
      dispatchServicesAction({
        type: "UPDATE_MEASUREUNIT",
        id: service._id,
        measure_unit_id: newMeasureUnitId,
      });

      dispatchServicesAction({ type: "SET_SUCCESS_UPDATE_MEASUREUNIT" });
    } catch (error) {
      dispatchServicesAction({
        type: "SET_ERROR_UPDATE_MEASUREUNIT",
        error: error.message,
      });
    }
  };

  const serviceContext = {
    items: servicesState.items,
    addItem: addItemHandler,
    deleteItem: deleteItemHandler,
    updateCategory: updateCategoryHandler,
    updateMeasureUnit: updateMeasureUnitHandler,
    isLoading: servicesState.isLoading,
    isLoadingAddItem: servicesState.isLoadingAddItem,
    isLoadingDeleteItem: servicesState.isLoadingDeleteItem,
    isLoadingUpdateCategory: servicesState.isLoadingUpdateCategory,
    isLoadingUpdateMeasureUnit: servicesState.isLoadingUpdateMeasureUnit,
    error: servicesState.error,
    errorAddItem: servicesState.errorAddItem,
    errorDeleteItem: servicesState.errorDeleteItem,
    errorUpdateCategory: servicesState.errorUpdateCategory,
    errorUpdateMeasureUnit: servicesState.errorUpdateMeasureUnit,
    successDeleteItem: servicesState.successDeleteItem,
    successUpdateCategory: servicesState.successUpdateCategory,
    successUpdateMeasureUnit: servicesState.successUpdateMeasureUnit,
  };

  return (
    <ServiceContext.Provider value={{ serviceContext, dispatchServicesAction }}>
      {props.children}
    </ServiceContext.Provider>
  );
};

export default ServiceContext;
