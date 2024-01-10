import { useContext, useEffect, useState } from "react";
import app from "../API/firebase";
import App from "../App";
import { collection, doc, getDocs, getFirestore } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const OtherUsers = () => {
    const [people, setPeople] = useState([]);
    const navigate = useNavigate();
    const Context = App.createContextHook;
    const context = useContext(Context);
    const db = getFirestore(app);

    useEffect(()=>{
        const getData = async () =>{
            const querySnapshot = await getDocs(collection(db, "users"));
            querySnapshot.forEach((doc) => {
            setPeople([doc.data()]);
        });
    }
        getData()
    },[])

    const handleRoute = (id)=>{
        context.receiverUid = id;
        navigate(`/chat/${id}`)
    }
    console.log(people)
  return (
    <div>{people && people.map(user => (<div onClick={()=>handleRoute(user.uid)} key={user.uid}>
        {user.email}
    </div>))}</div>
  )
}

export default OtherUsers