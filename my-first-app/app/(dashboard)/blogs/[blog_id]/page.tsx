import Link from "next/link";
import DetailedBlogInfo from "./components";

// generate metadata function
export const generateMetadata = ({
    params,
}: {
    params: { blog_id: string };
}) => {
    return {
        title: `Blog ${params.blog_id}`,
    };
};

const DetailedBlog = ({ params }: { params: { blog_id: string } }) => {
    return (
        <div className="py-16">
            <div className="py-4">
                <Link href="/blogs">Back to Blogs</Link>
            </div>
            <DetailedBlogInfo blog_id={params.blog_id} />
        </div>
    );
};

export default DetailedBlog;
