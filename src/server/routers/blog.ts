import { z } from 'zod';

import {
  router,
  publicProcedure,
  adminProcedure,
  editorProcedure,
} from '../trpc';
import slugify from 'slugify';
import uniqid from 'uniqid';

export const blogRouter = router({
  getAllblogs: publicProcedure.query(async ({ ctx }) => {
    const blog = await ctx.prisma.blog.findMany();

    return blog;
  }),
  getAllTags: editorProcedure.query(async ({ ctx }) => {
    const tag = await ctx.prisma.tag.findMany();

    return tag;
  }),
  createTag: editorProcedure
    .input(
      z.object({
        title: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const tag = await ctx.prisma.tag.create({
        data: {
          title: input.title,
        },
      });

      return tag;
    }),
  createBlogPost: editorProcedure.mutation(async ({ ctx }) => {
    const blog = await ctx.prisma.blog.create({
      data: {
        imageUrl: '',
        heading: '',
        content: '',
        slug: uniqid(),
        draft: false,
        published: false,
        authorId: ctx.session.user.id,
      },
    });

    return blog;
  }),
  updateBlogPost: editorProcedure
    .input(
      z.object({
        id: z.string(),
        heading: z.string(),
        content: z.string(),
        imageUrl: z.string(),
        draft: z.boolean(),
        tags: z.string().array().optional(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const blog = await ctx.prisma.blog.update({
        where: {
          id: input.id,
        },
        data: {
          imageUrl: input.imageUrl,
          heading: input.heading,
          content: input.content,
          draft: input.draft,
          published: false,
          slug: `${slugify(input.heading)}-${uniqid()}`,
        },
      });

      if (input.tags && input.tags.length > 0) {
        const blogTag = input.tags.map((cur) => ({
          blogId: blog.id,
          tagId: cur,
        }));

        await ctx.prisma.blogTag.createMany({
          data: blogTag,
        });
      }

      return blog;
    }),
  pubBlogPost: adminProcedure
    .input(
      z.object({
        id: z.string(),
        published: z.boolean(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const blog = await ctx.prisma.blog.update({
        where: {
          id: input.id,
        },
        data: {
          published: input.published,
        },
      });

      return blog;
    }),
});
