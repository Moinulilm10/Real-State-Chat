import NewPostForm from "../components/newpost/NewPostForm.jsx";
import "../style/newpostpage.scss";

const NewPostPage = () => {
  return (
    <div className="newPostPage">
      <div className="formContainer">
        <h1>Add New Post</h1>
        <div className="wrapper">
          <NewPostForm />
        </div>
      </div>
      <div className="sideContainer"></div>
    </div>
  );
};

export default NewPostPage;
