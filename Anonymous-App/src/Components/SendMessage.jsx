import { useContext, useState } from "react";
import sendButton from "../assets/Icons/arrow-right.svg";
import App from "../App";
import app from "../API/firebase";
import { collection, addDoc, getFirestore, Timestamp } from "firebase/firestore"; 

const SendMessage = ({ getMessage }) => {

    const date = new Date();
    console.log(date)
    console.log(date.toLocaleString())
    /*
    messages/
    messageID1/
        sender: userID1
        receiver: userID2
        content: "Hello, how are you?"
        timestamp: 1641826800
        isRead: false
    messageID2/
        sender: userID2
        receiver: userID1
        content: "I'm good, thanks! How about you?"
        timestamp: 1641826860
        isRead: true
        In this example, messageID1 rep
*/
    const [text, setText] = useState("")

    const Context = App.createContextHook;
    const context = useContext(Context);
    const db = getFirestore(app)

    console.log(context);
    const handleChange = (e)=>{
        setText(e.target.value)
    }

    const sendMessage = async () =>{
        const docRef = await addDoc(collection(db, "messages"), {
            senderUID: context.uid,
            receiverUID: context.receiverUid,
            timestamp: Timestamp.fromDate(date.toLocaleString()),
            isRead: false,
            typing: false,
            content: text
          })
          .then(res => console.log(res))
          .catch(err => console.log(err))
        //   console.log("Document written with ID: ", docRef.id);
          
    }
    const expandHeight = (e)=>{
        if(!e.target.innerHTML) e.target.style.height = "1px" 
        e.target.style.height = e.target.scrollHeight + "px"
    }

    const handleSubmit = ()=>{
        if(!text) return
        getMessage(text)
        sendMessage()
        setText("");

    }

    //find a way to calculate the height of text-area in
    //a phone and use it as the default height.

  return (
    <div className="send--message" style={styles.container}>
        <p style={styles.emoji}>&#9786;</p>
        <textarea 
            style={styles.input} 
            placeholder="Type message" 
            name="" 
            id=""
            onInput={expandHeight}
            value={text}
            onChange={handleChange}
        >
        </textarea>
        <img 
            src={sendButton} 
            alt="send button" 
            onClick={handleSubmit}
        />
    </div>
  )
}

const styles = {
    container: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        position: "absolute",
        width: "90%",
        bottom: "10px"
    },
    emoji: {
        // color: "black",
        fontSize: "1.9em"
    },
    input: {
        flex: 2,
        border: "none",
        padding: "10px",
        width: "100%",
        wordWrap: "break-word",
        whiteSpace: "initial",
        overflowWrap: "break-word",
        height: "35px"
    }
}
export default SendMessage