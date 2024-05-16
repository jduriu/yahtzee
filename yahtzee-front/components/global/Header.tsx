import React from "react";
import Link from "next/link";

const Header = () => {
  const links = [
    {
      name: "Home",
      path: "/",
    },
    {
      name: "Login",
      path: "/login",
    },
    {
      name: "Logout",
      path: "/logout",
    },
  ];

  return (
    <div className="w-full flex h-full justify-start items-center gap-3 px-5 text-xl">
      {links.map((link) => (
        <Link href={link.path} key={link.path}>
          {link.name}
        </Link>
      ))}
    </div>
  );
};

export default Header
