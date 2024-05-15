'use client';

import Markdown from '@/components/Markdown';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import useGetBlog from '@/hooks/api/blog/useGetBlog';
import { format } from 'date-fns';
import { Edit, Trash } from 'lucide-react';
import Image from 'next/image';
import SkeletonBlogDetail from './components/SkeletonBlogDetail';
import { notFound, useRouter } from 'next/navigation';
import { appConfig } from '@/utils/config';
import { useAppSelector } from '@/redux/hooks';
import useDeleteBlog from '@/hooks/api/blog/UseDeleteBlog';
import ModalConfirmationDeleteBlog from './components/ModalConfirmationDeleteBlog';
import { useState } from 'react';

const BlogDetail = ({ params }: { params: { id: string } }) => {
  const router = useRouter();
  const { id } = useAppSelector((state) => state.user);
  const { blog, isLoading } = useGetBlog(Number(params.id));
  const { deleteBlog } = useDeleteBlog();
  const [open, setOpen] = useState(false);
  const onDeleteBlog = () => {
    deleteBlog(Number(params.id));
    setOpen(false);
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4">
        <SkeletonBlogDetail />
      </div>
    );
  }

  if (!blog) {
    return notFound();
  }

  return (
    <main className="container mx-auto px-4">
      <section className="mb-4">
        <div className="mb-4 space-y-1.5">
          <Badge variant="outline" className="rounded-sm bg-green-100">
            {blog.category}
          </Badge>
          <h1 className="text-4xl font-semibold">{blog.title}</h1>
          <div className="flex mb-2 items-center justify-between">
            <p className="text-sm font-light italic">
              {format(new Date(blog.createdAt), 'dd MMMM yyyy')} -{' '}
              {blog.user.name}
            </p>
            {id === blog.userId && (
              <div className="flex gap-4 items-center">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setOpen(true)}
                >
                  <Trash size="20px" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => router.push(`/${params.id}/edit`)}
                >
                  <Edit size="20px" />
                </Button>
              </div>
            )}
          </div>
        </div>

        <div className="relative h-[400px]">
          <Image
            fill
            src={`${appConfig.baseUrl}/assets${blog.thumbnail}`}
            alt="thumbnail image"
            className="object-cover bg-slate-200"
          />
        </div>
      </section>

      <section>
        <Markdown content={blog.content} />
      </section>

      <ModalConfirmationDeleteBlog
        open={open}
        setOpen={setOpen}
        onDeleteBlog={onDeleteBlog}
      />
    </main>
  );
};

export default BlogDetail;
