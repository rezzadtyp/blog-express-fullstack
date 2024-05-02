import prisma from '@/prisma';
import { User } from '@prisma/client';
import { sign } from 'jsonwebtoken';
import { comparePassword } from '@/lib/bcrypt';
import { JWT_SECRET_KEY } from '@/config';

export const loginService = async (body: Pick<User, 'email' | 'password'>) => {
  try {
    const { email, password } = body;

    const user = await prisma.user.findFirst({
      where: { email },
    });

    if (!user) {
      throw new Error('invalid email address');
    }

    const isPasswordValid = await comparePassword(password, user.password);

    if (!isPasswordValid) {
      throw new Error('incorrect password');
    }

    const token = sign({ id: user.id }, JWT_SECRET_KEY, {
      expiresIn: '2h',
    });

    return {
      message: 'login success',
      data: user,
      token,
    };
  } catch (error) {
    throw error;
  }
};
