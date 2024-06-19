"use client";
import { useMutation, useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useEffect, useState } from "react";

interface Blog {
    id: string;
    attributes: {
        title: string;
        content: string;
        createdat: string;
    };
}

const fetchBlog = async (blog_id: string) => {
    const response = fetch(`http://localhost:1338/api/blogs/${blog_id}`)
        .then((response) => response.json())
        .catch((err) => console.error(err));
    return response;
};

const updateBlog = async ({
  id,
  title,
  content,
}: {
  id: string;
  title: string;
  content: string;
}) => {
  const response = fetch(`http://localhost:1338/api/blogs/${id}`, {
      method: "PUT",
      headers: {
          "Content-Type": "application/json",
      },
      body: JSON.stringify({ data: { title, content } }),
  })
      .then((response) => response.json())
      .catch((err) => console.error(err));
  return response;
};


const UpdateBlogPage = ({ params }: { params: { blog_id: string } }) => {
    const { data, isLoading } = useQuery({
        queryFn: () => fetchBlog(params.blog_id),
        queryKey: ["blog"],
    });

    const mutation = useMutation({
      mutationFn: (newBlog: {id: string; title:string; content:string}) => {
          return updateBlog(newBlog);
      },
      onSuccess: () => {
          setIsSuccess(true);
      },
      onError: () => {
          setIsError(true);
      },
  });

    const blog: Blog = data?.data || {};
    const [isSuccess, setIsSuccess] = useState<boolean>(false);
    const [isError, setIsError] = useState<boolean>(false);
    const [title, setTitle] = useState(blog?.attributes?.title || "");
    const [content, setContent] = useState(blog?.attributes?.content || "");
    useEffect(()=>{
      setTitle(blog?.attributes?.title || "");
      setContent(blog?.attributes?.content || "");
    }, [data])
    // handle
    const handleUpdateBlog = () => {
        mutation.mutate({ id: blog.id, title, content });
    };
    return (
        <div className="py-16">
            <div className="py-4">
                <Link href="/blogs">Back to Blogs</Link>
            </div>
            <div className="flex flex-col items-center gap-4 ">
                <div className="w-full p-8 border-[1px] border-solid border-[#ccc] rounded-md">
                    <h1 className="font-medium">Update blog</h1>
                    <div>
                        <div className="py-3">
                            <input
                                value={title}
                                type="text"
                                placeholder="Title"
                                className="input input-bordered w-full max-w-xs"
                                onChange={(e) => {
                                    setTitle(e.target.value);
                                }}
                            />
                        </div>
                        <div className="py-3">
                            <textarea
                              rows={5}
                                value={content}
                                onChange={(e) => {
                                    setContent(e.target.value);
                                }}
                                className="textarea textarea-bordered w-full "
                                placeholder="Bio"
                            ></textarea>
                        </div>
                        <div className="py-3">
                            <button
                                className="btn btn-primary w-full"
                                onClick={handleUpdateBlog}
                            >
                                Update
                            </button>
                        </div>
                        <div>
                            {isSuccess && (
                                <div
                                    role="alert"
                                    className="alert alert-success"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="stroke-current shrink-0 h-6 w-6"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                        />
                                    </svg>
                                    <span>Updated blog successfully!!!</span>
                                </div>
                            )}
                            {isError && (
                                <div role="alert" className="alert alert-error">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="stroke-current shrink-0 h-6 w-6"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                                        />
                                    </svg>
                                    <span>Error! Update blog failed!!!.</span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UpdateBlogPage;
