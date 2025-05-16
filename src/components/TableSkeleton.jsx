import { Skeleton } from '@/components/ui/skeleton';

export const TableSkeleton = () => {
  return (
    <div className='px-6 rounded-lg'>
      {/* Table header skeleton */}
      <div className='grid grid-cols-10 gap-2 px-4 py-3 border-b bg-muted/50'>
        {Array.from({ length: 10 }).map((_, i) => (
          <Skeleton key={i} className='h-4 w-full' />
        ))}
      </div>

      {/* Table rows skeleton */}
      {Array.from({ length: 8 }).map((_, rowIdx) => (
        <div
          key={rowIdx}
          className='grid grid-cols-10 gap-2 px-2 py-2 border-b items-center'
        >
          <Skeleton className='h-4 w-4 rounded' />
          <Skeleton className='h-4 w-24' />
          <Skeleton className='h-4 w-20' />
          <Skeleton className='h-4 w-16' />
          <Skeleton className='h-4 w-24' />
          <Skeleton className='h-4 w-32' />
          <Skeleton className='h-6 w-20 rounded-full' />
          <Skeleton className='h-4 w-28' />
          <div className='flex gap-2'>
            <Skeleton className='h-4 w-20' />
            <Skeleton className='h-4 w-12' />
          </div>
          <Skeleton className='h-8 w-8 rounded-full' />
        </div>
      ))}
    </div>
  );
};
