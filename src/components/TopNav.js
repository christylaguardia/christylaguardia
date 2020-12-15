import React from 'react';
import Link from 'next/link';

export default function TopNav() {
  return (
    <nav>
      <ul className="top-nav">
        <li className="top-nav-item">
          <Link href={{ pathname: '/' }}>
            <a>Christy La&nbsp;Guardia</a>
          </Link>
        </li>
        <li className="top-nav-item">
          <Link href={{ pathname: '/about' }}>
            <a>About</a>
          </Link>
        </li>
      </ul>
    </nav>
  );
}
