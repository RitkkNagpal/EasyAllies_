import "./messenger.css";
import Topbar from "../../components/topbar/Topbar";
import Conversation from "../../components/conversations/Conversation";
import Message from "../../components/message/Message";
import ChatOnline from "../../components/chatOnline/ChatOnline";
import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { io, Socket } from "socket.io-client";

export default function Messenger() {
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const socket = useRef();
  const { user } = useContext(AuthContext);
  const scrollRef = useRef();

  useEffect(() => {
    socket.current = io("ws://localhost:8900");
    socket.current.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);

  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);
  useEffect(() => {
<<<<<<< HEAD
    socket.current.emit("addUser", user?._id);
=======
    socket.current.emit("addUser", user._id);
>>>>>>> 3c287a22516a28d8cce561b8c2fbd33a78dce446

    socket.current.on("getUsers", (users) => {
      setOnlineUsers(
        user.followings.filter((f)=>users.some((u)=> u.userId === f))
      );
    });
  }, [user]);

  useEffect(() => {
<<<<<<< HEAD
    socket?.current.emit("addUser", user?._id);
=======
    socket?.current.emit("addUser", user._id);
>>>>>>> 3c287a22516a28d8cce561b8c2fbd33a78dce446
  }, [user]);
  useEffect(() => {
    const getConversations = async () => {
      try {
<<<<<<< HEAD
        const res = await axios.get("/conversations/" + user?._id);
=======
        const res = await axios.get("/conversations/" + user._id);
>>>>>>> 3c287a22516a28d8cce561b8c2fbd33a78dce446
        setConversations(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getConversations();
  }, [user._id]);
  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await axios.get("/messages/" + currentChat?._id);
        setMessages(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getMessages();
  }, [currentChat]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const message = {
<<<<<<< HEAD
      sender: user?._id,
=======
      sender: user._id,
>>>>>>> 3c287a22516a28d8cce561b8c2fbd33a78dce446
      text: newMessage,
      conversationId: currentChat._id,
    };

    const receiverId = currentChat.members.find(
<<<<<<< HEAD
      (member) => member !== user?._id
    );

    socket.current.emit("sendMessage", {
      senderId: user?._id,
=======
      (member) => member !== user._id
    );

    socket.current.emit("sendMessage", {
      senderId: user._id,
>>>>>>> 3c287a22516a28d8cce561b8c2fbd33a78dce446
      receiverId,
      text: newMessage,
    });

    try {
      const res = await axios.post("/messages", message);
      setMessages([...messages, res.data]);
      setNewMessage("");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  return (
    <>
      <Topbar />
      <div className="messenger">
        <div className="chatMenu">
          <div className="chatMenuWrapper">
            <input
              type="text"
              placeholder="Search for friends"
              className="chatMenuInput"
            />
            {conversations.map((c) => (
              <div onClick={() => setCurrentChat(c)}>
                <Conversation conversation={c} currentUser={user} />
              </div>
            ))}
          </div>
        </div>
        <div className="chatBox">
          <div className="chatBoxWrapper">
            {currentChat ? (
              <>
                <div className="chatBoxTop">
                  {messages.map((m) => (
                    <div ref={scrollRef}>
                      <Message message={m} own={m.sender === user._id} />
                    </div>
                  ))}
                </div>
                <div className="chatBoxBottom">
                  <textarea
                    className="chatMessageInput"
                    placeholder="write something..."
                    onChange={(e) => setNewMessage(e.target.value)}
                    value={newMessage}
                  ></textarea>
                  <button className="chatSubmitButton" onClick={handleSubmit}>
                    Send
                  </button>
                </div>
              </>
            ) : (
              <span className="noConversationText">
                Open a conversation to start a chat.
              </span>
            )}
          </div>
        </div>
        <div className="chatOnline">
          <div className="chatOnlineWrapper">
            <ChatOnline
              onlineUsers={onlineUsers}
<<<<<<< HEAD
              currentId={user?._id}
=======
              currentId={user._id}
>>>>>>> 3c287a22516a28d8cce561b8c2fbd33a78dce446
              setCurrentChat={setCurrentChat}
            />
          </div>
        </div>
      </div>
    </>
  );
}
