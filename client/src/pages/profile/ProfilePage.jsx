import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import avatarImage from "../../assets/noavatar.jpg";
import Chat from "../../components/chat/Chat.jsx";
import api from "../../components/lib/axiosInstance.js";
import { AuthContext } from "../../contexts/AuthContext.jsx";
import "../../style/profilepage.scss";
import ListPage from "../ListPage";

const ProfilePage = () => {
  const navigate = useNavigate();

  const { updateUser, currentUser } = useContext(AuthContext);

  const handleLogout = async () => {
    try {
      const res = await api.post("/auth/logout");
      updateUser(null);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="profilePage">
      <div className="details">
        <div className="wrapper">
          <div className="title">
            <h1>User Information</h1>
            <button>Update Profile</button>
          </div>
          <div className="info">
            <span>
              Avatar:
              <img src={currentUser.avatar || avatarImage} alt="avatar_image" />
            </span>
            <span>
              Username: <b>{currentUser.username}</b>
            </span>
            <span>
              E-mail: <b>{currentUser.email}</b>
            </span>
            <button onClick={handleLogout}>Logout</button>
          </div>
          <div className="title">
            <h1>My List</h1>
            <button>
              <Link to="/post">Create New Post</Link>
            </button>
          </div>
          <ListPage />
          <div className="title">
            <h1>Saved List</h1>
          </div>
          <ListPage />
        </div>
      </div>
      <div className="chatContainer">
        <div className="wrapper">
          <Chat />
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
