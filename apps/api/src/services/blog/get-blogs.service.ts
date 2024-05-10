import prisma from '@/prisma';
import { PaginationQueryParams } from '@/types/pagination.type';
import { Prisma } from '@prisma/client';

interface GetBlogsQuery extends PaginationQueryParams {
  search: string;
}

export const getBlogsService = async (query: GetBlogsQuery) => {
  try {
    const { page, sortBy, sortOrder, take, search } = query;

    const whereClause: Prisma.BlogWhereInput = {
      title: { contains: search },
    };

    const blogs = await prisma.blog.findMany({
      where: whereClause,
      skip: (page - 1) * take,
      take: take,
      orderBy: {
        [sortBy]: sortOrder,
      },
      include: { user: true },
    });

    const count = await prisma.blog.count({ where: whereClause });

    return {
      data: blogs,
      meta: { page, take, total: count },
    };

    return blogs;
  } catch (error) {
    throw error;
  }
};
