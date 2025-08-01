'use client';

import { BLINKDRAFT_PAGE_QUERYResult } from '@/sanity.types';

import IconButton from './ui/buttons/icon-button';
import { Form, FormMessage, FormItem, FormControl, FormField } from './ui/form';
import { Input } from './ui/input';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMemo, useState } from 'react';
import z from 'zod';
import { useAction } from 'next-safe-action/hooks';
import { sendContactForm } from '@/src/app/actions/contact';
import notFound from '../app/(frontend)/not-found';
import { DialogClose } from './ui/dialog';

const baseSchema = z.object({
  firstName: z.string(),
  familyName: z.string(),
  email: z.string(),
  message: z.string(),
});
type ContactUsFormValues = z.infer<typeof baseSchema>;

const ContactUs = ({
  className,
  formData,
}: {
  className?: string;
  formData: NonNullable<
    BLINKDRAFT_PAGE_QUERYResult['blinkdraftPage']
  >['contactUsFormModal'];
}) => {
  if (!formData) {
    return notFound();
  }

  const formSchema = useMemo(() => {
    return z.object({
      firstName: z.string().min(1, 'First name is required.'),
      familyName: z.string().min(1, 'Family name is required.'),
      email: z
        .string()
        .min(1, 'Email is required.')
        .email('Invalid email address.'),
      message: z.string().min(10, 'Message is required.'),
    });
  }, []);

  const [isSubmitted, setIsSubmitted] = useState(false);

  const { execute, isExecuting, result } = useAction(sendContactForm, {
    onSuccess: () => {
      setIsSubmitted(true);
      form.reset();
    },
    onError: (error) => {
      console.error('Failed to send email:', error);
    },
  });

  const form = useForm<ContactUsFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: '',
      familyName: '',
      email: '',
      message: '',
    },
  });

  function onSubmit(values: ContactUsFormValues) {
    execute(values);
  }

  const contactFieldsOrder: (keyof ContactUsFormValues)[] = [
    'firstName',
    'familyName',
    'email',
    'message',
  ];

  if (isSubmitted) {
    return (
      <div className={className}>
        <div className='text-center py-8'>
          <h3 className='text-dark-blue text-3xl sm:text-4xl'>Thank you!</h3>
          <p className='text-dark-blue sm:text-lg md:text-xl mt-5'>
            Your message has been sent successfully. We'll get back to you soon.
          </p>
          <DialogClose asChild className='mt-10'>
            <IconButton text='Close' className='w-fit mx-auto' />
          </DialogClose>
        </div>
      </div>
    );
  }

  return (
    <div className={className}>
      {result?.serverError && (
        <div className='mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded'>
          Failed to send message. Please try again.
        </div>
      )}

      <div className='text-left'>
        <h3 className='text-dark-blue text-3xl sm:text-4xl'>Contact Us</h3>
        <p className='text-dark-blue sm:text-lg md:text-xl mt-2'>
          Please fill out the form below to contact us.
        </p>
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='mt-6 xl:mt-8'
        >
          <div className='grid grid-cols-1 gap-4'>
            {Object.entries(formData.contactDetails.fields || {})
              .sort(
                (a, b) =>
                  contactFieldsOrder.indexOf(
                    a[0] as keyof ContactUsFormValues
                  ) -
                  contactFieldsOrder.indexOf(b[0] as keyof ContactUsFormValues)
              )
              .map(([key, label]) => (
                <FormField
                  key={key}
                  control={form.control}
                  name={key as any}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder={label as string}
                          {...field}
                          type={key === 'message' ? 'textarea' : 'text'}
                          className='text-dark-blue placeholder:text-dark-blue bg-lightest-blue/25 flex items-center sm:text-lg md:text-xl h-13 md:h-16 px-4 sm:px-5 py-0 border-none outline-none focus-visible:ring-0 focus-visible:ring-offset-0'
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ))}
          </div>
          <div className='flex flex-col-reverse md:flex-row gap-4 items-center justify-end mt-10 xl:mt-12'>
            <DialogClose asChild>
              <IconButton
                text='Close'
                className='w-full md:w-fit h-13 md:h-14 text-lg md:text-xl'
                iconClassName='size-8! md:size-9!'
              />
            </DialogClose>

            <IconButton
              type='submit'
              text={
                isExecuting
                  ? 'Sending...'
                  : formData.contactDetails.submitButtonText
              }
              disabled={isExecuting}
              className='w-full md:w-fit h-13 md:h-14 text-lg md:text-xl disabled:opacity-50'
              iconClassName='size-8! md:size-9!'
            />
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ContactUs;
