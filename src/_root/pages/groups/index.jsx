import { DataTable2 } from '@/components/table/data-table2';
import React from 'react';
import { groupsColumns } from '@/components/table/groups-table';
import data from '@/components/table/groups-data';

const GroupsPage = () => {
  return (
    <section>
      <div>
        <DataTable2 columns={groupsColumns} data={data} />
      </div>
    </section>
  );
};

export default GroupsPage;
