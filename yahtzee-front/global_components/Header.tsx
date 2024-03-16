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
    <div className="w-full flex h-full justify-end items-center gap-3 px-5 text-xl font-serif">
      {links.map(link => (
        <Link href={link.path} key={link.path}>{link.name}</Link>
      ))}
    </div>
  )
}
