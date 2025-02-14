import React, { useState } from "react";
import { getAuth, signInWithEmailAndPassword, GithubAuthProvider, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    const userLogin = (e) => {
        e.preventDefault();
        const auth = getAuth();
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                console.log("user", user);
                // ...
            })
            .catch((error) => {
                console.log("error", error);
                const errorCode = error.code;
                const errorMessage = error.message;

            });

    }

    // //////////////// login with github /////////////////
    const loginWithGithub = () => {
        const provider = new GithubAuthProvider();


        const auth = getAuth();
        signInWithPopup(auth, provider)
            .then((result) => {
                // This gives you a GitHub Access Token. You can use it to access the GitHub API.
                const credential = GithubAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;

                // The signed-in user info.
                const user = result.user;
                console.log("githubUser", user)
                // IdP data available using getAdditionalUserInfo(result)
                // ...
            }).catch((error) => {
                // Handle Errors here.
                console.log("github error", error)
                const errorCode = error.code;
                const errorMessage = error.message;
                // The email of the user's account used.
                const email = error.customData.email;
                // The AuthCredential type that was used.
                const credential = GithubAuthProvider.credentialFromError(error);
                // ...
            });

    }

    // //////////////// login with google /////////////////////
    const loginWithGoogle = () => {
        const provider = new GoogleAuthProvider();

        const auth = getAuth();
        signInWithPopup(auth, provider)
            .then((result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                // The signed-in user info.
                const user = result.user;
                console.log("google user", user)
                // IdP data available using getAdditionalUserInfo(result)
                // ...
            }).catch((error) => {
                // Handle Errors here.
                console.log("google error", error)
                const errorCode = error.code;
                const errorMessage = error.message;
                // The email of the user's account used.
                const email = error.customData.email;
                // The AuthCredential type that was used.
                const credential = GoogleAuthProvider.credentialFromError(error);
                // ...
            });
    }


    return (
        <div>
            <div>
                <h1>LOGIN</h1>
                <form onSubmit={userLogin}>

                    <label htmlFor="email">
                        Email : <input type="text" value={email} onChange={(e) => { setEmail(e.target.value) }} />
                    </label>
                    <br />
                    <label htmlFor="password">
                        Password : <input type="text" value={password} onChange={(e) => { setPassword(e.target.value) }} />
                    </label>
                    <br />
                    <button type="submit">Sign In</button>
                </form>
            </div>
            <button onClick={loginWithGithub}>login with github</button>
            <br />
            <button onClick={loginWithGoogle}>Google</button>
        </div>
    )
}

export default Login;