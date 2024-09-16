import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import chatIcon from "../../../public/chat.png";
import saveIcon from "../../../public/save.png";
import { AuthContext } from "../../contexts/AuthContext";
import "../../style/card.scss";
import api from "../lib/axiosInstance";

const Card = ({ item }) => {
  const [saved, setSaved] = useState(item.id || false);

  const { currentUser } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleSave = async () => {
    if (!currentUser) {
      return navigate("/login");
    }

    setSaved((prev) => !prev);

    try {
      // API call to save or unsave the post
      await api.post("/users/save", { postId: item.id });
    } catch (err) {
      console.error("Failed to save/unsave post:", err);
      // Revert the saved state if the request fails
      setSaved((prev) => !prev);
    }
  };

  return (
    <div className="card">
      <Link to={`/${item.id}`} className="imageContainer">
        <img src={item.images[0]} alt="thumbnail" />
      </Link>
      <div className="textContainer">
        <h2 className="title">
          <Link to={`/${item.id}`}>{item.title}</Link>
        </h2>
        <p className="address">
          <img src="/pin.png" alt="" />
          <span>{item.address}</span>
        </p>
        <p className="price">$ {item.price}</p>
        <div className="bottom">
          <div className="features">
            <div className="feature">
              <img src="/bed.png" alt="" />
              <span>{item.bedroom} bedroom</span>
            </div>
            <div className="feature">
              <img src="/bath.png" alt="" />
              <span>{item.bathroom} bathroom</span>
            </div>
          </div>
          <div className="icons">
            <div
              className="icon"
              onClick={handleSave}
              style={{
                backgroundColor: saved ? "#fece51" : "",
              }}
            >
              <img src={saveIcon} alt="save_icon" />
            </div>
            <div className="icon">
              <img src={chatIcon} alt="chat_icon" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
