import prisma from '@/prisma';

export const deleteBlogService = async (id: number) => {
  try {
    const blog = await prisma.blog.findFirst({
      where: { id },
    });
  } catch (error) {
    throw new Error('invalid blog id');
  }

  await prisma.blog.update({
    where: { id },
    data: { deletedAt: new Date() },
  });
};
