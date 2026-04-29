import { prisma } from "../../lib/prisma";

export async function createGig(data: {
  userId: string;
  title: string;
  description?: string;
  latitude: number;
  longitude: number;
  date?: string;
  reward?: string;
  gigTime?: string;
  expiresAt?: string;
  roomId?: string;
  type?: string;
  imageUrls?: string[];
}) {
  return prisma.gig.create({
    data: {
      title: data.title,
      description: data.description ?? null,
      latitude: Number(data.latitude),
      longitude: Number(data.longitude),
      date: data.date ? new Date(data.date) : null,
      gigTime: data.gigTime ? new Date(data.gigTime) : null,
      expiresAt: data.expiresAt ? new Date(data.expiresAt) : null,
      reward: data.reward ?? null,
      type: data.type ?? null,
      imageUrls: data.imageUrls ?? [],

      createdBy: {
        connect: { id: data.userId },
      },

      ...(data.roomId
        ? {
            room: {
              connect: { id: data.roomId },
            },
          }
        : {}),
    },
  });
}

export async function getGigs(skip = 0, take = 10) {
  return prisma.gig.findMany({
    skip,
    take,
    orderBy: {
      createdAt: "desc",
    },
    include: {
      createdBy: true,
    },
  });
}

export async function updateGig(
  gigId: string,
  userId: string,
  data: Partial<{
    title: string;
    description: string;
    latitude: number;
    longitude: number;
    date: string;
    reward: string;
    gigTime: string;
    expiresAt: string;
    type: string;
    imageUrls: string[];
  }>,
) {
  const gig = await prisma.gig.findUnique({
    where: { id: gigId },
  });

  if (!gig) throw new Error("Gig not found");
  if (gig.creatorId !== userId) throw new Error("Unauthorized");

  return prisma.gig.update({
    where: { id: gigId },
    data: {
      ...data,
      latitude: data.latitude ? Number(data.latitude) : undefined,
      longitude: data.longitude ? Number(data.longitude) : undefined,
      date: data.date ? new Date(data.date) : undefined,
      gigTime: data.gigTime ? new Date(data.gigTime) : undefined,
      expiresAt: data.expiresAt ? new Date(data.expiresAt) : undefined,
    },
  });
}
export async function getGigById(gigId: string) {
  return prisma.gig.findUnique({
    where: { id: gigId },
    include: {
      createdBy: true,
      room: true,
    },
  });
}
export async function deleteGig(gigId: string, userId: string) {
  const gig = await prisma.gig.findUnique({
    where: { id: gigId },
  });

  if (!gig) throw new Error("Gig not found");
  if (gig.creatorId !== userId) throw new Error("Unauthorized");

  return prisma.gig.delete({
    where: { id: gigId },
  });
}
