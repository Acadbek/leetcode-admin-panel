import React from 'react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { List, MoreHorizontal, Search } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from '@/components/ui/dropdown-menu';
import { Filter } from 'lucide-react';
import { ChevronDown } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar } from 'lucide-react';
import { Plus } from 'lucide-react';
import { SortAsc } from 'lucide-react';
import { AddStudentsModal } from './components/add-student-modal';
import { GroupTable } from './components/group-table';
import { GroupCard } from './components/group-card';
import { Link } from 'react-router-dom';
import { useCreateGroups, useGetGroups } from '@/hooks/queries/useGroups';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const GroupPage = () => {
  const { mutateAsync: createGroup } = useCreateGroups();
  const { data: groups2, isLoading, isError, error } = useGetGroups(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [viewType, setViewType] = useState('card');
  const [isAddStudentsModalOpen, setIsAddStudentsModalOpen] = useState(false);
  const [selectedGroupId, setSelectedGroupId] = useState(null);

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Filter groups based on search query and status filter
  const filteredGroups = Array.isArray(groups2?.content)
    ? groups2.content.filter((group) => {
      const matchesSearch =
        group.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        group.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        group.status?.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus =
        statusFilter === 'all' ||
        group.status?.toLowerCase() === statusFilter.toLowerCase();

      return matchesSearch && matchesStatus;
    })
    : [];


  // Sort groups based on sort option
  const sortedGroups = [...filteredGroups].sort((a, b) => {
    switch (sortBy) {
      case 'studentCount':
        return b.studentCount - a.studentCount;
      case 'createdDate': {
        const dateA = new Date(a.createdAt);
        const dateB = new Date(b.createdAt);
        if (isNaN(dateA) || isNaN(dateB)) return 0;
        return dateB.getTime() - dateA.getTime();
      }
      case 'progress':
        return (b.progress || 0) - (a.progress || 0);
      default:
        return a.name.localeCompare(b.name);
    }
  });


  const handleAddStudents = (groupId) => {
    setSelectedGroupId(groupId);
    setIsAddStudentsModalOpen(true);
  };

  return (
    <div className='container mx-auto px-4'>
      {/* <pre>{JSON.stringify(groups2?.content, null, 2)}</pre> */}
      <div className='flex flex-col gap-6'>
        {/* Header section */}
        <div className='flex flex-col gap-4 md:flex-row md:items-center md:justify-between'>
          <h1 className='text-2xl font-semibold tracking-tight'>Groups</h1>
          <Link to='/groups/create' className='flex items-center gap-1'>
            <Button className='w-full md:w-auto'>
              <Plus className='h-4 w-4' /> Create New Group
            </Button>
          </Link>
        </div>

        {/* Search and filters */}
        <div className='grid gap-4 md:grid-cols-12'>
          <div className='relative md:col-span-5'>
            <Search className='absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground' />
            <Input
              type='search'
              placeholder='Search groups...'
              className='pl-8'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className='flex items-center gap-2 md:col-span-7 md:justify-end'>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant='outline' className='flex items-center gap-1'>
                  <Filter className='h-4 w-4' />
                  <span className='hidden sm:inline'>Status:</span>
                  <span className='capitalize'>
                    {statusFilter === 'all' ? 'All' : statusFilter}
                  </span>
                  <ChevronDown className='h-4 w-4' />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align='end'>
                <DropdownMenuRadioGroup
                  value={statusFilter}
                  onValueChange={setStatusFilter}
                >
                  <DropdownMenuRadioItem value='all'>All</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value='active'>
                    Active
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value='inactive'>
                    Inactive
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value='archived'>
                    Archived
                  </DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant='outline' className='flex items-center gap-1'>
                  <SortAsc className='h-4 w-4' />
                  <span className='hidden sm:inline'>Sort by:</span>
                  <span className='capitalize'>
                    {sortBy === 'studentCount'
                      ? 'Students'
                      : sortBy === 'createdDate'
                        ? 'Date'
                        : sortBy === 'progress'
                          ? 'Progress'
                          : 'Name'}
                  </span>
                  <ChevronDown className='h-4 w-4' />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align='end'>
                <DropdownMenuRadioGroup
                  value={sortBy}
                  onValueChange={setSortBy}
                >
                  <DropdownMenuRadioItem value='name'>
                    Name
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value='studentCount'>
                    Student Count
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value='createdDate'>
                    Created Date
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value='progress'>
                    Progress
                  </DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>

            <Tabs
              defaultValue='card'
              className='w-auto'
              onValueChange={setViewType}
            >
              <TabsList className='grid w-auto grid-cols-2'>
                <TabsTrigger value='card' className='px-3'>
                  <div className='flex items-center gap-1'>
                    <Calendar className='h-4 w-4' />
                    <span className='hidden sm:inline'>Cards</span>
                  </div>
                </TabsTrigger>
                <TabsTrigger value='table' className='px-3'>
                  <div className='flex items-center gap-1'>
                    <List className='h-4 w-4' />
                    <span className='hidden sm:inline'>Table</span>
                  </div>
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>

        {/* Groups display */}
        <div>
          {viewType === 'card' ? (
            <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>
              {sortedGroups.length > 0 ? (
                sortedGroups.map((group) => (
                  <GroupCard
                    key={group.id}
                    group={group}
                    onAddStudents={() => handleAddStudents(group.id)}
                  />
                ))
              ) : (
                <>
                  <SkeletonGroupCard />
                  <SkeletonGroupCard />
                  <SkeletonGroupCard />
                  <SkeletonGroupCard />
                  <SkeletonGroupCard />
                </>
              )}
            </div>
          ) : (
            <>
              {sortedGroups.length > 0 ? (
                <GroupTable
                  groups={sortedGroups}
                  onAddStudents={handleAddStudents}
                />
              ) : (
                <>
                  <SkeletonTableRow />
                  <SkeletonTableRow />
                  <SkeletonTableRow />
                  <SkeletonTableRow />
                  <SkeletonTableRow />
                </>
              )}
            </>
          )}

          {sortedGroups.length === 0 && (
            <div className='flex flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center'>
              <h3 className='mt-2 text-lg font-semibold'>No groups found</h3>
              <p className='mb-4 mt-1 text-sm text-muted-foreground'>
                Try adjusting your search or filter to find what you're looking
                for.
              </p>
              <Button
                onClick={() => {
                  setSearchQuery('');
                  setStatusFilter('all');
                }}
              >
                Reset filters
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Add Students Modal */}
      <AddStudentsModal
        isOpen={isAddStudentsModalOpen}
        onClose={() => setIsAddStudentsModalOpen(false)}
        groupId={selectedGroupId}
      />
    </div>
  );
};

const GroupPageSkeleton = () => {
  return (
    <div className='container mx-auto px-4'>
      <div className='flex flex-col gap-6'>
        {/* Header */}
        <div className='flex flex-col gap-4 md:flex-row md:items-center md:justify-between'>
          <Skeleton className='h-8 w-40' />
          <Skeleton className='h-10 w-48' />
        </div>

        {/* Search & Filters */}
        <div className='grid gap-4 md:grid-cols-12'>
          <Skeleton className='h-10 w-full md:col-span-5' />
          <div className='flex items-center gap-2 md:col-span-7 md:justify-end'>
            <Skeleton className='h-10 w-28' />
            <Skeleton className='h-10 w-28' />
            <Skeleton className='h-10 w-20' />
          </div>
        </div>

        {/* Cards */}
        <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>
          {[...Array(6)].map((_, idx) => (
            <div
              key={idx}
              className='rounded-lg border p-4 shadow-sm space-y-4'
            >
              <Skeleton className='h-6 w-2/3' />
              <Skeleton className='h-4 w-full' />
              <Skeleton className='h-4 w-1/2' />
              <Skeleton className='h-3 w-1/3' />
              <Skeleton className='h-4 w-2/5' />
              <Skeleton className='h-8 w-full mt-2' />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

function SkeletonGroupCard() {
  return (
    <Card className='overflow-hidden flex flex-col justify-between animate-pulse'>
      <CardHeader className='pb-2'>
        <div className='flex items-start justify-between'>
          <div className='space-y-2 flex-1'>
            <Skeleton className='h-5 w-3/4 rounded-md' />
            <Skeleton className='h-4 w-5/6 rounded-md' />
          </div>
          <Skeleton className='h-5 w-14 rounded-md' />
        </div>
      </CardHeader>
      <CardContent className='pb-2'>
        <div className='space-y-4'>
          <div className='grid grid-cols-2 gap-2 text-sm'>
            <Skeleton className='h-4 w-full rounded-md' />
            <Skeleton className='h-4 w-full rounded-md' />
          </div>

          <div className='space-y-2'>
            <div className='flex flex-col gap-1'>
              <Skeleton className='h-3 w-20 rounded-md' />
              <Skeleton className='h-4 w-1/2 rounded-md' />
              <Skeleton className='h-3 w-1/3 rounded-md' />
            </div>

            <div className='flex flex-col gap-1'>
              <Skeleton className='h-3 w-20 rounded-md' />
              <div className='flex gap-1'>
                <Skeleton className='h-6 w-6 rounded-full' />
                <Skeleton className='h-6 w-6 rounded-full' />
                <Skeleton className='h-6 w-6 rounded-full' />
              </div>
            </div>

            <div className='flex flex-col gap-1'>
              <Skeleton className='h-3 w-20 rounded-md' />
              <Skeleton className='h-4 w-2/3 rounded-md' />
            </div>

            <div className='flex flex-col gap-1'>
              <Skeleton className='h-3 w-20 rounded-md' />
              <Skeleton className='h-4 w-1/2 rounded-md' />
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className='flex justify-between gap-2 pt-2'>
        <Skeleton className='h-8 w-full rounded-md flex-1' />
        <Skeleton className='h-8 w-full rounded-md flex-1' />
        <Skeleton className='h-8 w-full rounded-md flex-1' />
      </CardFooter>
    </Card>
  );
}

function SkeletonTableRow() {
  return (
    <TableRow>
      <TableCell className='w-[250px]'>
        <div className='space-y-1'>
          <Skeleton className='h-4 w-3/4' />
          <Skeleton className='h-3 w-2/3' />
        </div>
      </TableCell>
      <TableCell className='hidden lg:table-cell'>
        <Skeleton className='h-4 w-20' />
      </TableCell>
      <TableCell>
        <Skeleton className='h-4 w-12' />
      </TableCell>
      <TableCell className='hidden xl:table-cell'>
        <div className='flex flex-col gap-1'>
          <Skeleton className='h-3 w-20' />
          <div className='flex gap-1 pt-1'>
            <Skeleton className='h-6 w-6 rounded-full' />
            <Skeleton className='h-6 w-6 rounded-full' />
            <Skeleton className='h-6 w-6 rounded-full' />
          </div>
        </div>
      </TableCell>
      <TableCell className='hidden lg:table-cell'>
        <Skeleton className='h-4 w-16' />
      </TableCell>
      <TableCell className='hidden md:table-cell'>
        <Skeleton className='h-4 w-24' />
      </TableCell>
      <TableCell className='text-right'>
        <div className='flex justify-end gap-2'>
          <div className='hidden sm:flex gap-1'>
            <Skeleton className='h-8 w-8 rounded-md' />
            <Skeleton className='h-8 w-8 rounded-md' />
            <Skeleton className='h-8 w-8 rounded-md' />
          </div>
          <Button variant='ghost' size='icon' className='h-8 w-8 sm:hidden'>
            <MoreHorizontal className='h-4 w-4' />
          </Button>
        </div>
      </TableCell>
    </TableRow>
  );
}

export default GroupPage;
