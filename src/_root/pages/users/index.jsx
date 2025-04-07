"use client"

import { DataTable2 } from '@/components/table/data-table2'
import React from 'react'
import data from '@/components/table/tasks'
import { columns } from '@/components/table/columns'

const UsersPage = () => {
  return (
    <div>
      <DataTable2 columns={columns} data={data} />
    </div>
  )
}

export default UsersPage