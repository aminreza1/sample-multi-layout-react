import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import http, { apis } from "../infrastructures/http-service";

type authDataType = {
  isAuth: boolean;
  token: string;
  username: string;
};

export const AuthContext = createContext({
  authData: {} as authDataType,
  login: (username: string, password: string): Promise<string> =>
    Promise.resolve(""),
  logout: () => {},
});

////////////////////////////////

const AuthContextProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [authState, setAuthState] = useState<authDataType>({
    isAuth: (localStorage.getItem("token") ?? "").length > 0 ? true : false,
    token: localStorage.getItem("token") ?? "",
    username: localStorage.getItem("username") ?? "",
  });

  const onLogin = async (
    username: string,
    password: string
  ): Promise<string> => {
    var dt = new FormData();
    dt.append("username", username);
    dt.append("password", password);

    let result = await http({
      method: "post",
      url: apis["login"],
      data: dt,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then((resp) => {
        localStorage.setItem("token", resp.data);
        localStorage.setItem("username", username);
        setAuthState({
          isAuth: true,
          token: resp.data,
          username: username,
        });
        
        return Promise.resolve("Success");
      })
      .catch((err) => {
        return Promise.reject(err.response.data);
      });
    return result;
  };

  const onLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    setAuthState({
      isAuth: false,
      token: "",
      username: "",
    });
  };

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
