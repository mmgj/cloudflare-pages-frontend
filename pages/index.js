import Head from 'next/head';
import { groq } from 'next-sanity';
import { getClient } from '../lib/sanity.server';
import PostPreview from '../components/post-preview';
import Wrap from '../components/Wrap';

export default function IndexPage({ postList }) {
  return (
    <Wrap title='Home Page'>
      <main>
        <h1>List of posts</h1>
        <section>
          {postList &&
            postList.map((post) => <PostPreview {...post} key={post._id} />)}
        </section>
      </main>
    </Wrap>
  );
}

export async function getStaticProps() {
  const paths = await getClient().fetch(
    groq`*[_type == "post" && defined(slug.current)]{
      _id,
      summary,
      title,
    "slug": slug.current
  }`
  );
  return {
    props: {
      postList: paths.map(({ slug, title, summary, _id }) => ({
        slug,
        summary,
        title,
        _id,
      })),
      fallback: false,
    },
  };
}
