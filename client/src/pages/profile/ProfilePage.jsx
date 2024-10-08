import { Suspense, useContext } from "react";
import { Await, Link, useLoaderData, useNavigate } from "react-router-dom";
import avatarImage from "../../assets/noavatar.jpg";
import Chat from "../../components/chat/Chat.jsx";
import api from "../../components/lib/axiosInstance.js";
import { AuthContext } from "../../contexts/AuthContext.jsx";
import "../../style/profilepage.scss";
import List from "../List";

const ProfilePage = () => {
  const data = useLoaderData();

  console.log(data);

  const navigate = useNavigate();

  const { updateUser, currentUser } = useContext(AuthContext);

  const handleLogout = async () => {
    try {
      await api.post("/auth/logout");
      updateUser(null);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  // if (!data || !data.postResponse) {
  //   return <div>Loading...</div>;
  // }

  return (
    <div className="profilePage">
      <div className="details">
        <div className="wrapper">
          <div className="title">
            <h1>User Information</h1>
            <Link to="/profile/update">
              <button>Update Profile</button>
            </Link>
          </div>
          <div className="info">
            <span>
              Avatar:
              <img
                src={currentUser?.avatar || avatarImage}
                alt="avatar_image"
              />
            </span>
            <span>
              Username: <b>{currentUser?.username}</b>
            </span>
            <span>
              E-mail: <b>{currentUser?.email}</b>
            </span>
            <button onClick={handleLogout}>Logout</button>
          </div>
          <div className="title">
            <h1>My Post</h1>
            <Link to="/post">
              <button>Create New Post</button>
            </Link>
          </div>
          <Suspense fallback={<p>Loading...</p>}>
            <Await
              resolve={data.postResponse}
              errorElement={<p>Error loading posts!</p>}
            >
              {(postResponse) => <List posts={postResponse.data.userPosts} />}
            </Await>
          </Suspense>
          <div className="title">
            <h1>Saved Post</h1>
          </div>
          <Suspense fallback={<p>Loading...</p>}>
            <Await
              resolve={data.postResponse}
              errorElement={<p>Error loading posts!</p>}
            >
              {(postResponse) => <List posts={postResponse.data.savedPosts} />}
            </Await>
          </Suspense>
        </div>
      </div>
      <div className="chatContainer">
        <div className="wrapper">
          <Suspense fallback={<p>Loading...</p>}>
            <Await
              resolve={data.chatResponse}
              errorElement={<p>Error loading chats!</p>}
            >
              {(chatResponse) => <Chat chats={chatResponse.data} />}
            </Await>
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
