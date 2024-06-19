"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const link = [
    { name: "Dashboard", href: "/" },
    { name: "About", href: "/about" },
    { name: "Blogs", href: "/blogs" },
    { name: "Docs", href: "/docs" },
    { name: "Statistics", href: "/statistics" },
    { name: "Logout", href: "/auth/login" },
];

const Header = () => {
    const pathname = usePathname();
    console.log(pathname);
    return (
        <div className="flex items-center justify-center">
            <ul className="menu menu-vertical lg:menu-horizontal bg-base-200 rounded-box">
                {link.map((item, index) => {
                    const isActive =
                        (pathname.startsWith(item.href) && item.href !== "/") ||
                        pathname === item.href;
                    return (
                        <li
                            key={index}
                            className={`${isActive && "text-primary"}`}
                        >
                            <Link href={item.href}>{item.name}</Link>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default Header;
