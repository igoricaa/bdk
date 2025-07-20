'use client';

import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import { Button } from '@/src/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/src/components/ui/form';
import { Input } from '@/src/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/src/components/ui/radio-group';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/src/components/ui/accordion';
import { Checkbox } from '@/src/components/ui/checkbox';
import {
  Card,
  CardContent,
} from '@/src/components/ui/card';
import { Separator } from '@/src/components/ui/separator';
import { BLINKDRAFT_SUBSCRIPTION_FORM_QUERYResult } from '@/sanity.types';
import { useMemo } from 'react';
import { cn } from '@/src/lib/utils';
import { Label } from '../ui/label';
import IconButton from '../ui/buttons/icon-button';

interface TemplateItem {
  id: string;
  title: string;
}
interface TemplateSubgroup {
  title: string;
  templateItems: TemplateItem[];
}
interface TemplateGroup {
  title: string;
  templateSubgroups: TemplateSubgroup[];
}
interface SanityFormData {
  title: string;
  subscriptionType: { label: string; options: { [key: string]: string } };
  packageChoice: { label: string; options: { [key: string]: string } };
  languageVersion: { label: string; options: { [key: string]: string } };
  contactDetails: { label: string; fields: { [key: string]: string } };
  submitButtonText: string;
  individualTemplates: {
    label: string;
    templateGroups: TemplateGroup[];
  };
}

interface SubscriptionFormProps {
  formData: SanityFormData;
}

const baseSchema = z.object({
  subscriptionType: z.enum(['full', 'package', 'individual']),
  languageVersion: z.enum(['bilingual', 'serbian']),
  documentPackage: z.string().optional(),
  individualTemplates: z.record(z.record(z.array(z.string()))).optional(),
  firstName: z.string(),
  familyName: z.string(),
  email: z.string(),
  position: z.string(),
  companyName: z.string(),
  companyAddress: z.string(),
  numUsers: z.coerce.number(),
});
type SubscriptionFormValues = z.infer<typeof baseSchema>;

export default function SubscriptionForm({
  formData,
  className,
}: {
  formData: BLINKDRAFT_SUBSCRIPTION_FORM_QUERYResult['subscriptionForm'];
  className?: string;
}) {
  if (!formData) {
    return null;
  }

  const formSchema = useMemo(() => {
    return z
      .object({
        subscriptionType: z.enum(['full', 'package', 'individual'], {
          required_error: 'Subscription type is required.',
        }),
        languageVersion: z.enum(['bilingual', 'serbian'], {
          required_error: 'Language version is required.',
        }),
        documentPackage: z.string().optional(),
        individualTemplates: z.record(z.record(z.array(z.string()))).optional(),
        firstName: z.string().min(1, 'First name is required.'),
        familyName: z.string().min(1, 'Family name is required.'),
        email: z
          .string()
          .min(1, 'Email is required.')
          .email('Invalid email address.'),
        position: z.string().min(1, 'Position is required.'),
        companyName: z.string().min(1, 'Company name is required.'),
        companyAddress: z.string().min(1, 'Company address is required.'),
        numUsers: z.coerce
          .number({ required_error: 'Number of users is required.' })
          .int()
          .positive('Must be a positive number.'),
      })
      .refine(
        (data) => {
          if (data.subscriptionType === 'package')
            return !!data.documentPackage;
          return true;
        },
        {
          message: 'Please choose a package.',
          path: ['documentPackage'],
        }
      );
  }, []);

  const form = useForm<SubscriptionFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      subscriptionType: 'full',
      languageVersion: 'bilingual',
      documentPackage: 'amendments',
      firstName: '',
      familyName: '',
      email: '',
      position: '',
      companyName: '',
      companyAddress: '',
      numUsers: 1,
      individualTemplates: {},
    },
  });

  const subscriptionType = useWatch({
    control: form.control,
    name: 'subscriptionType',
  });

  function onSubmit(values: SubscriptionFormValues) {
    console.log('Form Submitted:', JSON.stringify(values, null, 2));
    alert('Form submitted! Check the console for the form data.');
  }

  const contactFieldsOrder = [
    'firstName',
    'familyName',
    'email',
    'position',
    'companyName',
    'companyAddress',
    'numUsers',
  ];

  return (
    <Card
      className={cn(
        'bg-white min-h-screen px-2.5 sm:px-11 lg:px-12 xl:px-14 py-15 xl:py-12 2xl:py-18 rounded-[10px] sm:rounded-2xl shadow-none border-none',
        className
      )}
    >
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='space-y-6 sm:space-y-10 xl:space-y-12 2xl:space-y-15'
          >
            <FormField
              control={form.control}
              name='subscriptionType'
              render={({ field }) => (
                <FormItem className='gap-5'>
                  <FormLabel className='text-dark-blue text-xl sm:text-2xl 2xl:text-3xl'>
                    {formData.subscriptionType.label}
                  </FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className='flex flex-wrap gap-2.5'
                    >
                      {Object.entries(formData.subscriptionType.options).map(
                        ([key, label]) => (
                          <FormItem key={key}>
                            <FormControl>
                              <RadioGroupItem
                                value={key}
                                id={`sub-type-${key}`}
                                className='peer sr-only'
                              />
                            </FormControl>
                            <Label
                              htmlFor={`sub-type-${key}`}
                              className='flex flex-col items-center justify-center rounded-[500px] bg-dark-blue text-white font-normal px-4 text-lg h-10 hover:bg-light-blue peer-data-[state=checked]:bg-light-blue cursor-pointer transition-colors'
                            >
                              {label}
                            </Label>
                          </FormItem>
                        )
                      )}
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {subscriptionType === 'package' && (
              <FormField
                control={form.control}
                name='documentPackage'
                render={({ field }) => (
                  <FormItem className='gap-5'>
                    <FormLabel className='text-dark-blue text-xl sm:text-2xl 2xl:text-3xl'>
                      {formData.packageChoice.label}
                    </FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className='flex flex-wrap gap-2.5'
                      >
                        {Object.entries(formData.packageChoice.options).map(
                          ([key, label]) => (
                            <FormItem key={key}>
                              <FormControl>
                                <RadioGroupItem
                                  value={key}
                                  id={`pkg-choice-${key}`}
                                  className='peer sr-only'
                                />
                              </FormControl>
                              <Label
                                htmlFor={`pkg-choice-${key}`}
                                className='flex flex-col items-center justify-center rounded-[500px] bg-dark-blue text-white font-normal px-4 text-lg h-10 hover:bg-light-blue peer-data-[state=checked]:bg-light-blue cursor-pointer transition-colors'
                              >
                                {label}
                              </Label>
                            </FormItem>
                          )
                        )}
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            {subscriptionType === 'individual' && (
              <section>
                <h3 className='text-dark-blue text-xl sm:text-2xl 2xl:text-3xl'>
                  {formData.individualTemplates.label}
                </h3>

                <div className='mt-4 sm:mt-5'>
                  <Accordion type='multiple' className='w-full space-y-4'>
                    {formData.individualTemplates.templateGroups.map(
                      (group, groupIndex) => (
                        <AccordionItem
                          value={`group-${groupIndex}`}
                          key={groupIndex}
                          className='bg-lightest-blue/25 rounded-[10px] px-5'
                        >
                          <AccordionTrigger className='text-dark-blue flex items-center justify-between text-lg xl:text-xl h-15 xl:h-18'>
                            {group.title}
                          </AccordionTrigger>
                          <AccordionContent>
                            <Accordion
                              type='multiple'
                              className='w-full gap-2.5'
                            >
                              {group.templateSubgroups.map(
                                (subgroup, subIndex) => (
                                  <AccordionItem
                                    value={`subgroup-${groupIndex}-${subIndex}`}
                                    key={subIndex}
                                  >
                                    <AccordionTrigger className='text-dark-blue flex justify-between border-t border-grey-random/50 rounded-none text-lg xl:text-xl pt-2.5 pb-0 h-15 xl:h-16'>
                                      {subgroup.title}
                                    </AccordionTrigger>
                                    <AccordionContent>
                                      <div className='space-y-5 pt-2.5 pb-10'>
                                        {subgroup.templateItems.map((item) => (
                                          <FormField
                                            key={item}
                                            control={form.control}
                                            name={`individualTemplates.${group.title}.${subgroup.title}`}
                                            render={({ field }) => (
                                              <FormItem className='flex flex-row items-center space-x-4'>
                                                <FormControl>
                                                  <Checkbox
                                                    checked={field.value?.includes(
                                                      item
                                                    )}
                                                    onCheckedChange={(
                                                      checked
                                                    ) => {
                                                      const currentValues =
                                                        field.value || [];
                                                      return checked
                                                        ? field.onChange([
                                                            ...currentValues,
                                                            item,
                                                          ])
                                                        : field.onChange(
                                                            currentValues.filter(
                                                              (value) =>
                                                                value !== item
                                                            )
                                                          );
                                                    }}
                                                    className='rounded-full size-5 border-none bg-white data-[state=checked]:bg-white! [&_svg]:stroke-dark-blue '
                                                  />
                                                </FormControl>
                                                <FormLabel className='text-grey-text text-sm sm:text-base xl:text-lg'>
                                                  {item}
                                                </FormLabel>
                                              </FormItem>
                                            )}
                                          />
                                        ))}
                                      </div>
                                    </AccordionContent>
                                  </AccordionItem>
                                )
                              )}
                            </Accordion>
                          </AccordionContent>
                        </AccordionItem>
                      )
                    )}
                  </Accordion>
                </div>
              </section>
            )}

            <FormField
              control={form.control}
              name='languageVersion'
              render={({ field }) => (
                <FormItem className='gap-5'>
                  <FormLabel className='text-dark-blue text-xl sm:text-2xl 2xl:text-3xl'>
                    {formData.languageVersion.label}
                  </FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className='flex flex-wrap gap-2.5'
                    >
                      {Object.entries(formData.languageVersion.options).map(
                        ([key, label]) => (
                          <FormItem key={key}>
                            <FormControl>
                              <RadioGroupItem
                                value={key}
                                id={`lang-version-${key}`}
                                className='peer sr-only'
                              />
                            </FormControl>
                            <Label
                              htmlFor={`lang-version-${key}`}
                              className='flex flex-col items-center justify-center rounded-[500px] bg-dark-blue text-white font-normal px-4 text-lg h-10 hover:bg-light-blue peer-data-[state=checked]:bg-light-blue cursor-pointer transition-colors'
                            >
                              {label}
                            </Label>
                          </FormItem>
                        )
                      )}
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Separator />

            <div className='space-y-4'>
              <h3 className='text-dark-blue text-xl sm:text-2xl 2xl:text-3xl'>
                {formData.contactDetails.label}
              </h3>
              <div className='grid grid-cols-1 gap-4'>
                {Object.entries(formData.contactDetails.fields)
                  .sort(
                    (a, b) =>
                      contactFieldsOrder.indexOf(a[0]) -
                      contactFieldsOrder.indexOf(b[0])
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
                              placeholder={label}
                              {...field}
                              type={key === 'numUsers' ? 'number' : 'text'}
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
              text={formData.submitButtonText}
              className='mt-10 xl:mt-18 ml-auto w-fit'
            />
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
