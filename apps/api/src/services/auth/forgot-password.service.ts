import prisma from '@/prisma';
import { sign } from 'jsonwebtoken';
import { JWT_SECRET_KEY, NEXT_BASE_URL } from '@/config';
import { transporter } from '@/lib/nodemailer';

export const forgotPasswordService = async (email: string) => {
  try {
    const user = await prisma.user.findFirst({
      where: { email },
    });

    if (!user) {
      throw new Error('invalid email address');
    }

    const token = sign({ id: user.id }, JWT_SECRET_KEY, {
      expiresIn: '30m',
    });

    const link = NEXT_BASE_URL + `/reset-password?token=${token}`;

    await transporter.sendMail({
      from: 'Admin',
      to: email,
      subject: 'Link Reset Password',
      html: `<a href="${link}" target="_blank">Reset Password Here</a>`,
    });

    return {
      message: 'email reset password has been sent',
    };
  } catch (error) {
    throw error;
  }
};
