import SendMessage from "../Components/SendMessage";
import backButton from "../assets/Icons/arrow-left.svg"
import userImage from "../assets/userImage.jpeg"
const Chat = () => {
    const uid = 1;
    const chatMessage = [
        {
            sender: "Timothy",
            senderUID: 1,
            receiverUID: 2,
            message: "Hi Alan"
        },
        {
            sender: "Timothy",
            senderUID: 1,
            receiverUID: 2,
            message: "I am Jason, here to help you find new friends."
        },
        {
            sender: "Christanah",
            senderUID: 2,
            receiverUID: 1,
            message: "Photography"
        }
    ]
  return (
    <>
        <header className="chat--header" style={styles.header}>
            <img src={backButton} alt="arrow" />
            <div style={styles.userDetailsContainer}>
                <p>Name of User</p>
                <p>Current status of user</p>
            </div>
            <img style={styles.userImage} src={userImage} alt="user image" />
        </header>
        <div>
            {chatMessage.map(message =>(
                <div style={{display: "flex", flexDirection: message.senderUID === uid ? "row" : 'row-reverse'}} key={message.message}>
                    <div></div>
                    <div style={styles.messageContent} >
                    {message.message}
                </div>
                </div>
            ))}
        </div>
        <SendMessage />
    </>
  )
}
const styles = {
    header: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
    },
    userDetailsContainer:{
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
    },
    userImage:{
        width: "50px",
        height: "50px",
        borderRadius: "50%"
    },
    messageContainer: {
    },
    messageContent: {
        background: "red",
        width: "fit-content",
        padding: "12px 10px",
        marginTop: "10px",
        borderRadius: "9px"
    }
}
export default Chat