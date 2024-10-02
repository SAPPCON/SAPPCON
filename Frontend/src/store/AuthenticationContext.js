import React, { useState, useEffect, useCallback } from "react";

let logoutTimer;

const AuthenticationContext = React.createContext({
  token: "",
  isLoggedIn: false,
  isLoading: true,
  login: (token) => {},
  logout: () => {},
});

const calculateRemainingTime = (expirationTime) => {
  //El Token se crea con una fecha de expiracion en el futuro.
  //  Si el token es valido, la resta entre token - actual sera positiva porque la fecha actual es menor a la de expiracion del token.
  //  Si el token es invalido, la resta es negativa porque la fecha de expiracion del token es menor a la fecha actual.

  //Cuanto tiempo paso desde 1970 hasta ahora.
  const currentTime = new Date().getTime(); //ms
  //Cuanto tiempo paso desde 1970 hasta la fecha de vencimiento del token.
  const adjExpirationTime = new Date(expirationTime).getTime(); //ms

  const remainingDuration = adjExpirationTime - currentTime; //ms

  return remainingDuration;
};

export const AuthenticationContextProvider = (props) => {
  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  //Convierte cualquier valor en booleano. True si tiene valor -> esta logeado. Y falso -> no logeado
  //Se calcula en cada renderizado del componente (cuando se llama a setToken desde el loginHandler o desde el useEffect, el componente se vuelve a renderizar)
  //Inicialmente es null, asique sera falso. Si se inicia sesion y setToken se ejecuta, pasara a ser true. O falso cuando se ejecuta logOuthandler y setToken null otra vez.
  const userIsLoggedIn = !!token;

  const logoutHandler = useCallback(() => {
    setToken(null);
    if (typeof window !== "undefined") {
      localStorage.removeItem("token");
      localStorage.removeItem("expirationTime");
    }
    if (logoutTimer) {
      clearTimeout(logoutTimer);
    }
  }, []);

  const loginHandler = (token, expirationTime) => {
    setToken(token);
    if (typeof window !== "undefined") {
      localStorage.setItem("token", token);
      localStorage.setItem("expirationTime", expirationTime);
    }

    const remainingTime = calculateRemainingTime(expirationTime);

    logoutTimer = setTimeout(logoutHandler, remainingTime);
  };

  //Este efecto corre cuando el componente se MONTA solamente (se crea y coloca en la interfaz por primera vez) porque las dependencias es vacio [].
  //Chequea si ya hay un token en local storage, en caso que lo haya se setea el token, como el token es un useState se renderiza el componente y !!token dara true y isLoggedIn dara true. Luego esta variable isLoggedIn se vuelve a calcular cada vez que cambie el setToken pero no sera por este efecto porque solo corre al montarse, sera por el loginHandler o logoutHandler.
  useEffect(() => {
    const retrieveStoredToken = () => {
      const storedToken = localStorage.getItem("token");
      const storedExpirationDate = localStorage.getItem("expirationTime");

      const remainingTime = calculateRemainingTime(storedExpirationDate);

      //Si token le queda menos de 1 minuto de tiempo, no es mas valido.
      if (remainingTime <= 60000) {
        localStorage.removeItem("token");
        localStorage.removeItem("expirationTime");
        return null; //Por ende en el montado, el !!token seguira siendo falso.
      }

      //Token valido.
      return {
        token: storedToken,
        duration: remainingTime,
      };
    };

    const storedToken = localStorage.getItem("token");

    if (storedToken) {
      const tokenData = retrieveStoredToken();

      //Si hay data, se usa el useState y se setea el token y tambien el logout.
      if (tokenData) {
        setToken(tokenData.token);
        logoutTimer = setTimeout(logoutHandler, tokenData.duration);
      }
    }

    setIsLoading(false);
  }, []); //Si de aca dependenria de algun estado, y el estado cambia se renderiza el componente y este efecto tambien correria en ese caso.

  const contextValue = {
    token: token,
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
    isLoading: isLoading,
  };

  return (
    <AuthenticationContext.Provider value={contextValue}>
      {props.children}
    </AuthenticationContext.Provider>
  );
};

export default AuthenticationContext;
