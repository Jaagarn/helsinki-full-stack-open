import { useState } from "react";

const NewBlogForm = ({ createNewBlog }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const newBlog = (event) => {
    event.preventDefault();

    createNewBlog({
      title: title,
      author: author,
      url: url,
    });

    setTitle("");
    setAuthor("");
    setUrl("");
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

  return (
    <>
      <h2>create new blog</h2>
      <form onSubmit={newBlog}>
        <div>
          title: <input value={title} onChange={handleOnChangedTitle} />
        </div>
        <div style={{ marginTop: 10 }}>
          author: <input value={author} onChange={handleOnChangedAuthor} />
        </div>
        <div style={{ marginTop: 10 }}>
          url: <input value={url} onChange={handleOnChangedUrl} />
        </div>
        <div style={{ marginTop: 10 }}>
          <p>
            submit new blog
            <button style={{ marginLeft: 10 }} type="submit">
              submit
            </button>
          </p>
        </div>
      </form>
    </>
  );
};

export default NewBlogForm;
