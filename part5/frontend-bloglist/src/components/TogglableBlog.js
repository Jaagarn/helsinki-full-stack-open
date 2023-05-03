import { useState } from "react";

const TogglableBlog = (props) => {
  const [showFull, setShowFull] = useState(false);

  const hideWhenVisible = { display: showFull ? "none" : "" };
  const showWhenVisible = { display: showFull ? "" : "none" };
 
  const username = props.blog.user?.name ?? "Unknown";

  const toggleShowFull = () => {
    setShowFull(!showFull);
  };

  return (
    <>
      <div style={props.style} className="blog-box">
        <div style={hideWhenVisible}>
          <p>
            {props.blog.title} {props.blog.author}{" "}
            <button onClick={toggleShowFull}>{props.viewButtonLabel}</button>
          </p>
        </div>
        <div style={showWhenVisible}>
          <p>
            {props.blog.title} {props.blog.author}{" "}
            <button onClick={toggleShowFull}>{props.hideButtonLabel}</button>
          </p>
          <p>{props.blog.url}</p>
          <p>
            {props.blog.likes}{" "}
            <button>placeholder</button>
          </p>
          <p>{username}</p>
        </div>
      </div>
    </>
  );
};

export default TogglableBlog;
