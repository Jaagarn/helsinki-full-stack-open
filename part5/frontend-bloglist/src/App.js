import { useState, useEffect } from "react";

import Notification from "./components/Notification";
import Login from "./components/Login";
import CreateBlog from "./components/CreateBlog";
import Togglable from "./components/Togglable";
import blogService from "./services/blogs";
import loginService from "./services/login";
import TogglableBlog from "./components/TogglableBlog";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [notificationMessage, setNotificationMessage] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  const fetchBlogs = async () => {
    try {
      const blogs = await blogService.getAll();
      blogs.sort((blogx, blogy) => blogy.likes - blogx.likes);
      setBlogs(blogs);
    } catch (error) {
      console.log("Fetch blogs in app error: ", error);
    }
  };

  const attemptLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({
        username,
        password,
      });

      window.localStorage.setItem(
        "loggedInUserBlogsRank",
        JSON.stringify(user)
      );

      blogService.setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");
      setNotificationMessage("Login was successful!");
      setTimeout(() => {
        setNotificationMessage(null);
      }, 5000);
    } catch (error) {
      setErrorMessage("Wrong username and/or password");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const attemptCreationBlog = async (newBlog) => {
    try {
      const response = await blogService.postNewBlog(
        newBlog.title,
        newBlog.author,
        newBlog.url
      );

      if (response.status !== 201) {
        setErrorMessage(
          `Failed to create a blog: ${response.status} ${response.statusText}`
        );
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
        return;
      }

      await fetchBlogs();

      setNotificationMessage("New blog added successfully");
      setTimeout(() => {
        setNotificationMessage(null);
      }, 5000);
    } catch (error) {
      setErrorMessage(`Failed to create a new blog: frontend issues`);
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem("loggedInUserBlogsRank");
    setUser(null);
  };

  const handleOnChangedUsername = (event) => {
    setUsername(event.target.value);
  };

  const handleOnChangedPassword = (event) => {
    setPassword(event.target.value);
  };

  const updateLikesOnBlog = async (blog) => {
    try {
      const response = await blogService.likeABlog(blog);

      if (response.status !== 200) {
        setErrorMessage(
          `Failed to like a blog: ${response.status} ${response.statusText}`
        );
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
        return;
      }

      //First I wanted to just update local blogs, but some other logged in user on another webpage might change the value
      //So I just fetch them every time.
      await fetchBlogs();
    } catch (error) {
      setErrorMessage(`Failed to like a blog: frontend issues`);
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const removeABlog = async (blog) => {
    try {
      const response = await blogService.removeABlog(blog);

      if (response.status !== 204) {
        setErrorMessage(
          `Failed to remove a blog: ${response.status} ${response.statusText}`
        );
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
        return;
      }

      await fetchBlogs();
    } catch (error) {
      setErrorMessage(`Failed to like a blog: frontend issues`);
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  useEffect(() => {
    const updateBlogs = async () => {
      if (user === null) {
        setBlogs([]);
        blogService.setToken(null);
        return;
      }
      await fetchBlogs();
    };
    updateBlogs();
  }, [user]);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedInUserBlogsRank");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const loginForm = () => (
    <>
      <h2>login</h2>
      <Login
        username={username}
        password={password}
        handleOnChangedUsername={handleOnChangedUsername}
        handleOnChangedPassword={handleOnChangedPassword}
        attemptLogin={attemptLogin}
      />
    </>
  );

  const blogsComponent = () => {
    return (
      <div data-testid="blogs-home-page">
        <h2>user</h2>
        <p>{user.name} logged in</p>
        <button
          onClick={handleLogout}
          style={{ marginBottom: 10 }}
          data-testid="blogs-home-logout-button"
        >
          logout
        </button>
        <Togglable viewButtonLabel="Create new blog" hideButtonLabel="cancel">
          <CreateBlog createNewBlog={attemptCreationBlog} />
        </Togglable>
        {blogs !== null && (
          <>
            <h2>blogs</h2>
            <div className="blog-flex">
              {blogs.map((blog) => (
                <TogglableBlog
                  key={blog.id}
                  currentUser={user}
                  viewButtonLabel="view"
                  hideButtonLabel="hide"
                  style={{ marginBottom: 10 }}
                  blog={blog}
                  handleLike={updateLikesOnBlog}
                  handleRemoval={removeABlog}
                />
              ))}
            </div>
          </>
        )}
      </div>
    );
  };

  return (
    <div>
      <h1>Blogs ranker</h1>
      <Notification className="error" message={errorMessage} />
      <Notification className="notification" message={notificationMessage} />
      {!user && loginForm()}
      {user && blogsComponent()}
    </div>
  );
};

export default App;
