import React from 'react';
import Link from 'next/link';

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
          <Link href="/blog">
            <a href="https://christylaguardia.com/blog/">Blog</a>
          </Link>
        </li>
        <li className="top-nav-item">
          <Link href="/projects">
            <a href="https://christylaguardia.com/projects/">Projects</a>
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
