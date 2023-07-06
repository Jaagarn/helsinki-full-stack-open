import { useState } from "react";
import PropTypes from "prop-types";

const TogglableBlog = (props) => {
  const [showFull, setShowFull] = useState(false);

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
    const confirmation = window.confirm(
      `Do you want to remove "${props.blog.title}" by ${props.blog.author}?`
    );

    if (confirmation) {
      await props.handleRemoval(props.blog);
    }
  };

  const removeButton = () => (
    <button
      className="delete-button"
      data-testid="blog-remove-button"
      onClick={handleRemove}
    >
      remove
    </button>
  );

  return (
    <>
      <div style={props.style} className="blog-box">
        {!showFull && (
          <p data-testid="blog-title-collapsed">
            title: {props.blog.title}, author: {props.blog.author}
            <button
              style={{ marginLeft: 10 }}
              onClick={toggleShowFull}
              data-testid="blog-view-button"
            >
              {props.viewButtonLabel}
            </button>
          </p>
        )}
        {showFull && (
          <>
            <p data-testid="blog-title-expanded">
              title: {props.blog.title}, author: {props.blog.author}
              <button
                style={{ marginLeft: 10 }}
                onClick={toggleShowFull}
                data-testid="blog-hide-button"
              >
                {props.hideButtonLabel}
              </button>
            </p>
            <p data-testid="blog-url">url: {props.blog.url}</p>
            <p data-testid="blog-likes">
              likes: {props.blog.likes}
              <button
                style={{ marginLeft: 10 }}
                onClick={handleLike}
                data-testid="blog-like-button"
              >
                like
              </button>
            </p>
            <p data-testid="blog-username">added by: {username}</p>
            {/* Can only delete a blog if the currentUser created it. Backend will reject any attempts*/}
            {props.currentUser.id === props.blog.user.id && removeButton()}
          </>
        )}
      </div>
    </>
  );
};

TogglableBlog.protoTypes = {
  currentUser: PropTypes.object.isRequired,
  viewButtonLabel: PropTypes.string.isRequired,
  hideButtonLabel: PropTypes.string.isRequired,
  blog: PropTypes.string.isRequired,
  handleLike: PropTypes.func.isRequired,
  handleRemoval: PropTypes.func.isRequired,
};

export default TogglableBlog;
