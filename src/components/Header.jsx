import React from 'react';
import Link from 'next/link';
import css from './Header.module.css';
import Image from 'next/image';

export default function Header() {
  return (
    <header>
      <div className={css.profile}>
        <Link href="/">
          <Image
            className={css.image}
            src={'/android-chrome-192x192.png'}
            height={100}
            width={100}
            loading="lazy"
            alt="Christy La Guardia"
          />
          <div className={css.title}>
            <h1>Christy La&nbsp;Guardia</h1>
            <p>Senior Software Engineer + Mentor</p>
          </div>
        </Link>
        <ul className={css.links}>
          <li>
            <Link href="https://calendly.com/christylaguardia" target="_blank">
              Book a Session
            </Link>
          </li>
          <li>
            <Link href="/contact">Contact</Link>
          </li>
        </ul>
      </div>
    </header>
  );
}
