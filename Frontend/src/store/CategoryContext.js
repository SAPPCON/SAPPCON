import React, { useEffect, useState, useContext, useReducer } from "react";
//import AuthContext from "./auth-context";

const CategoryContext = React.createContext({
  items: [],
  addItem: (item) => {},
  //isLoading: false,
  //error: "",
});

const defaultCategoryState = {
  items: [],
};

//Request al back
/*
const fetchData = async () => {
  try {
    //const token = localStorage.getItem("sadasdasd12312");
    const token = localStorage.getItem("token");
    const response = await fetch("http://localhost:3000/users/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const responseData = await response.json();
      const errorMsg =
        responseData.message ||
        (responseData.errors &&
        responseData.errors[0] &&
        responseData.errors[0].message
          ? responseData.errors[0].message
          : "Something went wrong!");
      throw new Error(errorMsg);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw error; //Para capturarlo con el catch luego en el loadProfile
  }
};
*/

// Servicios hardcodeados
const hardcodedCategories = [
  { id: 1, name: "Movimiento de tierras" },
  { id: 2, name: "Estructura" },
  { id: 3, name: "Obra gruesa" },
  { id: 4, name: "Acabados" },
  { id: 5, name: "Instalaciones" },
];

const categoriesReducer = (state, action) => {
  if (action.type === "LOAD_CATEGORIES") {
    return {
      items: action.categories,
    };
  }

  if (action.type === "SET_ERROR") {
    return {
      ...state,
    };
  }

  if (action.type === "ADD_ITEM") {
    return {
      items: [...state.items, action.item],
    };
  }

  return defaultCategoryState;
};

export const CategoryContextProvider = (props) => {
  const [categoriesState, dispatchCategoriesAction] = useReducer(
    categoriesReducer,
    defaultCategoryState
  );

  useEffect(() => {
    dispatchCategoriesAction({
      type: "LOAD_CATEGORIES",
      categories: hardcodedCategories,
    });
  }, []); // Se ejecuta solo una vez al montar el componente

  const addItemHandler = (item) => {
    dispatchCategoriesAction({
      type: "ADD_ITEM",
      item: item, // El servicio a agregar
    });
  };
  //const { token } = useContext(AuthContext);
  //const token = "sadasdasd12312";
  //const [error, setError] = useState(null);
  //const [profileData, setProfileData] = useState({ name: "", email: "" });
  //const [loading, setLoading] = useState(false);
  /*
  useEffect(() => {
    const loadProfile = async () => {
      setLoading(true);
      try {
        const data = await fetchData();
        if (data) {
          setProfileData({
            name: data.name,
            email: data.email,
          });
          setError(null); // Resetea el error cuando la carga es exitosa
        }
      } catch (error) {
        setError(error.message); // Establece el mensaje de error
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      console.log("cargando perfil");
      loadProfile();
    }
  }, [token]);
  */

  const categoryContext = {
    items: categoriesState.items,
    addItem: addItemHandler,
    //email: profileData.email,
    //isLoading: loading,
    //error: error, // Incluir error en el contexto
  };

  return (
    <CategoryContext.Provider value={categoryContext}>
      {props.children}
    </CategoryContext.Provider>
  );
};

export default CategoryContext;
