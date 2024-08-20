import "../../style/newpostpage.scss";
import NewPostForm from "../NewPost/NewPostForm";

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
