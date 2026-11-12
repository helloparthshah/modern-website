import about from './about.md';
import { Container } from "react-bootstrap";
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import remarkToc from 'remark-toc'
import rehypeHighlight from 'rehype-highlight'
import rehypeSlug from 'rehype-slug'
import rehypeRaw from 'rehype-raw'
import remarkFrontmatter from 'remark-frontmatter';
import PageHeader from '@/components/pageHeader';

// The markdown starts with its own title and divider; the page header replaces them.
const body = about.replace(/^#[^\n]*\n+(---\n+)?/, '');

export default function About() {
    return (
        <Container className='about page'>
            <PageHeader eyebrow="About this site" title="About" subtitle="A personal portfolio template you can fork and make your own." />
            <div className='ps-card prose-card'>
                <ReactMarkdown
                    className='markdown-body prose'
                    rehypePlugins={[[rehypeHighlight, { ignoreMissing: true }], rehypeRaw, rehypeSlug]}
                    remarkPlugins={[remarkGfm, remarkToc, remarkFrontmatter]}
                >
                    {body}
                </ReactMarkdown>
            </div>
        </Container>
    )
}
