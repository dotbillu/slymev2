"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { getMe } from "@/services/auth/service";
import { useRouter, usePathname } from "next/navigation";

const AuthContext = createContext<any>(undefined);

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

        const isProtected =
          pathname === "/" || pathname === "/get-started";

        if (isProtected) {
          router.replace("/signin");
        }
      } finally {
        setChecked(true);
      }
    };

    check();
  }, [pathname]);

  return (
    <AuthContext.Provider value={{ user, setUser, checked }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
};
