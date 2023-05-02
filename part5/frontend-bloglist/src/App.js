import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import Notification from "./components/Notification";
import Login from "./components/Login";
import CreateBlog from "./components/CreateBlog";
import Togglable from "./components/Togglable";
import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [notificationMessage, setNotificationMessage] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");
  const [user, setUser] = useState(null);

  const fetchBlogs = async () => {
    try {
      const blogs = await blogService.getAll();
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

  const attemptCreationBlog = async (event) => {
    event.preventDefault();

    try {
      const response = await blogService.postNewBlog(title, author, url);

      if (response.status !== 201) {
        setErrorMessage(
          `Failed to create a blog: ${response.status} ${response.statusText}`
        );
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
        return;
      }

      setTitle("");
      setAuthor("");
      setUrl("");

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

  const handleOnChangedTitle = (event) => {
    setTitle(event.target.value);
  };

  const handleOnChangedAuthor = (event) => {
    setAuthor(event.target.value);
  };

  const handleOnChangedUrl = (event) => {
    setUrl(event.target.value);
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
    if (blogs === null) {
      return (
        <>
          <h2>user</h2>
          <p>{user.name} logged in</p>
          <button onClick={handleLogout} style={{ marginBottom: 10 }}>logout</button>
          <Togglable buttonLabel="Create new blog">
            <CreateBlog
              addNewBlog={attemptCreationBlog}
              title={title}
              handleOnChangedTitle={handleOnChangedTitle}
              author={author}
              handleOnChangedAuthor={handleOnChangedAuthor}
              url={url}
              handleOnChangedUrl={handleOnChangedUrl}
            />
          </Togglable>
        </>
      );
    }

    return (
      <>
        <h2>user</h2>
        <p>{user.name} logged in</p>
        <button onClick={handleLogout} style={{ marginBottom: 10 }}>logout</button>
        <Togglable buttonLabel="Create new blog" >
          <CreateBlog
            addNewBlog={attemptCreationBlog}
            title={title}
            handleOnChangedTitle={handleOnChangedTitle}
            author={author}
            handleOnChangedAuthor={handleOnChangedAuthor}
            url={url}
            handleOnChangedUrl={handleOnChangedUrl}
          />
        </Togglable>
        <h2>blogs</h2>
        {blogs.map((blog) => (
          <Blog key={blog.id} blog={blog} />
        ))}
      </>
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
