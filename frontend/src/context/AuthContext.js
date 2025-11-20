import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Load user from localStorage
    const id = localStorage.getItem("userId");
    const role = localStorage.getItem("role");
    const token = localStorage.getItem("token");

    if (id && role && token) {
      setUser({ id, role, token });
    }
  }, []);

  const login = (data) => {
    setUser(data);
    localStorage.setItem("userId", data.id);
    localStorage.setItem("role", data.role);
    localStorage.setItem("token", data.token);
  };

  const logout = () => {
    setUser(null);
    localStorage.clear();
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
