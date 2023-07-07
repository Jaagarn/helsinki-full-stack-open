import { useSelector } from "react-redux";
import { useState, useEffect } from "react";

const Notification = () => {
  const [displayNotification, setdisplayNotification] = useState(false);

  const notification = useSelector((state) => {
    return state.notification;
  });

  useEffect(() => {
    let timeOutNotification = null;

    if (notification !== "") {
      setdisplayNotification(true);

      timeOutNotification = setTimeout(() => {
        setdisplayNotification(false);
      }, 5000);
    }

    //To reset the timer if notification gets updated. Return value for unmounting
    return () => {
      clearTimeout(timeOutNotification);
    };
  }, [notification]);

  return (
    <>
      {displayNotification && (
        <div className="notification">{notification}</div>
      )}
    </>
  );
};

export default Notification;
