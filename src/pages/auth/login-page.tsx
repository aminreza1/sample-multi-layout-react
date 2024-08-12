import axios from "axios";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../store/auth-context";
import Loader from "../../components/loader/loader";

export type loginType = {
  username: string;
  password: string;
};

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const authCtx = useContext(AuthContext);

  const [loader, setLoader] = useState<boolean>(false);
  const [user, setUser] = useState<loginType>({
    username: "aminreza",
    password: "123456",
  });

  const onLogin = (e: any) => {
    e.preventDefault();

    if(loader) return;
    
    setLoader(true);
    authCtx
      .login(user.username, user.password)
      .then((resp) => {
        setLoader(false);
        navigate("/dashboard");
      })
      .catch((err) => {
        setLoader(false);
        alert(err);
      });
  };

  return (
    <div className="flex flex-col items-center p-4">
      <form onSubmit={onLogin}>
        <div>
          <div className="label">
            <span className="label-text">Username</span>
          </div>
          <input
            type="text"
            placeholder="Please enter username!"
            name="username"
            className="input input-bordered w-full max-w-xs"
            value={user.username}
            onChange={(e) => {
              setUser({ ...user, username: e.target.value });
            }}
          />
        </div>
        <div>
          <div className="label">
            <span className="label-text">Password</span>
          </div>
          <input
            type="password"
            placeholder="Please enter Password!"
            name="username"
            className="input input-bordered w-full max-w-xs"
            value={user.password}
            onChange={(e) => {
              setUser({ ...user, password: e.target.value });
            }}
          />
        </div>
        {loader && (
          <div className="flex justify-center">
            <Loader />
          </div>
        )}
        {!loader && (
          <div className="pt-2">
            <button className="btn btn-primary">Login</button>
          </div>
        )}
      </form>
    </div>
  );
};

export default LoginPage;
