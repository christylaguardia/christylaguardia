import React from 'react';
import Layout from '../src/components/Layout';

export default function About() {
  return (
    <Layout>
      <div className="contact">
        <h3>Want to chat?</h3>
        <p>
          <span>
            Email is the best way to reach me, here's my email address:
          </span>
          <span> </span>
          <a
            href="mailto:christinelaguardia@gmail.com"
            target="_blank"
            rel="noreferrer"
          >
            christinelaguardia@gmail.com
          </a>
        </p>

        <p>You can also find me here:</p>

        <p>
          <a
            href="https://www.linkedin.com/in/christy-la-guardia/"
            target="_blank"
            rel="noreferrer"
          >
            LinkedIn
          </a>
        </p>

        <p>
          <a
            href="https://twitter.com/christylga"
            target="_blank"
            rel="noreferrer"
          >
            Twitter
          </a>
        </p>

        <p>
          <a
            href="https://medium.com/@christylaguardia"
            target="_blank"
            rel="noreferrer"
          >
            Medium
          </a>
        </p>

        <p>
          <span>Want to know even more about me?</span>
          <span> </span>
          <a
            href="https://christylaguardia.github.io/"
            target="_blank"
            rel="noreferrer"
          >
            Check out my portfolio.
          </a>
        </p>
      </div>
    </Layout>
  );
}
