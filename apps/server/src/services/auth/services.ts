import { prisma } from "../../lib/prisma";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { Credentials, GooglePayload, UserPublic, userSelect } from "../../lib/user.dto";


export async function getUserbyEmail(
  email: string,
): Promise<UserPublic | null> {
  return prisma.user.findUnique({
    where: { email },
    select: userSelect,
  });
}

export async function getUserbyUsername(
  username: string,
): Promise<UserPublic | null> {
  return prisma.user.findUnique({
    where: { username },
    select: userSelect,
  });
}

export async function createUserOauth(
  payload: GooglePayload,
  username: string,
): Promise<UserPublic> {
  const data = {
    googleId: payload.sub,
    email: payload.email || "",
    username,
    name: payload.name,
    avatarUrl: payload.picture,
  };

  return prisma.user.create({
    data,
    select: userSelect,
  });
}

export async function createUserByCredentials(
  payload: Credentials,
): Promise<UserPublic> {
  const hashedPassword = await gethashedPassword(payload.password);

  return prisma.user.create({
    data: {
      ...payload,
      password: hashedPassword,
    },
    select: userSelect,
  });
}

export function generateToken(user: { id: string }) {
  return jwt.sign({ id: user.id }, process.env.JWT_SECRET as string, {
    expiresIn: "7d",
  });
}

export async function gethashedPassword(password: string) {
  return bcrypt.hash(password, 10);
}
