"use client";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { useState } from "react";

interface Blog {
    title: string;
    content: string;
}

const createNewBlog = async ({
    title,
    content,
}: {
    title: string;
    content: string;
}) => {
    const response = fetch("http://localhost:1338/api/blogs", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ data: { title, content } }),
    })
        .then((response) => response.json())
        .catch((err) => console.error(err));
    return response;
};
const NewBlog = () => {
    const [isSuccess, setIsSuccess] = useState<boolean>(false);
    const [isError, setIsError] = useState<boolean>(false);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const mutation = useMutation({
        mutationFn: (newBlog: Blog) => {
            return createNewBlog(newBlog);
        },
        onSuccess: () => {
            setIsSuccess(true);
        },
        onError: () => {
            setIsError(true);
        },
    });
    const handleCreateBlog = () => {
        mutation.mutate({ title, content });
    };
    return (
        <div className="py-16">
            <div className="py-4">
                <Link href="/blogs">Back to Blogs</Link>
            </div>
            <div className="flex flex-col items-center gap-4 ">
                <div className="w-full p-8 border-[1px] border-solid border-[#ccc] rounded-md">
                    <h1 className="font-medium">Create new blog</h1>
                    <div>
                        <div className="py-3 w-full">
                            <input
                                value={title}
                                type="text"
                                placeholder="Title"
                                className="input input-bordered w-full "
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
                                onClick={handleCreateBlog}
                            >
                                Create
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
                                    <span>Created blog successfully!!!</span>
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
                                    <span>Error! Create blog failed!!!.</span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NewBlog;
