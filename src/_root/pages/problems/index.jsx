import React from 'react';
import { useLoading } from '@/context/loading-state';
import { ProblemsDataTable } from '@/components/problems-table/data-table';
import { columns } from '@/components/problems-table/columns';
import { useProblems } from '@/hooks/queries/useProblems';

const ProblemsPage = () => {
  const { run, stop } = useLoading();
  const { data: problems } = useProblems();

  React.useEffect(() => {
    run();
    const timer = setTimeout(() => {
      stop();
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      {/* Problems <pre>{JSON.stringify(problems?.content, null, 2)}</pre> */}
      <ProblemsDataTable columns={columns} data={problems?.content || []} />
    </div>
  );
};

export default ProblemsPage;
