/* eslint-disable @next/next/no-img-element */
"use client";

import Link from 'next/link';
import './home.css';

export default function Home() {

  return (
    <>
      <Link href="/todo-list" className='link'>Todo List</Link>
      <Link href="/object-detection" className="link">Object Detection</Link>
    </>
  );
}
