import { BlogController } from '@/controllers/blog.controller';
import { SampleController } from '@/controllers/sample.controller';
import { uploader } from '@/lib/uploader';
import { Router } from 'express';

export class BlogRouter {
  private router: Router;
  private blogController: BlogController;

  constructor() {
    this.blogController = new BlogController();
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.post(
      '/',
      uploader('IMG', '/images').array('thumbnail', 1),
      this.blogController.createBlog,
    );
  }

  getRouter(): Router {
    return this.router;
  }
}
