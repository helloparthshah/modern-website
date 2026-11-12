import Link from "next/link"
import { Row, Col, Containter, Badge } from "react-bootstrap"
import Image from "next/image"
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import remarkGfm from 'remark-gfm'
import remarkToc from 'remark-toc'
import rehypeSlug from 'rehype-slug'
import rehypeRaw from 'rehype-raw'
import remarkSlug from "remark-slug";
import remarkFrontmatter from 'remark-frontmatter';
import placeholder from "/public/images/placeholder.png"

export default function BlogTile({ blog }) {
    function readingTime(text) {
        const wpm = 225;
        const words = text.trim().split(/\s+/).length;
        const time = words / wpm;
        if (time < 1) {
            return "<1";
        }
        return Math.ceil(time);
    }
    const authors = blog.metadata.authors ?? [];
    return (
        <Link href={`/blogs/${blog.name}`} className="ps-card blog-card" key={blog.name}>
            <div className="blog-card-body">
                <div className="ps-muted small mb-1">
                    {authors.join(", ")}
                    {authors.length > 0 && " · "}
                    <DateConvert date={blog.metadata.date} />
                    {" · "}
                    {readingTime(blog.content) + " min read"}
                </div>
                <h4 className="blog-card-title">{blog.metadata.title}</h4>
                <div className="content-text blog-card-excerpt">
                    {
                        blog.metadata.description ? blog.metadata.description :
                            <ReactMarkdown
                                remarkPlugins={[remarkGfm, remarkToc, remarkFrontmatter, remarkSlug]}
                                rehypePlugins={[rehypeHighlight, { ignoreMissing: true }, rehypeSlug, rehypeRaw]}
                            >
                                {blog.content}
                            </ReactMarkdown>
                    }
                </div>
                <div className="mt-auto pt-2">
                    {(blog.metadata.tags ?? []).map((tag, index) => (
                        <span className="ps-chip" key={index}>{tag}</span>
                    ))}
                </div>
            </div>
            <div className="blog-card-image blog-tile-image">
                <Image
                    src={blog.metadata.image ?? placeholder}
                    alt={blog.metadata.title}
                    fill
                    sizes="(max-width: 786px) 0px, 320px"
                    style={{ objectFit: 'cover' }} />
            </div>
        </Link>
    )
}

function DateConvert({ date }) {
    // Create a new Date object from the given string
    const dateObj = new Date(date);

    // Define an array of month names
    const monthNames = [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];

    // Extract day and month values from the date object
    const day = dateObj.getDate();
    const month = dateObj.getMonth();

    // Convert the date to format
    const formattedDate = `${day} ${monthNames[month]}`;

    return formattedDate;
}