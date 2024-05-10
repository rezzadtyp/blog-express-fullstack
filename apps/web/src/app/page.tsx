'use client';

import Autocomplete from '@/components/Autocomplete';
import BlogCard from '@/components/BlogCard';
import Pagination from '@/components/Pagination';
import useGetBlogs from '@/hooks/api/blog/useGetBlogs';
import { appConfig } from '@/utils/config';
import { useState } from 'react';
// import ReactPaginate from 'react-paginate';

export default function Home() {
  const [page, setPage] = useState<number>(1);

  const { data: blogs, meta } = useGetBlogs({
    page,
    take: 3,
  });

  // const handlePageClick = ({ selected }: { selected: number }) => {
  //   setPage(selected + 1);
  // };

  const handleChangePaginate = ({ selected }: { selected: number }) => {
    setPage(selected + 1);
  };

  return (
    <main className="container mx-auto px-4">
      {/* JUMBOTRON */}
      <section className="text-center mt-10">
        <h1 className="text-4xl font-bold">Lorem Ipsum</h1>
        <p className="text-xl">
          "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet,
          consectetur, adipisci velit..."
        </p>
      </section>
      <Autocomplete />

      {/* CARDS */}
      <section className="grid grid-cols-3">
        {blogs.map((blog, index) => {
          return (
            <BlogCard
              key={index}
              title={blog.title}
              author={blog.user.name}
              category={blog.category}
              createdAt={new Date(blog.createdAt)}
              description={blog.description}
              imageUrl={appConfig.baseUrl + `/assets${blog.thumbnail}`}
              blogId={blog.id}
            />
          );
        })}
      </section>
      {/* <ReactPaginate
        className="flex gap-4 mx-auto w-fit"
        breakLabel="..."
        nextLabel=">"
        onPageChange={handlePageClick}
        pageCount={Number(meta?.total) / Number(meta?.take)}
        previousLabel="<"
        renderOnZeroPageCount={null}
      /> */}
      <div className="w-fit mx-auto">
        <Pagination
          total={meta?.total || 0}
          take={meta?.take || 0}
          onChangePage={handleChangePaginate}
        />
      </div>
    </main>
  );
}
