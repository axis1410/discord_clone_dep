import { FC, ReactNode } from "react";

const AuthLayout: FC<{ children: ReactNode }> = ({ children }) => {
	return (
		<div className="flex items-center justify-center h-full">{children}</div>
	);
};

export default AuthLayout;
