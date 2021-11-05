import Head from 'next/head';
import Link from 'next/link';
import { groq } from 'next-sanity';
import { sanityClient, urlFor } from '../lib/sanity';
import Wrap from '../components/wrap';

export async function getStaticProps() {
  const paths = await sanityClient.fetch(
    groq`*[_type == "post" && defined(slug.current)]{
      _id,
      _updatedAt,
      summary,
      title,
      mainImage,
    "slug": slug.current
    } | order(_updatedAt desc)`
  );
  return {
    props: {
      postList: paths.map(({ slug, title, summary, _id, mainImage }) => ({
        slug,
        summary,
        title,
        mainImage,
        _id,
      })),
      fallback: false,
    },
  };
}

export default function IndexPage({ postList }) {
  return (
    <Wrap title='Home Page'>
      <main>
        <h1>All posts</h1>
        <section>
          {postList.map((post) => (
            <article key={post._id} style={{ display: 'flex' }}>
              <div style={{ flexShrink: 0, margin: 20 }}>
                <img
                  src={urlFor(post.mainImage).height(150).width(100).url()}
                />
              </div>
              <div>
                <h2>{post.title}</h2>
                <p>{post.summary}</p>
                <Link href={`/post/${post.slug}`}>
                  <a>Read more...</a>
                </Link>
              </div>
            </article>
          ))}
        </section>
      </main>
    </Wrap>
  );
}
