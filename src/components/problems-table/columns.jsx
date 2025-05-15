import { Checkbox } from '@/components/ui/checkbox';
import { DataTableColumnHeader } from '@/components/users-table/data-table-column-header';
import { DataTableRowActions } from '@/components/users-table/data-table-row-actions';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { Calendar } from 'lucide-react';

export const columns = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label='Select all'
        className='translate-y-[2px]'
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label='Select row'
        className='translate-y-[2px]'
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'title',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Title' />
    ),
    cell: ({ row }) => (
      <Link
        to={`/problems/${row.getValue('id')}`}
        className='max-w-[500px] truncate font-medium'
      >
        {row.getValue('title')}
      </Link>
    ),
  },
  // {
  //   accessorKey: 'difficulty',
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title='Difficulty' />
  //   ),
  //   cell: ({ row }) => (
  //     <span className='max-w-[500px] truncate font-medium'>
  //       {row.getValue('difficulty')}
  //     </span>
  //   ),
  // },
  {
    accessorKey: 'companyName',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Company Name' />
    ),
    cell: ({ row }) => (
      <span className='max-w-[500px] truncate font-medium'>
        {row.getValue('companyName')}
      </span>
    ),
  },
  {
    accessorKey: 'createdAt',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Created At' />
    ),
    cell: ({ row }) => (
      <div className='flex items-center text-xs'>
        <Calendar size={14} className='mr-1 text-muted-foreground' />
        <p className='max-w-[500px] truncate font-semibold'>
          {format(new Date(row.getValue('createdAt')), 'dd-MM-yyyy')}
        </p>
        <p className='ml-2 font-semibold italic'>
          {format(new Date(row.getValue('createdAt')), 'HH:mm')}
        </p>
      </div>
    ),
  },
  {
    accessorKey: 'createdByName',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Created By' />
    ),
    cell: ({ row }) => (
      <span className='max-w-[500px] truncate font-medium'>
        {row.getValue('createdByName')}
      </span>
    ),
  },
  {
    accessorKey: 'lessons',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Lessons' />
    ),
    cell: ({ row }) => (
      <span className='max-w-[500px] truncate font-medium'>
        {row.getValue('lessons')}
      </span>
    ),
  },
  // {
  //   accessorKey: 'updatedAt',
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title='Updated At' />
  //   ),
  //   cell: ({ row }) => (
  //     <div className='flex items-center text-xs'>
  //       <Calendar size={14} className='mr-1 text-muted-foreground' />
  //       <p className='max-w-[500px] truncate font-semibold'>
  //         {format(new Date(row.getValue('updatedAt')), 'dd-MM-yyyy')}
  //       </p>
  //       <p className='ml-2 font-semibold italic'>
  //         {format(new Date(row.getValue('updatedAt')), 'HH:mm')}
  //       </p>
  //     </div>
  //   ),
  // },
  {
    id: 'actions',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Actions' />
    ),
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
