import Link from "next/link"

export default function Header() {

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
  ]

  return (
    <div className="w-full flex h-[50px] justify-end items-center gap-3 px-10 border border-white">
      {links.map(link => (
        <Link href={link.path} key={link.path}>{link.name}</Link>
      ))}
    </div>
  )
}
