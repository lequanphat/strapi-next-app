import Link from "next/link"
interface Post{
    id: number;
    userId:number;
    title:string;
    body:string;
}
const Blog = async () => {
    const res = await fetch('https://jsonplaceholder.typicode.com/posts', {next: {revalidate: 10}});
    const Posts:Post[] = await res.json();
  return (
    <div>
      <div className="flex items-center justify-between">
        <h1>This is blog page</h1>
        <Link href="/blogs/new">+ New Blog</Link>
      </div>
      <div>
        <ul>
          {Posts.map((post: Post) => <li key={post.id} className="p-4 m-4 border-[1px] border-solid border-[#333] rounded-md">
            <h1 className="font-semibold">{post.id} - {post.title}</h1>
            <p>{post.body}</p>

            <Link href={`/blogs/${post.id}`} className="text-blue-500 mt-4 block">Read More</Link>
          </li>)}
        </ul>
      </div>
    </div>
  )
}

export default Blog
