import { API_BASE } from "@/lib/config";
import { User } from "@/types/user";

export async function CredentialSignIn(
  cred: string,
  password: string,
): Promise<User | null> {
  const res = await fetch(`${API_BASE}/auth/signin/credentials`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      cred,
      password,
    }),
  });

  const data = await res.json();

  if (!res.ok) return null;

  return data.user;
}
export async function oauthSignIn(token: string): Promise<User | null> {
  const res = await fetch(`${API_BASE}/auth/signin/oauth`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ token }),
  });

  const data = await res.json();
  console.log(data);

  return data;
}
export async function oauthSignUp(token: string): Promise<User | null> {
  const res = await fetch(`${API_BASE}/auth/signup/oauth`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ token }),
  });

  const data = await res.json();
  console.log(data);

  return data;
}

export async function CredentialSignUp({
  name,
  username,
  email,
  password,
}: {
  name: string;
  username: string;
  email: string;
  password: string;
}): Promise<User | null> {
  const res = await fetch(`${API_BASE}/auth/signup/credentials`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      username,
      email,
      password,
    }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error || "Signup failed");
  }

  return data;
}

export async function getMe() {
  const res = await fetch(`${API_BASE}/auth/me`, {
    method: "GET",
    credentials: "include",
  });

  if (!res.ok) return null;

  return await res.json();
}
