import { User } from './user.type';

export interface Blog {
  id: number;
  title: string;
  category: string;
  content: string;
  description: string;
  thumbnail: string;
  userId: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;

  user: User;
}

export interface IFormCreateBlog {
  title: string;
  category: string;
  content: string;
  description: string;
  thumbnail: File[];
  userId?: number;
}
