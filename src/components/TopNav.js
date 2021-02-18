import React from 'react';
import Link from 'next/link';

export default function TopNav() {
  return (
    <nav>
      <ul className="top-nav">
        <li className="top-nav-item">
          <Link href="/">
            <a>Christy La&nbsp;Guardia</a>
          </Link>
        </li>
        <li className="top-nav-item">
          <Link href="/blog">
            <a>Blog</a>
          </Link>
        </li>
        <li className="top-nav-item">
          <Link href="/projects">
            <a>Projects</a>
          </Link>
        </li>
        <li className="top-nav-item">
          <Link href="/contact">
            <a>Contact</a>
          </Link>
        </li>
      </ul>
    </nav>
  );
}
