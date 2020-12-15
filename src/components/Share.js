import React from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { CopyToClipboard } from 'react-copy-to-clipboard';

export default function Share(props) {
  const { title } = props;
  const {
    query: { slug },
  } = useRouter();
  const shareUrl = `https://christylaguardia.com/blog/${slug}`;

  return (
    <div className="share-container">
      <p>
        <span>Thoughts? I&apos;d love to hear them! Send me an </span>
        <a
          target="_blank"
          rel="noreferrer"
          href={`mailto:christinelaguardia@gmail.com?subject=${title}&body=${shareUrl}`}
        >
          email
        </a>
        .
      </p>
      <p>
        <span>Share this article on </span>
        <a
          className="twitter-share-button"
          target="_blank"
          rel="noreferrer"
          href={`https://twitter.com/intent/tweet?url=${shareUrl}&text=${title}`}
        >
          Twitter
        </a>
        <span> &#8226; </span>
        <a
          target="_blank"
          rel="noreferrer"
          href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`}
        >
          Facebook
        </a>
        <span> &#8226; </span>
        <a
          target="_blank"
          rel="noreferrer"
          href={`https://www.linkedin.com/shareArticle?mini=true&url=${shareUrl}&title=${title}`}
        >
          LinkedIn
        </a>
        <span> &#8226; </span>
        <CopyToClipboard text={shareUrl}>
          <button className="share-button">Copy link</button>
        </CopyToClipboard>
      </p>
    </div>
  );
}

Share.propTypes = {
  title: PropTypes.string,
};
