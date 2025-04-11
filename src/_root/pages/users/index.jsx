"use client"

import { DataTable2 } from '@/components/table/data-table2'
import React from 'react'
import data from '@/components/table/tasks'
import { columns } from '@/components/table/columns'
import { useLoading } from '@/context/loading-state'

const UsersPage = () => {
  const { run, stop } = useLoading();

  React.useEffect(() => {
    run()
    const timer = setTimeout(() => {
      stop()
    }, 300)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div>
      <DataTable2 columns={columns} data={data} />
    </div>
  )
}

export default UsersPage