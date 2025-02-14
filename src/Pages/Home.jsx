import React, { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../Context/Context";
import { getAuth, verifyBeforeUpdateEmail } from "firebase/auth";
import { getFirestore, collection, addDoc, getDocs, query } from "firebase/firestore";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card } from "react-bootstrap";
import "./Home.css"
import moment from "moment";
import Swal from "sweetalert2";

const Home = () => {

    const [changeEmail, setChangeEmail] = useState("");
    const [showForm, setShowForm] = useState(false);
    const [postCaption, setPostCaption] = useState("");
    const [post, setPost] = useState([]);

    let { state, dispatch } = useContext(GlobalContext);

    // Initialize Cloud Firestore and get a reference to the service
    const db = getFirestore();

    // ///////////////////// Read Data /////////////////////////////////////
    useEffect(() => {
        const getAllData = async () => {
            const querySnapshot = await getDocs(collection(db, "post"));
            querySnapshot.forEach((doc) => {
                console.log(`${doc.id} =>`, doc.data());
            });
        }
        getAllData();
    }, [])

    // ///////////////////// Get post function seperate ///////////////////
    const getPost = async () => {
        const q = query(collection(db, "post"));

        const querySnapshot = await getDocs(q);
        let allPost = []
        querySnapshot.forEach((doc) => {
            allPost.push(doc.data())
            // doc.data() is never undefined for query doc snapshots
            // console.log(doc.id, " => ", doc.data());
        });
        setPost(allPost)
    }

    // ////////////////////////// Get post ///////////////////////////////////////
    useEffect(() => {
        getPost();
    }, [])


    // //////////////////create Fire store Database //////////////////////////
    const addPost = async (e) => {
        e.preventDefault();
        try {
            const docRef = await addDoc(collection(db, "post"), {
                caption: postCaption,
                userEmail: state.user?.email,
                authorName: state.user?.displayName,
                postDate: new Date().getTime(),
                userId: state.user?.uid,
                authorProfile: state.user?.photoURL,
            });
            setPostCaption("");

            getPost();
            console.log("Document written with ID: ", docRef.id);

        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }

    // ////////////////// Email Update ///////////////////////////////////////
    const auth = getAuth();
    const nextEmail = async () => {
        // Show SweetAlert with input box for email
        const { value: email } = await Swal.fire({
            title: "Input email address",
            input: "email",
            inputLabel: "Your email address",
            inputPlaceholder: "Enter your email address",
        });

        if (email) {
            try {
                // Update email using Firebase's verifyBeforeUpdateEmail
                await verifyBeforeUpdateEmail(auth.currentUser, email);
                Swal.fire('Success', 'Email updated successfully!', 'success');
            } catch (error) {
                Swal.fire('Error', 'Failed to update email', 'error');
                console.log("Error updating email", error);
            }
        }
    };

    return (
        <div>
            <h1>{state?.user?.displayName}</h1>
            <h6>{state?.user?.email}</h6>
            <button onClick={nextEmail} >Update Email</button>

            {(showForm) ?
                <form onSubmit={nextEmail}>
                    <label htmlFor="changeEmail">
                        New Email : <input type="email" value={changeEmail} onChange={(e) => { setChangeEmail(e.target.value) }} />

                        <button type="submit">Submit</button>
                    </label>
                </form>
                :
                null}
            <br />
            <form onSubmit={addPost}>
                <textarea placeholder="What is your mind ?" value={postCaption} onChange={(e) => { setPostCaption(e.target.value) }}></textarea>
                <br />
                <button>Post</button>
            </form>
            <div className=" p-3 d-flex flex-column align-items-center row-gap-3" >
                {post.map((eachPost, i) => {
                    console.log("eachPost" , eachPost)
                    return (
                        <Card key={i} style={{ width: "23rem" }} className="p-3">
                            <div className="postHead">
                                <div className="userProfile">
                                    <img src={eachPost?.authorProfile} />
                                </div>

                                <div className="postDetail">
                                    <h6>{eachPost?.authorName}</h6>
                                    <p>{moment(eachPost?.postDate).fromNow()}</p>
                                </div>

                            </div>
                            <div className="postContent pt-4 m-0" >
                                <p>{eachPost?.caption}</p>

                            </div>
                        </Card>
                    )
                })}
            </div>

        </div>
    )
}
export default Home;