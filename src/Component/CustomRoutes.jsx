import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router";
import Signup from "../Pages/Signup";
import Login from "../Pages/Login";
import Home from "../Pages/Home";
import { GlobalContext } from "../Context/Context";

const CustomRoutes = () => {

    let { state, dispatch } = useContext(GlobalContext);

    return (
        <div>
            {(state?.isLogin == true) ?
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="*" element={<Navigate to={"/"} />} />
                </Routes>
                :
                (state?.isLogin == false) ?
                    <Routes>
                        <Route path="/sign" element={<Signup />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="*" element={<Navigate to={"/login"} />} />
                    </Routes>
                    :
                    <p>Loading......</p>
            }
        </div>
    )
}
export default CustomRoutes; 