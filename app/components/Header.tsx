import Link from "next/link"

const Header = () => {
  return (
    <div className="flex items-center justify-center">
        <ul className="flex items-center gap-8 p-4 border-b-[1px] border-solid border-[#333]">
            <li><Link href="/">Dashboard</Link></li>
            <li><Link href="/about">About</Link></li>
            <li><Link href="/blogs">Blogs</Link></li>
            <li><Link href="/users">Users</Link></li>
            <li><Link href="/docs">Docs</Link></li>
        </ul>
       
    </div>
  )
}

export default Header
