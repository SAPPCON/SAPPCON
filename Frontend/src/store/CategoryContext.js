import React, { useEffect, useState, useContext, useReducer } from "react";
import AuthenticationContext from "./AuthenticationContext";

const CategoryContext = React.createContext({
  items: [],
  addItem: (item) => {},
  isLoading: false,
  isLoadingAddItem: false,
  error: "",
  errorAddItem: "",
});

const defaultCategoryState = {
  items: [],
};

// Función que obtiene los datos del backend
const fetchData = async (token) => {
  try {
    const response = await fetch(process.env.NEXT_PUBLIC_GET_CATEGORIES_URL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const responseData = await response.json();
      throw {
        message: responseData.message || "Error al cargar las categorías",
        messageinfo: responseData.messageinfo || "Detalles no disponibles",
      };
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

const newCategory = async (name) => {
  try {
    const token = localStorage.getItem("token");
    //const token = localStorage.getItem("sadasdasd12312");
    const response = await fetch(process.env.NEXT_PUBLIC_ADD_CATEGORY_URL, {
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
        message: responseData.message || "Error al crear categoria",
        messageinfo: responseData.messageinfo || "Detalles no disponibles",
      };
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

const categoriesReducer = (state, action) => {
  switch (action.type) {
    case "LOAD_CATEGORIES":
      return {
        ...state,
        items: action.categories,
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
    case "SET_RESTART_ALL_ADD_ITEM":
      return {
        ...state,
        isLoadingAddItem: false,
        errorAddItem: null,
        succesAddItem: false,
      };
    default:
      return defaultCategoryState;
  }
};

export const CategoryContextProvider = (props) => {
  const [categoriesState, dispatchCategoriesAction] = useReducer(
    categoriesReducer,
    defaultCategoryState
  );

  //const token = "sadasdasd12312";
  const { token } = useContext(AuthenticationContext);

  useEffect(() => {
    const loadCategories = async () => {
      dispatchCategoriesAction({ type: "SET_LOADING" });
      try {
        const data = await fetchData(token);
        dispatchCategoriesAction({
          type: "LOAD_CATEGORIES",
          categories: data,
        });
      } catch (error) {
        dispatchCategoriesAction({
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
      loadCategories();
    }
  }, [token]);

  const addItemHandler = async (name) => {
    dispatchCategoriesAction({ type: "SET_LOADING_ADD_ITEM" });
    try {
      const data = await newCategory(name);
      const newCateg = {
        name: data.messageinfo.name,
        _id: data.messageinfo._id,
        user_id: data.messageinfo.user_id,
      };

      dispatchCategoriesAction({
        type: "ADD_ITEM",
        item: newCateg,
      });
      dispatchCategoriesAction({ type: "SET_SUCCES_ADD_ITEM" });
    } catch (error) {
      dispatchCategoriesAction({
        type: "SET_ERROR_ADD_ITEM",
        error: {
          message: error.message || "Error desconocido",
          messageinfo: error.messageinfo || "Detalles no disponibles",
        },
      });
    }
  };

  const categoryContext = {
    items: categoriesState.items,
    addItem: addItemHandler,
    isLoading: categoriesState.isLoading,
    isLoadingAddItem: categoriesState.isLoadingAddItem,
    error: categoriesState.error,
    errorAddItem: categoriesState.errorAddItem,
    succesAddItem: categoriesState.succesAddItem,
  };

  return (
    <CategoryContext.Provider
      value={{ categoryContext, dispatchCategoriesAction }}
    >
      {props.children}
    </CategoryContext.Provider>
  );
};

export default CategoryContext;
