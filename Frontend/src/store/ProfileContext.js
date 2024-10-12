import React, { useEffect, useState, useContext } from "react";
import AuthenticationContext from "./AuthenticationContext";

const ProfileContext = React.createContext({
  name: "",
  email: "",
  surname:"",
  alias:"",
  address:"",
  isLoading: false,
  error: "",
});

const fetchData = async () => {
  try {
    //const token = localStorage.getItem("sadasdasd12312");
    const token = localStorage.getItem("token");
    const response = await fetch(process.env.NEXT_PUBLIC_GET_USER_URL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
        const responseData = await response.json();
        console.log(responseData);
        throw new Error(responseData.error || "Error al cargar perfil");
      }
    const data = await response.json();
    return data;
  } catch (error) {
    throw error; //Para capturarlo con el catch luego en el loadProfile
  }
};

export const ProfileContextProvider = (props) => {
  const { token } = useContext(AuthenticationContext);
  //const token = "sadasdasd12312";
  const [error, setError] = useState(null);
  const [profileData, setProfileData] = useState({ name: "", email: "", surname:"", alias:"", address:"" });
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const loadProfile = async () => {
      setLoading(true);
      try {
        const data = await fetchData();
        console.log("INFO: ", data);
        if (data) {
          setProfileData({
            name: data.user.name,
            email: data.user.email,
            surname:data.user.surname,
            alias:data.user.alias,
            address:data.user.address
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
      loadProfile();
    }
  }, [token]);

  const contextValue = {
    name: profileData.name,
    email: profileData.email,
    surname:profileData.surname,
    alias:profileData.alias,
    address:profileData.address,
    isLoading: loading,
    error: error, // Incluir error en el contexto
  };

  return (
    <ProfileContext.Provider value={contextValue}>
      {props.children}
    </ProfileContext.Provider>
  );
};

export default ProfileContext;