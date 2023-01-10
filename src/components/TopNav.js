import React from 'react';
import Link from 'next/link';

export default function TopNav() {
  return (
    <nav>
      <ul className="top-nav">
        <li className="top-nav-item">
          <Link href="/">
            <a href={`https://christylaguardia.com/`}>
              <span>Christy La&nbsp;Guardia</span>
            </a>
          </Link>
        </li>
        <li className="top-nav-item">
          <Link href="/projects">
            <a href={`https://christylaguardia.com/projects`}>
              <span>Projects</span>
            </a>
          </Link>
        </li>
        <li className="top-nav-item">
          <Link href="/contact">
            <a href={`https://christylaguardia.com/contact`}>
              <span>Contact</span>
            </a>
          </Link>
        </li>
      </ul>
    </nav>
  );
}
