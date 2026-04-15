import { prisma } from "../../lib/prisma";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { User } from "@prisma/client";
interface GooglePayload {
  sub: string;
  email?: string;
  name?: string;
  picture?: string;
}
interface Credentials {
  name: string;
  username: string;
  password: string;
  email: string;
}
interface UserPublic {
  id: string;
  username: string | null;
  name: string | null;
  bio: string | null;
  avatarUrl: string | null;
  coverImageUrl: string | null;
  createdAt: Date;

  rooms: {
    id: string;
    name: string;
    description: string | null;
    imageUrl: string | null;
    type: string | null;
    createdAt: Date;
  }[];

  gigs: {
    id: string;
    title: string;
    description: string | null;
    imageUrls: string[];
    type: string | null;
    reward: string | null;
    date: Date | null;
    createdAt: Date;
    roomId: string | null;
  }[];
}
export async function getUserbyEmail(email: string): Promise<UserPublic | null> {
  const user = await prisma.user.findUnique({
    where: { email },
    select: {
      id: true,
      username: true,
      name: true,
      bio: true,
      avatarUrl: true,
      coverImageUrl: true,
      createdAt: true,

      rooms: {
        select: {
          id: true,
          name: true,
          description: true,
          imageUrl: true,
          type: true,
          createdAt: true,
        },
      },

      gigs: {
        select: {
          id: true,
          title: true,
          description: true,
          imageUrls: true,
          type: true,
          reward: true,
          date: true,
          createdAt: true,
          roomId: true,
        },
      },
    },
  });
  return user;
}

export async function getUserbyUsername(
  username: string,
): Promise<UserPublic | null> {
  const user = await prisma.user.findUnique({
    where: { username },
    select: {
      id: true,
      username: true,
      name: true,
      bio: true,
      avatarUrl: true,
      coverImageUrl: true,
      createdAt: true,

      rooms: {
        select: {
          id: true,
          name: true,
          description: true,
          imageUrl: true,
          type: true,
          createdAt: true,
        },
      },

      gigs: {
        select: {
          id: true,
          title: true,
          description: true,
          imageUrls: true,
          type: true,
          reward: true,
          date: true,
          createdAt: true,
          roomId: true,
        },
      },
    },
  });

  return user;
}

export async function createUserOauth(
  payload: GooglePayload,
  username: string,
): Promise<User> {
  const data = {
    googleId: payload.sub,
    email: payload.email || "",
    username: username,
    name: payload.name,
    avatarUrl: payload.picture,
  };
  const user = await prisma.user.create({ data });
  return user;
}

export async function createUserByCredentials(
  payload: Credentials,
): Promise<User> {
  const hashedPassword = await gethashedPassword(payload.password);
  const user = await prisma.user.create({
    data: {
      ...payload,
      password: hashedPassword,
    },
  });

  return user;
}

export function generateToken(user: User) {
  const token = jwt.sign(
    { id: user.id, username: user.username, email: user.email },
    process.env.JWT_SECRET as string,
    { expiresIn: "7d" },
  );
  return token;
}

export async function gethashedPassword(password: string) {
  const hashedPassword = await bcrypt.hash(password, 10);
  return hashedPassword;
}
