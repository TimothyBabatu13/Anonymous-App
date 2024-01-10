import './App.css'
import Chat from './App/Chat'
import { SignUp } from './App/SignUp';
import SIgnIn from './App/SIgnIn';
import {BrowserRouter, Routes, Route} from "react-router-dom";

function App() {

  return (
    <div className='app'>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<SignUp />}/>
          <Route path='/signin' element={<SIgnIn />} />
          <Route path='/chat' element={<Chat />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
