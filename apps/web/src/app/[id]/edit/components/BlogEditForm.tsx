'use client';

import Dropzone from '@/components/Dropzone';
import FormInput from '@/components/FormInput';
import FormTextArea from '@/components/FormTextArea';
import PreviewImages from '@/components/PreviewImages';
import RichTextEditor from '@/components/RichTextEditor';
import { Button } from '@/components/ui/button';
import { IFormBlog } from '@/types/blog.type';
import { useFormikContext } from 'formik';
import { Loader2 } from 'lucide-react';
import { FC } from 'react';

interface BlogEditProps {
  isLoading: boolean;
}

const BlogEditForm: FC<BlogEditProps> = ({ isLoading }) => {
  const {
    handleSubmit,
    values,
    errors,
    handleBlur,
    handleChange,
    touched,
    setFieldValue,
  } = useFormikContext<IFormBlog>();

  return (
    <form onSubmit={handleSubmit}>
      <div className="mx-auto flex max-w-5xl flex-col gap-4">
        <FormInput
          name="title"
          type="text"
          label="Title"
          placeholder="Title"
          value={values.title}
          error={errors.title}
          isError={!!touched.title && !!errors.title}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <FormInput
          name="category"
          type="text"
          label="Category"
          placeholder="Category"
          value={values.category}
          error={errors.category}
          isError={!!touched.category && !!errors.category}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <FormTextArea
          name="description"
          label="Description"
          placeholder="Description"
          value={values.category}
          error={errors.category}
          isError={!!touched.category && !!errors.category}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <PreviewImages
          fileImages={values.thumbnail}
          onRemoveImage={(idx: number) =>
            setFieldValue('thumbnail', values.thumbnail?.toSpliced(idx, 1))
          }
        />
        <Dropzone
          isError={Boolean(errors.thumbnail)}
          label="Thumbnail"
          onDrop={(files) =>
            setFieldValue('thumbnail', [
              ...values.thumbnail,
              ...files.map((file) => file),
            ])
          }
        />
        <RichTextEditor
          onChange={(html: string) => setFieldValue('content', html)}
          label="Content"
          value={values.content}
          isError={Boolean(errors.content)}
        />
        <div className="mb-4 flex justify-end">
          <Button className="mt-6 w-full" type="submit" disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-2 w-4 animate-spin" />}
            Submit
          </Button>
        </div>
      </div>
    </form>
  );
};

export default BlogEditForm;
