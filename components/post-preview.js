import Link from 'next/link';

export default function PostPreview({ title, slug, summary, id }) {
  return (
    <article>
      <h2>{title}</h2>
      <p>{summary}</p>
      <Link href={`/post/${slug}`}>
        <a>Read more...</a>
      </Link>
    </article>
  );
}
