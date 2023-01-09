import React from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import Contact from './Contact';

// TODO: sometimes adblockers won't show this component

export default function Share(props) {
  const { title } = props;

  const {
    query: { slug },
  } = useRouter();

  const shareUrl = `https://christylaguardia.com/blog/${slug}`;
  const twitterUrl = `https://twitter.com/intent/tweet?url=${shareUrl}&text=${title}`;
  const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`;
  const linkedInUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${shareUrl}&title=${title}`;

  return (
    <div className="share-container">
      <p>
        <span>Share this article on </span>
        <a target="_blank" rel="noreferrer" href={twitterUrl}>
          Twitter
        </a>
        <span> &#8226; </span>
        <a target="_blank" rel="noreferrer" href={facebookUrl}>
          Facebook
        </a>
        <span> &#8226; </span>
        <a target="_blank" rel="noreferrer" href={linkedInUrl}>
          LinkedIn
        </a>
        <span> &#8226; </span>
        <CopyToClipboard text={shareUrl}>
          <button className="share-button">Copy link</button>
        </CopyToClipboard>
      </p>
      <Contact title={'Thoughts? I‘d love to hear them!'} />
    </div>
  );
}

Share.propTypes = {
  title: PropTypes.string,
};
