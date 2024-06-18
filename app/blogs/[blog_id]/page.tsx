import { useRouter } from "next/navigation"

const DetailedBlog = ({ params } : {params : {blog_id: string}}) => {
  return (
    <div>
      <h1>This is blog details {params.blog_id}</h1>
    </div>
  )
}

export default DetailedBlog
