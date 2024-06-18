'use client';
import Link from "next/link";
import ProductCard from "./components/ProductCard";

export default function Home() {
  return (
    <main className="">
      <h1>Hello World</h1>
      <Link href="/users">Go to users</Link>
      <ProductCard />
    </main>
  );
}
