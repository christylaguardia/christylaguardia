import React from 'react';
import { useRouter } from 'next/router';
import { CopyToClipboard } from 'react-copy-to-clipboard';

export default function Contact() {
  const {
    query: { year, month, day, postname },
  } = useRouter();
  const shareUrl = `https://christylaguardia.com/${year}/${month}/${day}/${postname}`;

  function myFunction() {
    /* Get the text field */
    var copyText = document.getElementById('myInput');

    /* Select the text field */
    copyText.select();
    copyText.setSelectionRange(0, 99999); /*For mobile devices*/

    /* Copy the text inside the text field */
    document.execCommand('copy');
  }

  return (
    <div className="contact">
      <p>
        <span>Thoughts? I'd love to hear them! Send me an </span>
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
        >
          tweet
        </a>
        .
      </p>

      <p className="share-label">Share this article:</p>
      <div className="share-container">
        <input
          className="share-input"
          defaultValue={shareUrl}
          onClick={event => event.target.select()}
        />
        <CopyToClipboard text={shareUrl}>
          <button className="share-button">Copy</button>
        </CopyToClipboard>
      </div>
    </div>
  );
}
