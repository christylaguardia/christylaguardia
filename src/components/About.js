import React from 'react';

export default function About() {
  return (
    <section className="about">
      <p className="margin-top-0 margin-bottom-0"></p>
      <blockquote cite="https://en.wikiquote.org/wiki/Thucydides">
        <p>
          The secret of happiness is freedom and the secret of freedom is
          courage.
        </p>
        <footer>
          —Thucydides, <cite>Book II, 2.43</cite>
        </footer>
      </blockquote>
      <p>
        I was raised in a Jehovah Witness family and served as a regular pioneer
        and engineering volunteer on the Regional Building Committee in
        Portland, Oregon. Five years ago, at the height of my Theocratic career,
        I left it all behind to start a new life, free from my controlling
        family and religion.
      </p>
      <p>
        Read my stories about my life as a Jehovah Witness and journey of
        self-discovery.
      </p>
      {/* <p>
        Read tales from my life before and after leaving the Jehovah Witnesses
        cult.
      </p> */}
    </section>
  );
}
