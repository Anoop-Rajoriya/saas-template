import { prisma } from "./prisma";

async function createUser({
  clerkId,
  name,
  email,
}: {
  clerkId: string;
  name: string;
  email: string;
}) {
  await prisma.user.upsert({
    where: { authId: clerkId },
    create: {
      authId: clerkId,
      name,
      email,
    },
    update: {
      name,
      email,
    },
  });
}

export default { createUser };
