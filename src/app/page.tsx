// app/page.tsx
"use client"

import { FC } from "react";
import Head from "next/head";
import Link from "next/link";
import styles from "../styles/page.module.css"; // Importa los estilos específicos para esta página

const HomePage: FC = () => {
  return (
    <>
      <Head>
        <title>Home Page</title>
        <meta
          name="description"
          content="Welcome to the home page of my Next.js app"
        />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Welcome to Next.js</h1>
        <p className={styles.description}>
          This is a basic example of a Next.js page.
        </p>
        <nav>
          <ul className={styles.navList}>
            <li>
              <Link href="/about">About</Link>
            </li>
            <li>
              <Link href="/contact">Contact</Link>
            </li>
          </ul>
        </nav>
      </main>
    </>
  );
};

export default HomePage;
