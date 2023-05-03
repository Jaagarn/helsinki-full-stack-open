const Blog = (props) => 
{
  return (
    <>
      <p >
        {props.blog.title} {props.blog.author}
      </p>
    </>
  )
}


export default Blog;
