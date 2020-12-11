import React from 'react';
import Layout from '../src/components/Layout';

export default function About() {
  return (
    <Layout>
      <div className="about">
        <blockquote cite="https://en.wikiquote.org/wiki/Thucydides">
          <p>
            The secret of happiness is freedom and the secret of freedom is
            courage.
          </p>
          <footer>—Thucydides</footer>
        </blockquote>
        <p>
          I was raised in a Jehovah Witness family and served as a regular
          pioneer and volunteer drafter in Portland, Oregon. At the height of my
          Theocratic career, I left it all behind to start a new life, free from
          my controlling family and religion and resulting in being totally
          shunned by everyone I knew.
        </p>
        <p>
          In the five years since then I've been busy building a new life. I've
          had many firsts as I've been learning what freedom is. I met the love
          of my life, started traveling and started a new career as a software
          engineer. Currently, I live in Missoula, Montana with my partner Joel
          and our beagle, Charlie.
        </p>
        <p>
          My blog post are mostly stories about my life as a Jehovah Witness and
          journey of self-discovery.
        </p>
      </div>
    </Layout>
  );
}
