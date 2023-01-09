import React from 'react';
import Link from 'next/link';

export default function TopNav() {
  // TODO: make top nav configurable from Contentful
  const menu = [
    { title: <span>Christy La&nbsp;Guardia</span>, page: '/me' },
    { title: 'Work', page: '/projects' },
    { title: 'Blog', page: '/blog' },
  ];

  return (
    <nav>
      <ul className="top-nav">
        {menu.map(({ title, page }) => (
          <li className="top-nav-item" key={page}>
            <Link href={page}>
              <a href={`https://christylaguardia.com${page}`}>{title}</a>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
