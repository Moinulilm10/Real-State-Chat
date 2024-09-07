import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import noAvatar from "../../assets/noavatar.jpg";
import { AuthContext } from "../../contexts/AuthContext";
import "../../style/updatedprofilepage.scss";

function ProfileUpdatePage() {
  const { currentUser, updateUser } = useContext(AuthContext);

  const [error, setError] = useState("");
  const [avatar, setAvatar] = useState([]);

  const navigate = useNavigate();

  return (
    <div className="profileUpdatePage">
      <div className="formContainer">
        <form>
          <h1>Update Profile</h1>
          <div className="item">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              name="username"
              type="text"
              defaultValue={currentUser.username}
            />
          </div>
          <div className="item">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              defaultValue={currentUser.email}
            />
          </div>
          <div className="item">
            <label htmlFor="password">Password</label>
            <input id="password" name="password" type="password" />
          </div>
          <button>Update</button>
        </form>
      </div>
      <div className="sideContainer">
        <img src={currentUser.avatar || noAvatar} alt="" className="avatar" />
      </div>
    </div>
  );
}

export default ProfileUpdatePage;
