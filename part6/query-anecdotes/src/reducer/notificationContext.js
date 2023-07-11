import { createContext, useReducer, useContext, useEffect } from "react";

const notificationReducer = (state, action) => {
  switch (action.type) {
    case "SET":
      return action.payload;
    case "CLEAR":
      return "";
    default:
      return state;
  }
};

const NotificationContext = createContext();

export const useNotificationValue = () => {
  const notificationAndDispatch = useContext(NotificationContext);
  return notificationAndDispatch[0];
};

export const useNotificationDispatch = () => {
  const notificationAndDispatch = useContext(NotificationContext);
  return notificationAndDispatch[1];
};

export const NotificationContextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(
    notificationReducer,
    ""
  );

  // I'm not sure if this is dumb, but I wanted to keep all files related to the
  // notification state managment in a single file. An addition of a function like
  // "setNotificationTimeOut" could make it more modifiable.
  useEffect(() => {
    let timeOutNotification = null;

    if (notification !== "") {
      timeOutNotification = setTimeout(() => {
        notificationDispatch({ type: "CLEAR" });
      }, 5000);
    }

    //To reset the timer if notification gets updated. Return value for unmounting
    return () => {
      clearTimeout(timeOutNotification);
    };
  }, [notification]);

  return (
    <NotificationContext.Provider value={[notification, notificationDispatch]}>
      {props.children}
    </NotificationContext.Provider>
  );
};

export default NotificationContext;
