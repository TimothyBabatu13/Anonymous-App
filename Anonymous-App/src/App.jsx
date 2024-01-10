import './App.css'
import Chat from './App/Chat'
import { SignUp } from './App/SignUp';
import SIgnIn from './App/SIgnIn';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import { createContext, useEffect, useState } from 'react';
import app from './API/firebase';
import { getAuth, onAuthStateChanged } from "firebase/auth";
const createContextHook = createContext();

function App() {

  const [userUID, setUserUID] = useState("");
  
  const auth = getAuth();
  
  useEffect(()=>{
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        setUserUID(uid)
        // console.log(uid)
      } else {
        console.log("user is not signed in")
      }
    });
    
  },[])

  const provider = {
    uid: userUID,
    receiverUid: ""
  }

  if(!userUID){
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
    </div>
  )
}

export default {App, createContextHook}
