import { useState } from "react";

const Togglable = (props) => {
  const [visible, setVisible] = useState(false);

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  return (
    <>
      {!visible && (
        <button onClick={toggleVisibility} data-testid="toggable-show-button">
          {props.viewButtonLabel}
        </button>
      )}
      {visible && (
        <div>
          <button onClick={toggleVisibility} data-testid="toggable-show-button">
            {props.hideButtonLabel}
          </button>
          {props.children}
        </div>
      )}
    </>
  );
};

export default Togglable;
