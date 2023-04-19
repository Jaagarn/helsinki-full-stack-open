import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import Notification from "./components/Notification";
import Login from "./components/Login";
import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [notificationMessage, setNotificationMessage] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  const attemptLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({
        username,
        password,
      });

      blogService.setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");
    } catch (exception) {
      setErrorMessage("Wrong credentials");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  useEffect(() => {
    const fetchBlogs = async () => {
      if (user === null) {
        setBlogs([]);
        blogService.setToken(null);
        return;
      }
      try {
        const blogs = await blogService.getAll();
        setBlogs(blogs);
      } catch (error) {
        console.log("Fetch blogs in app error: ", error);
      }
    };
    fetchBlogs();
  }, [user]);

  const handleOnChangedUsername = (event) => {
    setUsername(event.target.value);
  };

  const handleOnChangedPassword = (event) => {
    setPassword(event.target.value);
  };

  const loginForm = () => (
    <Login
      username={username}
      password={password}
      handleOnChangedUsername={handleOnChangedUsername}
      handleOnChangedPassword={handleOnChangedPassword}
      attemptLogin={attemptLogin}
    />
  );

  const blogsComponent = () => {
    if (blogs === null) {
      return <></>;
    }

    return (
      <>
        <h2>blogs</h2>
        {blogs.map((blog) => (
          <Blog key={blog.id} blog={blog} />
        ))}
      </>
    );
  };

  return (
    <div>
      <h2>login to blogs</h2>
      <Notification className="error" message={errorMessage} />
      <Notification className="notification" message={notificationMessage} />
      {!user && loginForm()}
      {user && (
          <>
            <h2>blogs</h2>
            <p>{user.name} logged in</p>
          </>
        ) &&
        blogsComponent()}
    </div>
  );
};

export default App;
