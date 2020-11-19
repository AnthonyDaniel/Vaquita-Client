import React, { useEffect, useState } from "react";
import app from "../firebaseConfig";

export const Auth = React.createContext();

export const AuthContext = ({ children }) => {
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    app.auth().onAuthStateChanged(function (user) {
      setUsuario(user);
    });
  }, []);
    return (
      <Auth.Provider
        value={{
          usuario,
        }}
      >
        {children}
      </Auth.Provider>
    );
};



