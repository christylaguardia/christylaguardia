import React from 'react';
import { useRouter } from 'next/router';
import { CopyToClipboard } from 'react-copy-to-clipboard';

export default function Share() {
  const {
    query: { year, month, day, postname },
  } = useRouter();
  const shareUrl = `https://christylaguardia.com/${year}/${month}/${day}/${postname}`;

  return (
    <div className="contact">
      <p>
        <span>Thoughts? I&apos;d love to hear them! Send me an </span>
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
          rel="noreferrer"
          href="https://twitter.com/intent/tweet?screen_name=christylga&ref_src=twsrc%5Etfw"
        >
          tweet
        </a>
        .
      </p>

      <label htmlFor="share-url" className="share-label">
        Share this article:
      </label>
      <div className="share-container">
        <input
          name="share-url"
          className="share-input"
          defaultValue={shareUrl}
          onClick={(event) => event.target.select()}
        />
        <CopyToClipboard text={shareUrl}>
          <button className="share-button">Copy</button>
        </CopyToClipboard>
      </div>
    </div>
  );
}
