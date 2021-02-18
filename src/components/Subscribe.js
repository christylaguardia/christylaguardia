import React from 'react';

export default function Subscribe() {
  return (
    <div className="subscribe">
      <form
        action={`https://formspree.io/f/${process.env.NEXT_PUBLIC_FORMSPREE}`}
        method="post"
      >
        <label className="subscribe-label" for="email">
          Want to get these posts in your inbox?
        </label>
        <div className="subscribe-container">
          <input
            className="subscribe-input"
            name="Email"
            id="email"
            type="email"
            placeholder="me@email.com"
          />
          <button className="subscribe-button" type="submit">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
