'use client';
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
interface Blog {
  id:string;
  attributes: {
    title: string;
    content:string;
    createdat: string;
  }
}

const fetchBlog = async (blog_id:string) => {
  const response = fetch(`http://localhost:1338/api/blogs/${blog_id}`, {cache: "no-cache"})
    .then((response) => response.json())
    .catch((err) => console.error(err));
    return response;
};
const DetailedBlog = ({ params } : {params : {blog_id: string}}) => {
  const { data, isLoading } = useQuery({
    queryFn: () => fetchBlog(params.blog_id),
    queryKey: ["blog"], 
  });
  const blog: Blog = data?.data || {};
  console.log(blog);
  return (
    <div className="py-16">
      <div className="py-4">
        <Link href="/blogs">Back to Blogs</Link>
      </div>
       <div className="p-8 border-[1px] border-solid border-[#ccc] rounded-md">
        <h1 className="font-bold text-center">{blog?.attributes?.title}</h1>
        <div className="py-3">
          <p>{blog?.attributes?.content}</p>
        </div>
        <div>
          <p>{blog?.attributes?.createdat}</p>
        </div>
       </div>
    </div>
  )
}

export default DetailedBlog
