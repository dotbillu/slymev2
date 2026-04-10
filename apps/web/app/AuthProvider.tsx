"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { getMe } from "@/services/auth/service";

const AuthContext = createContext<any>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any>(null);
  const [checked, setChecked] = useState(false);

  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const check = async () => {
      try {
        const data = await getMe();
        setUser(data);
      } catch {
        setUser(null);
      } finally {
        setChecked(true);
      }
    };

    check();
  }, []);

  useEffect(() => {
    if (!checked) return;

    const isAuthPage = pathname === "/signup" || pathname === "/signin";

    // not logged in → force signup
    if (!user && !isAuthPage) {
      router.replace("/signup");
    }

    // logged in → block auth pages
    if (user && isAuthPage) {
      router.replace("/");
    }
  }, [checked, user, pathname]);

  if (!checked) return null;

  return (
    <AuthContext.Provider value={{ user }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
