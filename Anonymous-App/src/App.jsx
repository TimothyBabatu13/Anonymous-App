import './App.css'
import Chat from './App/Chat'
import { SignUp } from './App/SignUp';
import SIgnIn from './App/SIgnIn';
import {BrowserRouter, Routes, Route, useNavigate} from "react-router-dom";
import { createContext, useEffect, useState } from 'react';
import app from './API/firebase';
import { getAuth, onAuthStateChanged } from "firebase/auth";
const createContextHook = createContext();

function App() {

  const [userUID, setUserUID] = useState("");
  const [show, setShow] = useState(false);
  const auth = getAuth();
  
  useEffect(()=>{
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        setUserUID(uid)
      } else {
        console.log("user is not signed in");
        setShow(true)
      }
    });
    
  },[])

  const provider = {
    uid: userUID,
    receiverUid: ""
  }


  if(!userUID && !show){
    return <h1> Loading...</h1>
  }

  return (
    <div className='app'>
      <createContextHook.Provider value={provider}>  
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<SignUp />}/>
          <Route path='/signin' element={<SIgnIn />} />
          <Route path='/chat' element={<Chat />} />
        </Routes>
      </BrowserRouter>
      </createContextHook.Provider>
      <button onClick={()=>auth.signOut().then(res => console.log(res)).catch(err => console.log(err))}>Sign out</button>
    </div>
  )
}

export default {App, createContextHook}
