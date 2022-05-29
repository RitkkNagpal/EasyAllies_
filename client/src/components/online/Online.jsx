import "./online.css";
import { useEffect,useState} from "react";
import axios from "axios";

export default function Online({onlineUsers,currentId}) {
  const [friends, setFriends] = useState([]);
  const [onlineFriends, setOnlineFriends] = useState([]);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  useEffect(() => {
    const getFriends = async () => {
      const res = await axios.get("/users/friends/" + currentId);
      setFriends(res.data);
    };
    getFriends();
  }, [currentId]);

  useEffect(() => {
    setOnlineFriends(friends.filter((f) => onlineUsers.includes(f._id)));
  }, [friends, onlineUsers]);

  return (
    <>
    {onlineFriends.map((o) => (
      <div className="chatOnlineFriend">
        <div className="chatOnlineImgContainer">
          <img
            src={
              o?.profilePicture
              ? PF + o.profilePicture
              : PF + "person/noAvatar.png"
            }
            alt=""
            className="chatOnlineImg"
            />
          <div className="chatOnlineBadge"></div>
        </div>
        <span className="chatOnlineName">{o?.username}</span>
      </div>
    ))}
  </>
  );
}