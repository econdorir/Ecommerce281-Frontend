import Link from "next/link";
import Image from "next/image";
import React, { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
  const [nav, setNav] = useState(false);

  const links = [
    {
      id: 1,
      text: "home",
      link: "/",
    },
    {
      id: 2,
      text: "productos",
      link: "products",
    },
    {
      id: 3,
      text: "comunidades",
      link: "comunities",
    },
    {
      id: 4,
      text: "ofertas",
      link: "offers",
    },
    {
      id: 5,
      text: "acerca de",
      link: "about",
    },
  ];

  return (
    <div className="flex justify-between items-center w-full h-20 px-4 text-white bg-black fixed nav z-10">
      <div>
        {/* <h1 className="text-5xl font-signature ml-2"><a className="link-underline hover:transition ease-in-out delay-150 hover:underline hover:decoration-solid" href="">Logo</a></h1> */}
        <h1 className="text-5xl font-signature ml-2">
          <Link href="/" passHref>
            <div className="flex items-center space-x-2">
              <div className="relative w-12 h-12 sm:w-16 sm:h-16">
                <Image
                  src="/images/Logo281.png"
                  alt="logo"
                  layout="fill"
                  objectFit="cover"
                  className="rounded-full"
                />
              </div>
              <span className="text-sm font-medium text-white">Artiisninc</span>
            </div>
          </Link>
        </h1>
      </div>

      <ul className="hidden md:flex">
        {links.map(({ id, text, link }) => (
          <li
            key={id}
            className="nav-links px-4 cursor-pointer capitalize font-medium text-gray-500 hover:scale-105 hover:text-white duration-200 link-underline"
          >
            <Link href={link}>{text}</Link>
          </li>
        ))}
        <div className="flex text-gray-600">
          <Link href={"register"} className="text-gray-100">
            Registrarse
          </Link>
          <p>&nbsp;|&nbsp;</p>
          <Link href={"login"} className="text-gray-100">
            Iniciar Sesión
          </Link>
        </div>
      </ul>

      <div
        onClick={() => setNav(!nav)}
        className="cursor-pointer pr-4 z-10 text-gray-500 md:hidden"
      >
        {nav ? <FaTimes size={30} /> : <FaBars size={30} />}
      </div>

      {nav && (
        <ul className="flex flex-col justify-center items-center absolute top-0 left-0 w-full h-screen bg-gradient-to-b from-black to-gray-800 text-gray-500">
          {links.map(({ id, text, link }) => (
            <li
              key={id}
              className="px-4 cursor-pointer capitalize py-6 text-2xl"
            >
              <Link onClick={() => setNav(!nav)} href={link}>
                {text}
              </Link>
            </li>
          ))}
          <div className="flex">
            <Link href={"register"}>Registrarse</Link>
            <p>&nbsp;|&nbsp;</p>
            <Link href={"login"}>Iniciar Sesión</Link>
          </div>
        </ul>
      )}
    </div>
  );
};

export default Navbar;
