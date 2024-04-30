import prisma from '@/prisma';
import { User } from '@prisma/client';
import { hashPassword } from '@/lib/bcrypt';

export const registerService = async (
  body: Pick<User, 'email' | 'name' | 'password'>,
): Promise<User> => {
  try {
    const { email, password } = body;

    const existingUser = await prisma.user.findFirst({
      where: { email },
    });

    if (existingUser) {
      throw new Error('email already exist');
    }

    const hashedPassword = await hashPassword(password);

    return await prisma.user.create({
      data: { ...body, password: hashedPassword },
    });
  } catch (error) {
    throw error;
  }
};
