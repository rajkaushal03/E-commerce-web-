import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext();

// Custom hook for easier context access
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
        setAuthUser(data.user); // null or authenticated user object
      } catch (error) {
        console.log("Error checking user authentication:", error.message);
      }
    };
    checkUserLoggedIn();
  }, []);

  // Determine admin access
  const AdminAccess =
    authUser?.username === "rajkaushal03" || authUser?.email === "rajkaushal18092003@gmail.com";

  return (
    <AuthContext.Provider value={{ authUser, setAuthUser, AdminAccess }}>
      {children}
    </AuthContext.Provider>
  );
};
