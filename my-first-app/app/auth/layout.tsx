import { ReactNode } from "react";

const AuthLayout = ({ children }: { children: ReactNode }) => {
    return (
        <div>
            <h1>This is a auth layout</h1>
            {children}
        </div>
    );
};

export default AuthLayout;
