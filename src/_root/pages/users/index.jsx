import React from 'react';
import { columns } from '@/components/users-table/columns';
import { useLoading } from '@/context/loading-state';
import { useGetUsers } from '@/hooks/queries/useUsers';
import { UsersDataTable } from '@/components/users-table/data-table';

const UsersPage = () => {
  const { run, stop } = useLoading();
  const { data: users } = useGetUsers();

  React.useEffect(() => {
    run();
    const timer = setTimeout(() => {
      stop();
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      {/* Users <pre>{JSON.stringify(users?.content, null, 2)}</pre> */}
      <UsersDataTable columns={columns} data={users?.content || []} />
    </div>
  );
};

export default UsersPage;
