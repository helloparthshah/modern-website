import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import remarkGfm from "remark-gfm";
import remarkToc from "remark-toc";
import rehypeSlug from "rehype-slug";
import rehypeRaw from "rehype-raw";
import remarkSlug from "remark-slug";
import remarkFrontmatter from "remark-frontmatter";
import { useRouter } from "next/router";
// import 'github-markdown-css/github-markdown-light.css'
import Metadata from "@/components/metadata";
import { Container } from "react-bootstrap";

export default function Page() {
  const [content, setContent] = useState("");
  const [metadata, setMetadata] = useState({});
  const router = useRouter();

  useEffect(() => {
    if (!router.query.name) return;
    fetch(`/api/getBlogContent`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: router.query.name }),
    })
      .then((res) => {
        if (!res.ok) {
          router.replace("/404");
          return;
        }
        return res.json();
      })
      .then(async (data) => {
        if (!data) return;
        setContent(data.content);
        setMetadata(data.metadata);
      });
  }, [router.query.name]);

  return (
    <Container>
      <div className="mt-5 mb-5">
        <Metadata metadata={metadata} />
      </div>
      <Container style={{ width: "85%" }}>
        <ReactMarkdown
          className="markdown-body"
          remarkPlugins={[remarkGfm, remarkToc, remarkFrontmatter, remarkSlug]}
          rehypePlugins={[
            rehypeHighlight,
            { ignoreMissing: true },
            rehypeSlug,
            rehypeRaw,
          ]}
        >
          {content}
        </ReactMarkdown>
      </Container>
    </Container>
  );
}
