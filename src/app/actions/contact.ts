'use server';

import { createSafeActionClient } from 'next-safe-action';
import { z } from 'zod';
import { Resend } from 'resend';
import { ContactFormEmail } from '@/src/components/emails/contact-form-email';

const resend = new Resend(process.env.RESEND_API_KEY);

const contactFormSchema = z.object({
  firstName: z.string().min(1, 'First name is required.'),
  familyName: z.string().min(1, 'Family name is required.'),
  email: z
    .string()
    .min(1, 'Email is required.')
    .email('Invalid email address.'),
  message: z.string().min(10, 'Message is required.'),
});

export const sendContactForm = createSafeActionClient()
  .schema(contactFormSchema)
  .action(
    async ({ parsedInput: { firstName, familyName, email, message } }) => {
      try {
        if (!process.env.RESEND_API_KEY) {
          console.error('RESEND_API_KEY is not configured');
          return {
            success: false,
            error: 'Email service is not configured',
          };
        }

        const fullName = `${firstName} ${familyName}`;

        const { data, error } = await resend.emails.send({
          from: 'Contact Form <noreply@bdkadvokati.com>',
          to: ['stanisavljevic.igor4@gmail.com'],
          subject: `New Contact Form Submission from ${fullName}`,
          react: ContactFormEmail({
            firstName,
            familyName,
            email,
            message,
          }),
          text: `
New Contact Form Submission

Name: ${fullName}
Email: ${email}
Message: ${message}
        `,
          replyTo: email, // Allow replying directly to the sender
        });

        if (error) {
          console.error('Resend error:', error);
          return {
            success: false,
            error: 'Failed to send email',
          };
        }

        return {
          success: true,
          data: {
            messageId: data?.id,
            message: 'Email sent successfully',
          },
        };
      } catch (error) {
        console.error('Error sending contact form:', error);
        return {
          success: false,
          error: 'Failed to send email',
        };
      }
    }
  );
