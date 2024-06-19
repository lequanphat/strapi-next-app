import React, { ReactNode, useState } from "react";
import Header from "../components/Header";
import { Metadata } from "next";
export const metadata: Metadata = {
    title: {
        default: "Dashboard",
        template: "%s | Dashboard",
    },
};
const DashboardLayout = ({ children }: { children: ReactNode }) => {
    return (
        <div>
            <Header />
            {children}
        </div>
    );
};

export default DashboardLayout;
