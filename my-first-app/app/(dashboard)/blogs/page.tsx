import Link from "next/link";
import BlogsList from "./components";
import { Metadata } from "next";
export const metadata: Metadata = {
    title: "Blog Page",
};
const Blog = () => {
    if(Math.random() > 0.5) {
        throw new Error("Random error");
    }
    return (
        <div>
            <div className="flex items-center justify-between p-4">
                <h1 className="font-bold">This is blog page</h1>
                <div className="flex items-center gap-6">
                    <Link href="/blogs/import" className="text-blue-500">
                        + Import Blogs
                    </Link>
                    <Link href="/blogs/new" className="text-blue-500">
                        + New Blog
                    </Link>
                </div>
            </div>
            <div>
                <ul>
                    <BlogsList />
                </ul>
            </div>
        </div>
    );
};

export default Blog;
