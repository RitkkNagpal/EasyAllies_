import "./topbar.css";
import { Person, Search, Chat, Notifications } from "@material-ui/icons";
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { logoutCall } from "../../apiCalls";
import { useNavigate } from "react-router";

export default function Topbar() {
  const { user, dispatch } = useContext(AuthContext);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const navigate = useNavigate();

  const handleKeyPress = (e) => {
    let username = e.target.value;
    if (username && e.key == "Enter") {
      navigate(`/profile/${username}`);
    }
  };
  const handleClick = () => {
    logoutCall(dispatch);
  };
  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo">EasyAllies</span>
        </Link>
      </div>
      <div className="debate-portal">
        <a
          href="https://easyallies.herokuapp.com/"
          target="_blank"
          className="debate-portal-link"
        >
          <Button
            className="debate-portal-button"
            style={{
              color: "white",
              marginRight: "5px",
              border: "1px solid white",
              borderRadius: "15px",
            }}
          >
            Enter Debate Room
          </Button>
        </a>
      </div>
      <div className="topbarCenter">
        <div className="searchbar">
          <Search className="searchIcon" />
          <input
            type="text"
            placeholder="Search for a friend"
            className="searchInput"
            onKeyPress={handleKeyPress}
          />
        </div>
      </div>
      <div className="topbarRight">
        <div className="topbarLinks">
          <Link to="/" style={{ textDecoration: "none",color:"white" }}>
            <span className="topbarLink">Homepage</span>
          </Link>
          <Link to={`/profile/${user.username}`} style={{ textDecoration: "none",color:"white" }}>
            <span className="topbarLink">Timeline</span>
          </Link>
        </div>
        <div className="topbarIcons">
          <div className="topbarIconItem">
            <Person />
            <span className="topbarIconBadge">1</span>
          </div>
          <div className="topbarIconItem">
            <Link to="/messenger">
              <Chat style={{ color: "white" }} />
              <span className="topbarIconBadge">2</span>
            </Link>
          </div>
          <div className="topbarIconItem">
            <Notifications />
            <span className="topbarIconBadge">1</span>
          </div>
        </div>
        <Link to={`/profile/${user.username}`}>
          <img
            src={
              user.profilePicture
                ? PF + user.profilePicture
                : PF + "person/noAvatar.png"
            }
            alt=""
            className="topbarImg"
          />
        </Link>
        <button className="topbarLink" onClick={handleClick}>
          Sign out
        </button>
      </div>
    </div>
  );
}
