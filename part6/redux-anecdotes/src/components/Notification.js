/*Everything commented was the previous solutions where the component took care
of how long a notification was displayed. Now it's done in the notificationReducer*/

import { useSelector } from "react-redux";
//import { useState, useEffect } from "react";

const Notification = () => {
  // const [displayNotification, setdisplayNotification] = useState(false);

  const notification = useSelector((state) => {
    return state.notification;
  });

  /** useEffect(() => {
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
  }, [notification]); **/

  return (
    <>
      {/*{displayNotification && ( */}
       {notification !== "" && (<div className="notification">{notification}</div>)}
      {/*)}*/}
    </>
  );
};

export default Notification;
