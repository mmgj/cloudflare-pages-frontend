import Link from 'next/link';
import ErrorPage from 'next/error';
import { useRouter } from 'next/router';
import { groq } from 'next-sanity';

import { urlFor, PortableText, sanityClient } from '../../lib/sanity';
import Wrap from '../../components/wrap';

const postQuery = groq`
  *[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    body,
    mainImage,
    "slug": slug.current
  }
`;

export async function getStaticProps({ params }) {
  const post = await sanityClient.fetch(postQuery, {
    slug: params.slug,
  });
  return {
    props: {
      data: { post },
    },
  };
}

export async function getStaticPaths() {
  const paths = await sanityClient.fetch(
    groq`*[_type == "post" && defined(slug.current)][].slug.current`
  );
  return {
    paths: paths.map((slug) => ({ params: { slug } })),
    fallback: false,
  };
}

export default function Post({ data }) {
  const router = useRouter();

  if (!router.isFallback && !data.post?.slug) {
    return <ErrorPage statusCode={404} />;
  }

  const {
    post: { title, mainImage, body },
  } = data;

  return (
    <Wrap title='Posts'>
      <Link href='/'>
        <a>Home</a>
      </Link>
      <article>
        <h1>{title}</h1>
        <figure style={{ padding: 0, margin: 0 }}>
          <img src={urlFor(mainImage).url()} />
        </figure>
        <PortableText blocks={body} />
      </article>
    </Wrap>
  );
}
