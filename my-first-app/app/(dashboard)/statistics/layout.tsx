import { ReactNode } from "react";

const Layout = ({
    children,
    chart1,
    chart2,
    chart3,
}: {
    children: ReactNode;
    chart1: ReactNode;
    chart2: ReactNode;
    chart3: ReactNode;
}) => {
    return (
        <div>
            <h1>This is the statistic layout</h1>
            <div>{children}</div>
            <div>{chart1}</div>
            <div>{chart2}</div>
            <div>{chart3}</div>
        </div>
    );
};

export default Layout;
