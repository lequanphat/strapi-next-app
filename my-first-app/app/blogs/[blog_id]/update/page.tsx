
const UpdateBlogPage = ({ params } : {params : {blog_id: string}}) => {
  return (
    <div>
      <h1>This is update blog page {params.blog_id}</h1>
    </div>
  )
}

export default UpdateBlogPage
