import React from 'react';
import PropTypes from 'prop-types';

export default function Contact({ title }) {
  return (
    <div className="Contact">
      {title && <h3>{title}</h3>}
      <p>
        <span>Send me an </span>
        <a
          target="_blank"
          rel="noreferrer"
          href={`mailto:christinelaguardia@gmail.com`}
        >
          email
        </a>
        , or fill out the form below.
      </p>
      <form
        action={`https://formspree.io/f/${process.env.NEXT_PUBLIC_FORMSPREE}`}
        method="post"
      >
        <input
          name="Email"
          id="email"
          type="email"
          placeholder="Your email..."
          required
        />
        <textarea
          id="message"
          name="message"
          required
          rows={6}
          placeholder="Your Message..."
        />
        <input type="submit" value="Send" />
      </form>
    </div>
  );
}

Contact.propTypes = {
  title: PropTypes.string,
};
