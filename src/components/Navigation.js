import React from 'react';
import Link from 'next/link';

export default function Navigation() {
  return (
    <nav>
      <ul>
        <li>
          <Link href={{ pathname: '/' }}>
            <a>&#8592; Back</a>
          </Link>
        </li>
      </ul>
    </nav>
  );
}
