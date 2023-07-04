import { useState } from "react";

const TogglableBlog = (props) => {
  const [showFull, setShowFull] = useState(false);

  const hideWhenVisible = { display: showFull ? "none" : "" };
  const showWhenVisible = { display: showFull ? "" : "none" };

  // I don't think this should be possible, I just had some bad data in the DB
  const username = props.blog.user?.name ?? "Unknown";

  const toggleShowFull = () => {
    setShowFull(!showFull);
  };

  const handleLike = async (event) => {
    event.preventDefault();
    await props.handleLike(props.blog);
  };

  const handleRemove = async (event) => {
    event.preventDefault();
    await props.handleRemoval(props.blog);
  };

  const removeButton = () => (
    <button className="delete-button" onClick={handleRemove}>
      remove
    </button>
  );

  return (
    <>
      <div style={props.style} className="blog-box">
        <div style={hideWhenVisible}>
          <p>
            title: {props.blog.title}, author: {props.blog.author}{" "}
            <button onClick={toggleShowFull}>{props.viewButtonLabel}</button>
          </p>
        </div>
        <div style={showWhenVisible}>
          <p>
            title: {props.blog.title}, author: {props.blog.author}{" "}
            <button onClick={toggleShowFull}>{props.hideButtonLabel}</button>
          </p>
          <p>url: {props.blog.url}</p>
          <p>
            likes: {props.blog.likes} <button onClick={handleLike}>like</button>
          </p>
          <p>added by: {username}</p>
          {/* Can only delete a blog if the currentUser created it. Backend will reject any attempts*/}
          {props.currentUser.id === props.blog.user.id && removeButton()}
        </div>
      </div>
    </>
  );
};

export default TogglableBlog;
