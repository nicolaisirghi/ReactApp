import React, {useEffect, useState} from "react";


export type ChatMessageType={
    message:string,
    photo:string,
    userID:number,
    userName:string
}

let wsChannel:WebSocket= new WebSocket("wss://social-network.samuraijs.com/handlers/ChatHandler.ashx\n");
function createChannel() {
    wsChannel = new WebSocket("wss://social-network.samuraijs.com/handlers/ChatHandler.ashx\n");
}
const ChatPage: React.FC = () => {


    return <div>
        <Chat/>
    </div>
}

const Messages: React.FC<{wsChannel:WebSocket}> = ({wsChannel}) => {

    const  [messages,setMessages] = useState<ChatMessageType[]>([])
    useEffect(()=>
        {
            wsChannel.addEventListener('message',(e)=>{
            const myObj:ChatMessageType[] = [{message:"Salut",photo:"https://media-exp1.licdn.com/dms/image/C4E03AQEdFePUt0Vgow/profile-displayphoto-shrink_200_200/0/1652889980027?e=2147483647&v=beta&t=IoAjWMFPHcQ7CFyuAM-VWXdnbEpwUzH1kJ5IOLIkYmY", userID:5,userName:"Vitea"}];
                // @ts-ignore
                setMessages((prevMessages)=>[...prevMessages ,...JSON.parse(e.data)])}

            )
        },[]
    )
    return <div style={{height:'400px',overflowY:'auto'}}>
        {messages.map((n: any,index) => <Message  message={n} key={index} />)}
    </div>
}
const Message: React.FC<{message:ChatMessageType}> = ({message}) => {
    return <div style={{marginBottom:"20px"}}>
        <img style={{width: "50px"}} src={message.photo}/>
        <div><b>{message.message}</b></div>
        <div>Author:{message.userName}</div>
    </div>
}

const AddMessagesForm: React.FC = () => {
    const [message,setMessage]=useState('');
    const [readyStatus,setReadyStatus] = useState<'pending'|'ready'>('pending');

    useEffect(()=>
    {
        wsChannel.addEventListener('open',()=>
            {
                setReadyStatus('ready');

            }

        )
    },[])

    const sendMessage=()=>
    {
            if(!message)
                return
        wsChannel.send(message)
        setMessage('')
    }
    return <div>
        <div><textarea onChange={(e)=>setMessage(e.currentTarget.value)} value={message}></textarea></div>
        <button  disabled={readyStatus!=='ready'} onClick={sendMessage}>Send</button>

    </div>
}

const Chat: React.FC = () => {

    useEffect(()=>
    {

        createChannel();
        wsChannel.addEventListener('close',()=>
        {
            console.log("Error")
        })
    },[])

    return <div>
        <Messages  wsChannel= {wsChannel} />
        <AddMessagesForm/>
    </div>
}
export default ChatPage;