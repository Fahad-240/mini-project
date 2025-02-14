import React, { useContext, useEffect } from "react";
import { initializeApp } from 'firebase/app';
import CustomRoutes from "./Component/CustomRoutes";
import { Link } from "react-router";
import "./App.css"
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { GlobalContext } from "./Context/Context";
import Home from "./Pages/Home";
import 'bootstrap/dist/css/bootstrap.min.css';
import Swal from "sweetalert2";



const App = () => {

  let { state, dispatch } = useContext(GlobalContext);

  // console.log(state);

  // TODO: Replace the following with your app's Firebase project configuration
  const firebaseConfig = {
    apiKey: "AIzaSyBU1kBVPiBJVLa0B8VeEsOy9c0QL_7h5N4",
    authDomain: "social-app-5b4ef.firebaseapp.com",
    projectId: "social-app-5b4ef",
    storageBucket: "social-app-5b4ef.firebasestorage.app",
    messagingSenderId: "550445858541",
    appId: "1:550445858541:web:1362e02b1ae02b0e5d96e4"
  };
  const app = initializeApp(firebaseConfig);



  const auth = getAuth();

  useEffect(() => {

    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("user", user);
        dispatch({ type: "USER_LOGIN", payload: user });
        // User is signed in, see docs for a list of available properties
        const uid = user.uid;
        // ...
      } else {
        console.log("user not found");
        dispatch({ type: "USER_LOGOUT" });
        // User is signed out
        // ...
      }
    });
  }, [])

  const logoutUser = () => {
    signOut(auth).then(() => {

      Swal.fire({
        title: "Logout",
        icon: "success",
        draggable: true
      });
      // Sign-out successful.
      console.log("successful logout")
    }).catch((error) => {
      // An error happened.
      console.log("error logout")
    });

  }

  return (
    <div className="app">
      <header>
        <div className="logo">
           <img src={"https://mir-s3-cdn-cf.behance.net/projects/404/5022971.54651fb58bbf4.jpg"} alt=""  />
        </div>
        {state?.isLogin == true ?
          <button onClick={logoutUser}>Logout</button>
          :
          <div className="list">
            <ul>
              <li>
                <Link className="sign" to={"/sign"}>Sign Up</Link>
                <Link className="sign" to={"/login"}>Login</Link>
              </li>
            </ul>
          </div>
        }
      </header>
      <CustomRoutes />

    </div>
  )
}

export default App;