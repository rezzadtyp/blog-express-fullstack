'use client';

import FormInput from '@/components/FormInput';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useFormik } from 'formik';
import { validationSchema } from './validationSchema';
import useForgotPassword from '@/hooks/api/auth/useForgotPassword';
import { useState } from 'react';
import { Loader2 } from 'lucide-react';

const ForgotPassword = () => {
  const { forgotPassword } = useForgotPassword();
  const [isLoading, setIsLoading] = useState(false);

  const { values, touched, errors, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: {
        email: '',
      },
      validationSchema,
      onSubmit: ({ email }) => {
        forgotPassword(email);
      },
    });

  return (
    <main className="container mx-auto px-4">
      <div className="mt-20 flex justify-center">
        <Card className="w-[450px]">
          <CardHeader>
            <CardTitle className="text-center text-3xl text-primary">
              Forgot Password
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <div className="grid w-full items-center gap-4">
                {/* EMAIL */}
                <FormInput
                  name="email"
                  error={errors.email}
                  isError={!!touched.email && !!errors.email}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  placeholder="Email"
                  type="email"
                  value={values.email}
                />
              </div>
              <Button
                className="mt-6 w-full"
                type="submit"
                disabled={isLoading}
              >
                {isLoading && <Loader2 className="mr-2 h-2 w-4 animate-spin" />}
                Submit
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </main>
  );
};

export default ForgotPassword;
