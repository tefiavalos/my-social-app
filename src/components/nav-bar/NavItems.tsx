import Link from "next/link";

const navItems = [{ href: "/feed", text: "Feed" }];

export default function NavItems() {
  return (
    <>
      {navItems.map((item) => (
        <Link href={item.href} key={item.href} className="hover:text-gray-300">
          {item.text}
        </Link>
      ))}
    </>
  );
}
