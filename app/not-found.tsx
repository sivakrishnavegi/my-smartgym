import { ArrowRightIcon } from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';

const PageNotFound = () => {
  return (
    <div className='grid h-screen w-full py-16'>
      <div className='mt-10 justify-self-center'>
        <p className=' text-muted-foreground py-6 text-2xl font-light  text-gray-400'>
          Page Not Found
        </p>
        <div className='text-center'>
          <Link href='/'>
            <Button className='h-8 bg-green-500 hover:bg-green-600 dark:bg-green-500 dark:text-white dark:hover:bg-green-600'>
              Take Me Home <ArrowRightIcon size={6} className='ml-1 h-4 w-4' />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PageNotFound;
