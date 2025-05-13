import React from 'react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { LineChart, List, Search } from 'lucide-react';
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
import { Users } from 'lucide-react';
import { Plus } from 'lucide-react';
import { SortAsc } from 'lucide-react';
import { AddStudentsModal } from './components/add-student-modal';
import { GroupTable } from './components/group-table';
import { GroupCard } from './components/group-card';
import { Link } from 'react-router-dom';

// Sample data for groups
const groups = [
  {
    id: '1',
    name: 'English Beginners A1',
    description: 'Introduction to English language basics',
    status: 'Active',
    createdDate: '2023-09-15',
    studentCount: 12,
    // mainTeacher: { name: 'Sarah Johnson', role: 'Senior Teacher' },
    // coTeachers: [
    //   { name: 'Michael Brown', avatar: '/placeholder.svg?height=32&width=32' },
    //   { name: 'Emily Davis', avatar: '/placeholder.svg?height=32&width=32' },
    // ],
    schedule: 'Mon/Wed/Fri - 14:00–16:00',
    company: 'Global Learning Inc.',
    level: 'Beginner',
    progress: 35,
  },
  {
    id: '2',
    name: 'Business English B2',
    description: 'Professional English for corporate environments',
    status: 'Active',
    createdDate: '2023-08-22',
    studentCount: 8,
    mainTeacher: { name: 'Robert Wilson', role: 'Business English Specialist' },
    coTeachers: [
      { name: 'Jennifer Lee', avatar: '/placeholder.svg?height=32&width=32' },
    ],
    schedule: 'Tue/Thu - 18:00–20:00',
    company: 'Corporate Training Ltd.',
    level: 'Intermediate',
    progress: 68,
  },
  {
    id: '3',
    name: 'IELTS Preparation',
    description: 'Intensive course for IELTS exam preparation',
    status: 'Inactive',
    createdDate: '2023-07-10',
    studentCount: 15,
    mainTeacher: { name: 'David Thompson', role: 'IELTS Examiner' },
    coTeachers: [
      { name: 'Lisa Chen', avatar: '/placeholder.svg?height=32&width=32' },
      { name: 'Mark Taylor', avatar: '/placeholder.svg?height=32&width=32' },
    ],
    schedule: 'Mon/Wed/Sat - 10:00–12:30',
    company: 'Academic Excellence',
    level: 'Advanced',
    progress: 92,
  },
  {
    id: '4',
    name: 'Conversation Club C1',
    description: 'Practice speaking skills through discussions and debates',
    status: 'Archived',
    createdDate: '2023-05-05',
    studentCount: 10,
    mainTeacher: { name: 'Amanda Parker', role: 'Conversation Coach' },
    coTeachers: [],
    schedule: 'Fri - 17:00–19:00',
    company: 'Language Partners',
    level: 'Advanced',
    progress: 100,
  },
];

const GroupPage = () => {
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
  const filteredGroups = groups.filter((group) => {
    const matchesSearch =
      group.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      group.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      group.company.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      statusFilter === 'all' ||
      group.status.toLowerCase() === statusFilter.toLowerCase();

    return matchesSearch && matchesStatus;
  });

  // Sort groups based on sort option
  const sortedGroups = [...filteredGroups].sort((a, b) => {
    switch (sortBy) {
      case 'studentCount':
        return b.studentCount - a.studentCount;
      case 'createdDate':
        return (
          new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime()
        );
      case 'progress':
        return b.progress - a.progress;
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
                    <List className='h-4 w-4'/>
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
              {sortedGroups.map((group) => (
                <GroupCard
                  key={group.id}
                  group={group}
                  onAddStudents={() => handleAddStudents(group.id)}
                />
              ))}
            </div>
          ) : (
            <GroupTable
              groups={sortedGroups}
              onAddStudents={handleAddStudents}
            />
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

export default GroupPage;
