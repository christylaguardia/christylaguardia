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
          pioneer and engineering volunteer on the Regional Building Committee
          in Portland, Oregon. Five years ago, at the height of my Theocratic
          career, I left it all behind to start a new life, free from my
          controlling family and religion.
        </p>
        <p>
          My blog post are mostly stories about my life as a Jehovah Witness and
          journey of self-discovery.
        </p>
      </div>
    </Layout>
  );
}
