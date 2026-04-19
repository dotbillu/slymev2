export interface GooglePayload {
  sub: string;
  email?: string;
  name?: string;
  picture?: string;
}

export interface Credentials {
  name: string;
  username: string;
  password: string;
  email: string;
}

export interface UserPublic {
  id: string;
  username: string | null;
  email: string | null;
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

export const userSelect = {
  id: true,
  username: true,
  email: true,
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
};
