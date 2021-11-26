import React from 'react';
import Link from 'next/link';

// TODO: make top nav configurable from Contentful

export default function TopNav() {
  return (
    <nav>
      <ul className="top-nav">
        <li className="top-nav-item">
          <Link href="/">
            {/* The href attribute is required for an anchor to be keyboard accessible.  */}
            <a href="https://christylaguardia.com/">Christy La&nbsp;Guardia</a>
          </Link>
        </li>
        <li className="top-nav-item">
          <Link href="/consulting">
            <a href="https://christylaguardia.com/consulting/">Consulting</a>
          </Link>
        </li>
        <li className="top-nav-item">
          <Link href="/contact">
            <a href="https://christylaguardia.com/contact/">Contact</a>
          </Link>
        </li>
      </ul>
    </nav>
  );
}
