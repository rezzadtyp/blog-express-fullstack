import App from '@/app';
import request from 'supertest';
import { prismaMock } from '@/test/prisma';

const requestBody = {
  name: 'name',
  email: 'user@mail.com',
  password: 'SecurePassword!',
};

describe('POST /auth/register', () => {
  const { app } = new App();

  it('should register user successfully', async () => {
    prismaMock.user.findFirst.mockResolvedValueOnce(null);
    prismaMock.user.create.mockResolvedValueOnce({
      id: 1,
      name: 'mock name',
      email: 'mock email',
      password: 'mock password',
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const response = await request(app)
      .post('/api/auth/register')
      .send(requestBody);

    expect(response.status).toBe(200);
  });
  it('should return error if email already exist', async () => {
    prismaMock.user.findFirst.mockResolvedValueOnce({
      id: 1,
      name: 'mock name',
      email: 'mock email',
      password: 'mock password',
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const response = await request(app)
      .post('/api/auth/register')
      .send(requestBody);

    expect(response.status).toBe(500);
    expect(response.text).toBe('email already exist');
  });
});
