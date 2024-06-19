"use client";
import Link from "next/link";
import { ReactNode } from "react";

const AuthLayout = ({ children }: { children: ReactNode }) => {
    return (
        <div>
            <div className="flex items-center justify-center">
                <ul className="menu menu-vertical lg:menu-horizontal bg-base-200 rounded-box">
                    <li>
                        <Link href="/">Dashboard</Link>
                    </li>
                    <li>
                        <Link href="/auth/register">Register</Link>
                    </li>
                    <li>
                        <Link href="/auth/login">Login</Link>
                    </li>
                </ul>
            </div>
            {children}
        </div>
    );
};

export default AuthLayout;
