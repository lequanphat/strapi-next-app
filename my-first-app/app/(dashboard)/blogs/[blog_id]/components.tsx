"use client";
import { useQuery } from "@tanstack/react-query";

// define blog interface
interface Blog {
    id: string;
    attributes: {
        title: string;
        content: string;
        createdat: string;
    };
}

// fetch blog by id
const fetchBlog = async (blog_id: string) => {
    const response = fetch(`http://localhost:1338/api/blogs/${blog_id}`, {
        cache: "no-cache",
    })
        .then((response) => response.json())
        .catch((err) => console.error(err));
    return response;
};

const DetailedBlogInfo = ({ blog_id }: { blog_id: string }) => {
    const { data, isLoading } = useQuery({
        queryFn: () => fetchBlog(blog_id),
        queryKey: ["blog"],
    });

    // retrieve blog data
    const blog: Blog = data?.data || {};

    if (isLoading)
        return (
            <div className="flex items-center justify-center min-h-[300px]">
                <span className="loading loading-spinner loading-lg"></span>
            </div>
        );
    return (
        <div className="p-8 border-[1px] border-solid border-[#ccc] rounded-md">
            <h1 className="font-bold text-center">{blog?.attributes?.title}</h1>
            <div className="py-3">
                <p>{blog?.attributes?.content}</p>
            </div>
            <div>
                <p>{blog?.attributes?.createdat}</p>
            </div>
        </div>
    );
};

export default DetailedBlogInfo;
