import { ExcoType } from '@prisma/client';
import { z } from 'zod';
import { hashPassword } from '../../utils/authHandler';
import { router, publicProcedure, adminProcedure } from '../trpc';

export const excoRouter = router({
  getAllExco: publicProcedure.query(async ({ ctx }) => {
    const exco = await ctx.prisma.executive.findMany({
      include: { user: true },
    });

    return exco;
  }),
  createExco: adminProcedure
    .input(
      z.object({
        name: z.string(),
        email: z.string(),
        position: z.string(),
        description: z.string(),
        type: z.nativeEnum(ExcoType),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const password = await hashPassword('admin1234$');

      const exco = await ctx.prisma.user.create({
        data: {
          name: input.name,
          email: input.email,
          password,
          executive: {
            create: {
              position: input.position,
              type: input.type,
              description: input.description,
            },
          },
        },
      });

      return exco;
    }),
  updateDepartment: adminProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string(),
        email: z.string(),
        position: z.string(),
        description: z.string(),
        type: z.nativeEnum(ExcoType),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const department = await ctx.prisma.executive.update({
        where: {
          id: input.id,
        },
        data: {
          position: input.position,
          description: input.description,
          type: input.type,
          user: {
            update: {
              name: input.name,
              email: input.email,
            },
          },
        },
      });

      return department;
    }),
  deleteExco: adminProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      await ctx.prisma.user.update({
        where: {
          id: input.id,
        },
        data: {
          isActive: false,
        },
      });

      return `done`;
    }),
});
