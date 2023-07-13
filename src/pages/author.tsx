import { Box, Button, Flex } from '@chakra-ui/react';
import {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
  NextPage,
  PreviewData,
} from 'next';
import Head from 'next/head';
import { ParsedUrlQuery } from 'querystring';
import { mainBoxStyle } from '../styles/common';
import { prisma } from '../server/lib/prisma';
import { getServerAuthSession } from '../server/common/get-server-auth-session';
import { trpc } from '../utils/trpc';
import { useState } from 'react';
import { useRouter } from 'next/router';

const Author: NextPage<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ blogs }) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const createBlog = trpc.blog.createBlogPost.useMutation({
    onSuccess(res) {
      setIsLoading(false);
      router.push(`/write/${res.id}`);
    },
    onError() {
      setIsLoading(false);
    },
  });

  const newBlog = () => {
    setIsLoading(true);
    createBlog.mutate();
  };

  return (
    <>
      <Head>
        <title>CIS - Author</title>
      </Head>

      <Box {...mainBoxStyle} my='100px'>
        <Flex>
          <Box></Box>
          <Box>
            <Button onClick={newBlog} isLoading={isLoading}>
              write
            </Button>
          </Box>
        </Flex>
      </Box>
    </>
  );
};

export const getServerSideProps = async (
  ctx: GetServerSidePropsContext<ParsedUrlQuery, PreviewData>
) => {
  const session = await getServerAuthSession(ctx);
  const blogRes = await prisma.blog.findMany({
    where: { authorId: session?.user.id },
    include: { author: true },
  });

  const blogs: Readonly<typeof blogRes> = JSON.parse(JSON.stringify(blogRes));

  return {
    props: {
      blogs,
    },
  };
};

export default Author;
