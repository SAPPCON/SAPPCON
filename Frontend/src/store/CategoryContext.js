import React, { useEffect, useContext, useReducer } from "react";
import AuthenticationContext from "./AuthenticationContext";

const CategoryContext = React.createContext({
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

const defaultCategoryState = {
  items: [],
};

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

const deleteCategory = async (categoryId) => {
  try {
    const token = localStorage.getItem("token");
    //const token = localStorage.getItem("sadasdasd12312");

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_DELETE_CATEGORY_URL}${categoryId}`,
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
        message: responseData.message || "Error al eliminar categoria",
        messageinfo: responseData.messageinfo || "Detalles no disponibles",
      };
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

const updateCategoryName = async (category_id, newName) => {
  try {
    const token = localStorage.getItem("token");
    //const token = localStorage.getItem("sadasdasd12312");
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_UPDATE_URL}${category_id}`,
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
          responseData.message || "Error al actualizar nombre de la categoria",
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
    case "SET_RESTART_ALL_ADD_ITEM":
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

  const deleteItemHandler = async (id) => {
    try {
      dispatchCategoriesAction({ type: "SET_LOADING_DELETE_ITEM" });
      await deleteCategory(id);
      dispatchCategoriesAction({ type: "DELETE_ITEM", id: id });
      dispatchCategoriesAction({ type: "SET_SUCCES_DELETE_ITEM" });
    } catch (error) {
      dispatchCategoriesAction({
        type: "SET_ERROR_DELETE_ITEM",
        error: {
          message: error.message || "Error desconocido",
          messageinfo: error.messageinfo || "Detalles no disponibles",
        },
      });
    }
  };

  const updateCategoryHandler = async (category, newName) => {
    try {
      dispatchCategoriesAction({ type: "SET_LOADING_UPDATE_NAME_ITEM" });

      await updateCategoryName(category._id, newName);
      dispatchCategoriesAction({
        type: "UPDATE_NAME",
        id: category._id,
        name: newName,
      });

      dispatchCategoriesAction({ type: "SET_SUCCES_UPDATE_NAME" });
    } catch (error) {
      dispatchCategoriesAction({
        type: "SET_ERROR_UPDATE_NAME",
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
    deleteItem: deleteItemHandler,
    updateItem: updateCategoryHandler,
    isLoading: categoriesState.isLoading,
    isLoadingAddItem: categoriesState.isLoadingAddItem,
    isLoadingDeleteItem: categoriesState.isLoadingDeleteItem,
    isLoadingUpdateName: categoriesState.isLoadingUpdateName,
    error: categoriesState.error,
    errorAddItem: categoriesState.errorAddItem,
    errorDeleteItem: categoriesState.errorDeleteItem,
    errorUpdateName: categoriesState.errorUpdateName,
    succesAddItem: categoriesState.succesAddItem,
    successDeleteItem: categoriesState.successDeleteItem,
    succesUpdateName: categoriesState.succesUpdateName,
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
