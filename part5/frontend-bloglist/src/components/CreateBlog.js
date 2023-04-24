const NewBlogForm = ({
  addNewBlog,
  title,
  handleOnChangedTitle,
  author,
  handleOnChangedAuthor,
  url,
  handleOnChangedUrl,
}) => {
  return (
    <>
      <h2>create new blog</h2>
      <form onSubmit={addNewBlog}>
        <div>
          title: <input value={title} onChange={handleOnChangedTitle} />
        </div>
        <div style={{ marginTop: 10 }}>
          author:{" "}
          <input value={author} onChange={handleOnChangedAuthor} />
        </div>
        <div style={{ marginTop: 10 }}>
          url: <input value={url} onChange={handleOnChangedUrl} />
        </div>
        <div style={{ marginTop: 10 }}>
          <p>submit new blog<button style={{ marginLeft: 10 }} type="submit">submit</button></p>
        </div>
      </form>
    </>
  );
};

export default NewBlogForm;
