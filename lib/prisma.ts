import { PrismaClient } from "@/lib/generated/prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  (process.env.ACCELERATE_URL
    ? new PrismaClient({
        log: ["query", "info", "warn", "error"],
        accelerateUrl: process.env.ACCELERATE_URL,
      })
    : // eslint-disable-next-line @typescript-eslint/no-explicit-any
      new (PrismaClient as any)({
        log: ["query", "info", "warn", "error"],
      }));

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
