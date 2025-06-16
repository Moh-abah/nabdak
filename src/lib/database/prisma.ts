// src/lib/database/prisma.ts
import { PrismaClient } from '@prisma/client/edge'; // استخدم هذا بدلاً من '@prisma/client'

declare global {
    var prisma: PrismaClient | undefined;
}

const prisma = global.prisma || new PrismaClient();

if (process.env.NODE_ENV === 'development') global.prisma = prisma;

export default prisma;