import Image from 'next/image';
import Link from 'next/link';

export default function Metadata({ metadata }) {
    const date = metadata.date
        ? new Date(metadata.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
        : '';
    const authors = metadata.authors ?? [];

    return (
        <header className="post-header">
            <Link href="/blogs" className="post-back">← All blogs</Link>
            <div className="post-header-grid">
                <div>
                    <h1 className="page-title">{metadata.title}</h1>
                    <div className="ps-muted mb-2">
                        {authors.map((author, index) => (
                            <span key={index}>
                                <Link href={`/blogs/?query=${author}`} className="post-author">{author}</Link>
                                {index < authors.length - 1 ? ", " : ""}
                            </span>
                        ))}
                        {date && <>{authors.length > 0 && " · "}{date}</>}
                    </div>
                    {metadata.description && <p className="page-subtitle ps-muted">{metadata.description}</p>}
                    <div>
                        {(metadata.tags ?? []).map((tag) => (
                            <Link key={tag} href={`/blogs/?query=${tag}`} className="ps-chip text-decoration-none">
                                {tag}
                            </Link>
                        ))}
                    </div>
                </div>
                {metadata.image && (
                    <div className="post-image blog-tile-image">
                        <Image src={metadata.image} alt={metadata.title ?? ''} fill
                            sizes="(max-width: 786px) 0px, 420px" style={{ objectFit: 'cover' }} />
                    </div>
                )}
            </div>
        </header>
    )
}
