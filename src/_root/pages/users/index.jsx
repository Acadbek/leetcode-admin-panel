import React from 'react';
import { columns } from '@/components/users-table/columns';
import { useLoading } from '@/context/loading-state';
import { useGetUsers } from '@/hooks/queries/useUsers';
import { UsersDataTable } from '@/components/users-table/data-table';
import { TableSkeleton } from '@/components/TableSkeleton';

const UsersPage = () => {
  const { run, stop } = useLoading();
  const { data: users, isLoading, isError, error } = useGetUsers();

  React.useEffect(() => {
    run();
    const timer = setTimeout(() => {
      stop();
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      {isLoading
        ? <TableSkeleton />
        : <UsersDataTable columns={columns} data={users?.content || []} />
      }
    </div>
  );
};

export default UsersPage;
