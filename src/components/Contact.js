import React from 'react';

export default function Contact() {
  return (
    <p>
      <em>
        <span>Thoughts? Want to chat? Send me an </span>
        <a
          target="_blank"
          rel="noreferrer"
          href="mailto:christinelaguardia@gmail.com"
        >
          email
        </a>
        <span> or a </span>
        <a
          target="_blank"
          href="https://twitter.com/intent/tweet?screen_name=christylga&ref_src=twsrc%5Etfw"
          class="twitter-mention-button"
          data-show-count="false"
        >
          tweet
        </a>
        .
      </em>
    </p>
  );
}
