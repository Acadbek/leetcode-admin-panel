import React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { parsePhoneNumber } from 'awesome-phonenumber';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';
import { useCompany } from '@/hooks/queries/useCompany';
import { max } from 'date-fns';

const CreateCompanyPage = () => {
  const {
    mutate: createCompany,
    isPending,
    error,
    data,
    isLoading,
    isError,
    isSuccess,
    status,
  } = useCompany();

  // Define the schema for form validation
  const companyFormSchema = z.object({
    name: z.string().min(2, {
      message: 'Company name must be at least 2 characters.',
    }),
    email: z.string().email({
      message: 'Please enter a valid email address.',
    }),
    phone: z.string().refine(
      (val) => {
        const pn = parsePhoneNumber(val, { regionCode: 'UZ' });
        return pn.valid && (pn.regionCode === 'UZ' || pn.regionCode === 'UZ');
      },
      { message: 'Telefon raqami noto‘g‘ri.' }
    ),
    description: z.string().max(300, {
      message: 'Description must be at least 300 characters.',
    }),
    address: z.string().min(5, {
      message: 'Address must be at least 5 characters.',
    }),
    admin: z.object({
      username: z.string().min(2, {
        message: 'Username must be at least 2 characters.',
      }),
      firstName: z.string().min(2, {
        message: 'First name must be at least 2 characters.',
      }),
      lastName: z.string().min(2, {
        message: 'Last name must be at least 2 characters.',
      }),
    }),
  });

  const defaultValues = {
    name: '',
    email: '',
    phone: '',
    description: '',
    address: '',
    admin: {
      username: '',
      firstName: '',
      lastName: '',
    },
  };

  const form = useForm({
    resolver: zodResolver(companyFormSchema),
    defaultValues,
  });

  function onSubmit(data) {
    createCompany(data);
    console.log(isSuccess, isError);

    if (isSuccess) {
      toast({
        title: status,
        description: 'Company data has been successfully saved.',
      });
    }
    if (isError) {
      alert(error.message);
      // toast({
      //   title: 'Error',
      //   description: error,
      // });
    }
  }

  return (
    <div className='px-4'>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
          <Card> 
            <CardHeader>
              <CardTitle>Company Information</CardTitle>
              <CardDescription>
                Enter the details for the company.
              </CardDescription>
            </CardHeader>
            <CardContent className='space-y-6'>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                <FormField
                  control={form.control}
                  name='name'
                  render={({ field }) => (
                    <FormItem className='space-y-1'>
                      <FormLabel>Company Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder='Company Name'
                          {...field}
                          className={`${
                            form.formState.errors.name
                              ? 'border-red-500 focus-visible:ring-red-500'
                              : ''
                          }`}
                        />
                      </FormControl>
                      <FormMessage className='text-red-500' />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='email'
                  render={({ field }) => (
                    <FormItem className='space-y-1'>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          placeholder='company@example.com'
                          {...field}
                          className={`${
                            form.formState.errors.email
                              ? 'border-red-500 focus-visible:ring-red-500'
                              : ''
                          }`}
                        />
                      </FormControl>
                      <FormMessage className='text-red-500' />
                    </FormItem>
                  )}
                />
              </div>

              <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                <FormField
                  control={form.control}
                  name='phone'
                  render={({ field }) => (
                    <FormItem className='space-y-1'>
                      <FormLabel>Phone</FormLabel>
                      <FormControl>
                        <Input
                          placeholder='Phone Number'
                          {...field}
                          className={`${
                            form.formState.errors.phone
                              ? 'border-red-500 focus-visible:ring-red-500'
                              : ''
                          }`}
                        />
                      </FormControl>
                      <FormMessage className='text-red-500' />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='address'
                  render={({ field }) => (
                    <FormItem className='space-y-1'>
                      <FormLabel>Address</FormLabel>
                      <FormControl>
                        <Input
                          placeholder='Company Address'
                          {...field}
                          className={`${
                            form.formState.errors.address
                              ? 'border-red-500 focus-visible:ring-red-500'
                              : ''
                          }`}
                        />
                      </FormControl>
                      <FormMessage className='text-red-500' />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name='description'
                render={({ field }) => (
                  <FormItem className='space-y-1'>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        maxLength={300}
                        placeholder='Enter company description'
                        className={`min-h-[100px] ${
                          form.formState.errors.description
                            ? 'border-red-500 focus-visible:ring-red-500'
                            : ''
                        }`}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className='text-red-500' />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Admin Information</CardTitle>
              <CardDescription>
                Enter the details for the company administrator.
              </CardDescription>
            </CardHeader>
            <CardContent className='space-y-6'>
              <FormField
                control={form.control}
                name='admin.username'
                render={({ field }) => (
                  <FormItem className='space-y-1'>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='Admin Username'
                        {...field}
                        className={`${
                          form.formState.errors.admin?.username
                            ? 'border-red-500 focus-visible:ring-red-500'
                            : ''
                        }`}
                      />
                    </FormControl>
                    <FormMessage className='text-red-500' />
                  </FormItem>
                )}
              />

              <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                <FormField
                  control={form.control}
                  name='admin.firstName'
                  render={({ field }) => (
                    <FormItem className='space-y-1'>
                      <FormLabel>First Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder='First Name'
                          {...field}
                          className={`${
                            form.formState.errors.admin?.firstName
                              ? 'border-red-500 focus-visible:ring-red-500'
                              : ''
                          }`}
                        />
                      </FormControl>
                      <FormMessage className='text-red-500' />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='admin.lastName'
                  render={({ field }) => (
                    <FormItem className='space-y-1'>
                      <FormLabel>Last Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder='Last Name'
                          {...field}
                          className={`${
                            form.formState.errors.admin?.lastName
                              ? 'border-red-500 focus-visible:ring-red-500'
                              : ''
                          }`}
                        />
                      </FormControl>
                      <FormMessage className='text-red-500' />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
          </Card>

          <Button type='submit' className='w-full md:w-auto'>
            {isPending ? 'Loading...' : 'Create Company'}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default CreateCompanyPage;
