'use client';

import { BLINKDRAFT_PAGE_QUERYResult } from '@/sanity.types';

import IconButton from './ui/buttons/icon-button';
import { Form, FormMessage, FormItem, FormControl, FormField } from './ui/form';
import { Input } from './ui/input';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMemo } from 'react';
import z from 'zod';
import notFound from '../app/(frontend)/not-found';

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
    console.log('Form Submitted:', JSON.stringify(values, null, 2));
    alert('Form submitted! Check the console for the form data.');
  }

  const contactFieldsOrder: (keyof ContactUsFormValues)[] = [
    'firstName',
    'familyName',
    'email',
    'message',
  ];

  return (
    <div className={className}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className='space-y-4'>
            <h3 className='text-dark-blue text-xl sm:text-2xl 2xl:text-3xl'>
              {formData.contactDetails.label}
            </h3>
            <div className='grid grid-cols-1 gap-4'>
              {Object.entries(formData.contactDetails.fields || {})
                .sort(
                  (a, b) =>
                    contactFieldsOrder.indexOf(
                      a[0] as keyof ContactUsFormValues
                    ) -
                    contactFieldsOrder.indexOf(
                      b[0] as keyof ContactUsFormValues
                    )
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
                            className='text-dark-blue placeholder:text-dark-blue bg-lightest-blue/25 flex items-center text-lg xl:text-xl h-15 xl:h-18 px-5 py-0 border-none outline-none focus-visible:ring-0 focus-visible:ring-offset-0'
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                ))}
            </div>
          </div>

          <IconButton
            type='submit'
            text={formData.contactDetails.submitButtonText}
            className='mt-10 xl:mt-18 ml-auto w-fit'
          />
        </form>
      </Form>
    </div>
  );
};

export default ContactUs;
