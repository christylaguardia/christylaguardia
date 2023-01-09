import Link from 'next/link';
import React from 'react';
import PropTypes from 'prop-types';
import { fetchByEntry } from '../src/helpers/contentful';

export default function Home(props) {
  const {
    entry: {
      fields: { title, body },
    },
  } = props;
  return (
    <div
      style={{
        height: '100vh',
        backgroundImage: `url(/Alcatraz.jpg)`,
        backgroundSize: 'cover',
        display: 'flex',
        flexDirection: 'row',
        backgroundPosition: 'center',
      }}
    >
      <div
        style={{
          marginLeft: '55%',
          flexDirection: 'column',
          display: 'flex',
          // padding: '3rem',
          height: '100%',
          // alignItems: 'center',
          justifyContent: 'center',
          fontSize: '3rem',
        }}
      >
        <h1
          style={{
            fontSize: '3.3rem',
            margin: 0,
            animation: 'fadeIn 1s',
          }}
        >
          Christy
        </h1>
        <h1
          style={{
            fontSize: '3.3rem',
            margin: 0,
            marginLeft: '2rem',
            animation: 'fadeIn 2s',
          }}
        >
          La&nbsp;Guardia
        </h1>
        <div>
          <p style={{ margin: 0, marginLeft: '4rem', animation: 'fadeIn 3s' }}>
            <Link href={{ pathname: `/projects/` }}>
              <a width="100%" href={`/projects/`}>
                Work
              </a>
            </Link>
          </p>
          <p style={{ margin: 0, marginLeft: '6rem', animation: 'fadeIn 4s' }}>
            <Link href={{ pathname: `/blog/` }}>
              <a width="100%" href={`/blog/`}>
                Blog
              </a>
            </Link>
          </p>
          <p style={{ margin: 0, marginLeft: '8rem', animation: 'fadeIn 5s' }}>
            <Link href={{ pathname: `/me/` }}>
              <a width="100%" href={`/me/`}>
                Me
              </a>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

Home.propTypes = {
  entry: PropTypes.shape({
    fields: PropTypes.shape({
      title: PropTypes.string,
      body: PropTypes.string,
    }),
  }),
};

export async function getStaticProps() {
  return fetchByEntry('2DhHAgxs0TQ4fvDFC6w8Fs');
}
