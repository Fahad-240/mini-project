import React, { useState } from "react";
import { getAuth, createUserWithEmailAndPassword, updateProfile, sendEmailVerification } from "firebase/auth";
import "./Signup.css"

const Signup = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [userName, setUserName] = useState("");

    const createUser = (e) => {
        e.preventDefault();
        const auth = getAuth();
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed up 
                const user = userCredential.user;
                updateProfile(auth.currentUser, {
                    displayName: userName, photoURL: "https://static.vecteezy.com/system/resources/previews/018/246/161/original/passport-photo-suit-free-png.png"
                }).then(() => {
                    sendEmailVerification(auth.currentUser)
                        .then(() => {
                            // Email verification sent!
                            console.log("Email verification sent!");
                            // ...
                        })
                        .catch(() => {
                            console.log("verification not send")
                        })

                    console.log("profile Update")
                    // Profile updated!
                    // ...
                }).catch((error) => {
                    console.log("error", error)
                    // An error occurred
                    // ...
                });
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log("error", error);
            });
    }
    return (
        <div className="signup-container">
            <h1>Sign Up</h1>
            <form onSubmit={createUser} className="form">
                <div className="input-group">
                    <label htmlFor="userName">
                        <span className="p"> Name </span> : <input type="text" required className="txt" value={userName} onChange={(e) => { setUserName(e.target.value) }} />
                    </label>
                </div>
                <div className="input-group">
                    <label htmlFor="email">
                        <span className="p"> Email</span>  : <input type="text" required className="txt " value={email} onChange={(e) => { setEmail(e.target.value) }} />
                    </label>
                </div>
                <div className="input-group">
                    <label htmlFor="password">
                        <span className="p"> Password </span> : <input type="text" required className="txt" value={password} onChange={(e) => { setPassword(e.target.value) }} />
                    </label>
                </div>

                <button className="submit-btn" type="submit">Sign up</button>
            </form>
        </div>
    )
}

export default Signup;