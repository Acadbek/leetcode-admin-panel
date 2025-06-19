import { Checkbox } from '@/components/ui/checkbox';
import { DataTableColumnHeader } from '@/components/users-table/data-table-column-header';
import { DataTableRowActions } from '@/components/users-table/data-table-row-actions';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { Badge } from '../ui/badge';
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
    accessorKey: 'firstName',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Name' />
    ),
    cell: ({ row }) => (
      <Link
        to={`/users/${row.getValue('username')}`}
        className='max-w-[500px] truncate font-medium'
      >
        {row.getValue('firstName')}
      </Link>
    ),
  },
  {
    accessorKey: 'lastName',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Last Name' />
    ),
    cell: ({ row }) => (
      <span className='max-w-[500px] truncate font-medium'>
        {row.getValue('lastName')}
      </span>
    ),
  },
  {
    accessorKey: 'role',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Role' />
    ),
    cell: ({ row }) => (
      <span className='max-w-[500px] capitalize truncate font-medium'>
        {row.getValue('role')}
      </span>
    ),
  },
  {
    accessorKey: 'username',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Username' />
    ),
    cell: ({ row }) => (
      <span className='max-w-[500px] lowercase text-blue-600 truncate font-medium'>
        @{row.getValue('username')}
      </span>
    ),
  },
  {
    accessorKey: 'groups',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Groups' />
    ),
    cell: ({ row }) => (
      <span className='max-w-[500px] truncate font-medium'>
        {/* {row.getValue('groups').join(', ')} */}
        {row.getValue('groups') ? row.getValue('groups').join(', ') : 'No groups'}
      </span>
    ),
  },
  {
    accessorKey: 'status',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Status' />
    ),
    cell: ({ row }) => (
      <span className='max-w-[500px] truncate font-medium'>
        {row.getValue('status') == 'ACTIVE' ? (
          <Badge variant='default'>Active</Badge>
        ) : (
          <Badge variant='destructive'>Inactive</Badge>
        )}
      </span>
    ),
  },
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
    id: 'actions',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Actions' />
    ),
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
