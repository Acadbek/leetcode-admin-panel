import { Plus, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { DataTableViewOptions } from '@/components/table/data-table-view-options';
import { priorities, statuses } from './data';
import { DataTableFacetedFilter } from './data-table-faceted-filter';
import { useNavigate } from 'react-router-dom';

export function DataTableToolbar({ table }) {
  const navigate = useNavigate()
  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div className='flex items-center justify-between'>
      <div className='flex flex-1 items-center space-x-2'>
        <Input
          placeholder='Filter tasks...'
          value={table.getColumn('name')?.getFilterValue() ?? ''}
          onChange={(event) =>
            table.getColumn('name')?.setFilterValue(event.target.value)
          }
          className='h-8 w-[150px] lg:w-[250px]'
        />
        {table.getColumn('status') && (
          <DataTableFacetedFilter
            column={table.getColumn('status')}
            title='Status'
            options={statuses}
          />
        )}
        {table.getColumn('email') && (
          <DataTableFacetedFilter
            column={table.getColumn('email')}
            title='Email'
            options={priorities}
          />
        )}
        {isFiltered && (
          <Button
            variant='ghost'
            onClick={() => table.resetColumnFilters()}
            className='h-8 px-2 lg:px-3'
          >
            Reset
            <X />
          </Button>
        )}
      </div>
      <div className='flex items-center space-x-2'>
        <DataTableViewOptions table={table} />
        <Button onClick={() => navigate('/company/create')} title='Create Company' size='sm' variant='default' className='flex items-center justify-center px-2 lg:px-3'>
          <Plus />
        </Button>
      </div>
    </div>
  );
}
