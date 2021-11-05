import Head from 'next/head';

const Wrap = ({ children, title }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <link
          rel='stylesheet'
          href='https://cdn.jsdelivr.net/npm/water.css@2/out/water.css'
        />
      </Head>
      {children}
    </>
  );
};

export default Wrap;
