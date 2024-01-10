import { useState } from "react";
import { useNavigate } from "react-router-dom";
import app from "../API/firebase";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { collection, addDoc, getFirestore } from "firebase/firestore";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Form = ({ signUp, buttonText, path, routeText }) => {

    const [info, setInfo] = useState({
        email: "",
        password: ""
    })

    const navigate = useNavigate();
    const auth = getAuth();
    const db = getFirestore(app)

    const handleChange = (e)=>{
        setInfo(prev =>({
            ...prev,
            [e.target.name]: e.target.value
        }));
    }

    const registerAccount = ()=>{
        createUserWithEmailAndPassword(auth, info.email, info.password)
        .then((userCredential) => { 
            const user = userCredential.user;
            return user
        }).then( async (res) => {
            const docRef = await addDoc(collection(db, "users"), {
                    uid: res.uid,
                    email: info.email
                  })
                  .then(item => {
                    toast.success("Account has been succesfully created. Kindly navigate to login page and login");
                  });
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage)
            toast.error(errorCode, errorMessage)
        });
    }

    const loginAccount = ()=>{
        signInWithEmailAndPassword(auth, info.email, info.password)
        .then((userCredential) => { 
            const user = userCredential.user;
            navigate("/chat")
            console.log(user)
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage)
        });

    }
    const handleSubmit = (e) =>{
        e.preventDefault();
        signUp ? registerAccount() : loginAccount()

    }

    const handleRoute = (e) =>{
        e.preventDefault();
        navigate(path)
    }
  return (
    <form action="">
        <input 
            type="email" 
            name="email" 
            id="email"
            placeholder="Input email"
            onChange={handleChange}
            value={info.email} 
        />
        <input 
            type="password" 
            name="password" 
            id="password"
            placeholder="Input password"
            onChange={handleChange}
            value={info.password} 
        />
        <button onClick={handleSubmit} type="submit">{buttonText}</button>
        <button onClick={handleRoute}>{routeText}</button>
        <ToastContainer />
    </form>
  )
}

export default Form