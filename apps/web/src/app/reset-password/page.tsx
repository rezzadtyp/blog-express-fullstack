'use client';

import FormInput from '@/components/FormInput';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useFormik } from 'formik';
import { validationSchema } from './validationSchema';
import { Loader2 } from 'lucide-react';
import { notFound, useSearchParams } from 'next/navigation';
import useResetPassword from '@/hooks/api/auth/useResetPassword';

const ResetPassword = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  if (!token) {
    notFound();
  }

  const { resetPassword, isLoading } = useResetPassword();

  const { values, touched, errors, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: {
        password: '',
        confirmPassword: '',
      },
      validationSchema,
      onSubmit: ({ password }) => {
        resetPassword(password, token);
      },
    });

  return (
    <main className="container mx-auto px-4">
      <div className="mt-20 flex justify-center">
        <Card className="w-[450px]">
          <CardHeader>
            <CardTitle className="text-center text-3xl text-primary">
              Reset Password
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <div className="grid w-full items-center gap-4">
                {/* EMAIL */}
                <FormInput
                  name="password"
                  type="password"
                  placeholder="Password"
                  value={values.password}
                  error={errors.password}
                  isError={!!touched.password && !!errors.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <FormInput
                  name="confirmPassword"
                  type="password"
                  placeholder="Confirm Password"
                  value={values.confirmPassword}
                  error={errors.confirmPassword}
                  isError={
                    !!touched.confirmPassword && !!errors.confirmPassword
                  }
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </div>
              <Button className="mt-6 w-full" disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-2 w-4 animate-spin" />}
                {isLoading ? 'Loading' : 'Submit'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </main>
  );
};

export default ResetPassword;
