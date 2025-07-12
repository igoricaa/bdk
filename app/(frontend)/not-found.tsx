import { TransitionLink } from '@/components/transition-link';
import { ArrowLeftIcon } from 'lucide-react';

export default function NotFound() {
  return (
    <div className='min-h-screen pt-header flex items-center justify-center bg-white'>
      <div className='text-center px-side max-w-2xl'>
        <h1 className='text-6xl font-bold text-dark-blue mb-4'>404</h1>
        <h2 className='text-2xl md:text-3xl font-semibold text-dark-blue mb-4'>
          Page Not Found
        </h2>
        <p className='text-grey-text mb-8 text-lg'>
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className='flex flex-col sm:flex-row gap-4 justify-center'>
          <TransitionLink
            href='/'
            className='inline-flex items-center gap-2 px-6 py-3 bg-dark-blue text-white rounded-full hover:bg-dark-blue/90 transition-colors'
          >
            <ArrowLeftIcon className='w-4 h-4' />
            Go to Home
          </TransitionLink>
          <TransitionLink
            href='/bdknowledge'
            className='inline-flex items-center gap-2 px-6 py-3 border border-dark-blue text-dark-blue rounded-full hover:bg-dark-blue hover:text-white transition-colors'
          >
            Browse Posts
          </TransitionLink>
        </div>
      </div>
    </div>
  );
}
