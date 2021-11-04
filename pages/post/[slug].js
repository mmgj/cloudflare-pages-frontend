import ErrorPage from 'next/error';
import { useRouter } from 'next/router';
import { groq } from 'next-sanity';
import { getClient } from '../../lib/sanity.server';
import { urlFor, PortableText } from '../../lib/sanity';

import Wrap from '../../components/Wrap';

const postQuery = groq`
  *[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    body,
    mainImage,
    "slug": slug.current
  }
`;

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
      <article>
        <h2>{title}</h2>
        <figure>
          <img src={urlFor(mainImage).url()} />
        </figure>
        <PortableText blocks={body} />
      </article>
    </Wrap>
  );
}

export async function getStaticProps({ params }) {
  const post = await getClient().fetch(postQuery, {
    slug: params.slug,
  });

  return {
    props: {
      data: { post },
    },
  };
}

export async function getStaticPaths() {
  const paths = await getClient().fetch(
    groq`*[_type == "post" && defined(slug.current)][].slug.current`
  );

  return {
    paths: paths.map((slug) => ({ params: { slug } })),
    fallback: false,
  };
}
