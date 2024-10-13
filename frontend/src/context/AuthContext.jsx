import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useAuthContext = () => {
	return useContext(AuthContext);
};

export const AuthContextProvider = ({ children }) => {
	const [authUser, setAuthUser] = useState(null);

	useEffect(() => {
		const checkUserLoggedIn = async () => {
			try {
				const res = await fetch("/api/auth/check", { credentials: "include" });
				const data = await res.json();
				// console.log(data.user)
				setAuthUser(data.user); // null or authenticated user object
			} catch (error) {
				console.log(error.message);
			} 
		};
		checkUserLoggedIn();
	}, []);

	return <AuthContext.Provider value={{ authUser, setAuthUser }}>{children}</AuthContext.Provider>;
};	