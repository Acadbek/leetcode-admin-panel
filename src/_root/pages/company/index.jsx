import React from 'react';
import { DataTable } from '@/components/company-table/data-table';
import { columns } from '@/components/company-table/columns';
// import data from '@/components/company-table/tasks.json';
import { useGetCompanies } from '@/hooks/queries/useCompany';
import { TableSkeleton } from '@/components/TableSkeleton';

const CompanyPage = () => {
  const {
    data: companies,
    isLoading,
    isError,
    error,
    isSuccess,
    isPending,
  } = useGetCompanies();

  return (
    <section>
      {isLoading ? (
        <TableSkeleton />
      ) : (
        <DataTable columns={columns} data={companies?.content || []} />
      )}
    </section>
  );
};

export default CompanyPage;
