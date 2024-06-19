"use client";
import { useMutation, useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useEffect, useState } from "react";

// define blog interface
interface Blog {
    id: string;
    attributes: {
        title: string;
        content: string;
        createdAt: string;
    };
}

const fetchBlogs = async () => {
    const response = fetch("http://localhost:1338/api/blogs", {
        cache: "no-cache",
    })
        .then((response) => response.json())
        .catch((err) => console.error(err));
    return response;
};
const deleteBlogs = async (id: string) => {
    const response = fetch(`http://localhost:1338/api/blogs/${id}`, {
        method: "DELETE",
    })
        .then((response) => response.json())
        .catch((err) => console.error(err));
    return response;
};
const BlogsList = () => {
    const { data, isLoading } = useQuery({
        queryFn: fetchBlogs,
        queryKey: ["blogs"],
    });
    
    // useMutation to delete blog
    const mutation = useMutation({
        mutationFn: (blog_id: string) => {
            return deleteBlogs(blog_id);
        },
        onSuccess: (data, variables) => {
            setBlogs(blogs.filter((blog: Blog) => blog.id != variables));
            console.log("Xóa thành công");
        },
    });

    // state to store blogs
    const [blogs, setBlogs] = useState(data?.data || []);

    // handle delete blog
    const handleDeleteBlog = (id: string) => {
        mutation.mutate(id);
    };

    // effect to update blogs
    useEffect(() => {
        setBlogs(data?.data || []);
    }, [data]);

    if (isLoading)
        return (
            <div className="flex items-center justify-center min-h-[300px]">
                <span className="loading loading-spinner loading-lg"></span>
            </div>
        );
    return (
        <ul>
            {blogs?.map((blog: Blog) => (
                <li
                    key={blog.id}
                    className="p-4 m-4 border-[1px] border-solid border-[#333] rounded-md"
                >
                    <h1 className="font-semibold">
                        {blog.id} - {blog.attributes.title}
                    </h1>
                    <p>{blog.attributes.content}</p>
                    <p>{blog.attributes.createdAt}</p>

                    <div className="flex items-center gap-4 mt-4 ">
                        <Link
                            href={`/blogs/${blog.id}`}
                            className="text-blue-500"
                        >
                            Read More
                        </Link>
                        <Link
                            href={`/blogs/${blog.id}/update`}
                            className="text-blue-500"
                        >
                            Update
                        </Link>
                        <button
                            className="text-red-600"
                            onClick={() => {
                                handleDeleteBlog(blog.id);
                            }}
                        >
                            Delete
                        </button>
                    </div>
                </li>
            ))}
        </ul>
    );
};

export default BlogsList;
