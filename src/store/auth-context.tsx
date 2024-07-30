import axios from "axios";
import React, { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

type authDataType = {
  isAuth: boolean;
  token: string;
  username: string;
};

export const AuthContext = createContext({
  authData: {} as authDataType,
  login: (username: string, password: string) : boolean => false,
  logout: () => {},
});

////////////////////////////////

const AuthContextProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
    
  const [authState, setAuthState] = useState<authDataType>({
    isAuth: false,
    token: "",
    username: "",
  });

  const onLogin = (username: string, password: string) : boolean => {
    var dt = new FormData();
    dt.append("username", username);
    dt.append("password", password);

    axios({
      method: "post",
      url: "http://192.168.0.120:8081/api/auth/login",
      data: dt,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then((resp) => {
        localStorage.setItem("token", resp.data);
        console.log(resp.data);
        return true;
      })
      .catch((err) => {
        console.log(err);
      });
      return false
  };

  const onLogout = () => {};

  return (
    <AuthContext.Provider
      value={{
        authData: authState,
        login: onLogin,
        logout: onLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
