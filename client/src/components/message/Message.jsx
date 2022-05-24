import "./message.css";
import {format} from "timeago.js";
export default function Message({message,own}) {
  return (
    <div className={own ? "message own" : "message"}>
      <div className="messageTop">
        <img
          src="https://images.pexels.com/photos/10854224/pexels-photo-10854224.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260"
          alt=""
          className="messageImg"
        />
        <p className="messageText">
          {message.text}
        </p>
      </div>
      <div className="messageBottom">{format(message.createdAt)}</div>
    </div>
  );
}
