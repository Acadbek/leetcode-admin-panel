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

  // "id": 2,
  // "username": "John",
  // "firstName": "John",
  // "lastName": "Doe",
  // "role": "ADMIN",
  // "status": "ACTIVE",
  // "companyId": null,
  // "companyName": null,
  // "password": "$2a$10$g5D6b6qnQEEE2k1cG.Jl7emEI99CTxOrn91ZBXlkL.4bNNNL/awr6",
  // "createdAt": "2025-06-19T19:47:24.720701",
  // "groups": null

  return (
    <div>
      Users <pre>{JSON.stringify(users?.content, null, 2)}</pre>
      {isLoading ? (
        <TableSkeleton />
      ) : (
        <>
          {/* <pre>
            {JSON.stringify(users, null, 2)}
          </pre> */}
          <UsersDataTable columns={columns} data={users?.content || []} />
        </>
      )}
    </div>
  );
};

export default UsersPage;
