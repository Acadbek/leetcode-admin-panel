import { Plus, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { DataTableViewOptions } from '@/components/problems-table/data-table-view-options';
import { difficulties, companies } from './data';
import { DataTableFacetedFilter } from './data-table-faceted-filter';
import { useNavigate } from 'react-router-dom';

export function DataTableToolbar({ table }) {
  const navigate = useNavigate();
  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div className='flex items-center justify-between'>
      <div className='flex flex-1 items-center space-x-2'>
        <Input
          placeholder='Search problems...'
          value={table.getColumn('title')?.getFilterValue() ?? ''}
          onChange={(event) =>
            table.getColumn('title')?.setFilterValue(event.target.value)
          }
          className='h-8 w-[150px] lg:w-[250px]'
        />
        {table.getColumn('difficulty') && (
          <DataTableFacetedFilter
            column={table.getColumn('difficulty')}
            title='Difficulty'
            options={difficulties}
          />
        )}
        {table.getColumn('companyName') && (
          <DataTableFacetedFilter
            column={table.getColumn('companyName')}
            title='Company Name'
            options={companies}
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
        <Button
          onClick={() => navigate('/problems/create')}
          title='Create Problem'
          size='sm'
          variant='default'
          className='flex items-center justify-center px-2 lg:px-3'
        >
          <Plus />
        </Button>
      </div>
    </div>
  );
}
