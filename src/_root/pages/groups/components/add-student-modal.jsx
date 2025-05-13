import { useState } from 'react';
import { Check, ChevronsUpDown, Search, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';

// Sample student data
const students = [
  {
    id: '1',
    name: 'Alex Johnson',
    email: 'alex.j@example.com',
    level: 'Intermediate',
  },
  {
    id: '2',
    name: 'Maria Garcia',
    email: 'maria.g@example.com',
    level: 'Beginner',
  },
  {
    id: '3',
    name: 'James Smith',
    email: 'james.s@example.com',
    level: 'Advanced',
  },
  {
    id: '4',
    name: 'Emma Wilson',
    email: 'emma.w@example.com',
    level: 'Intermediate',
  },
  {
    id: '5',
    name: 'Liam Brown',
    email: 'liam.b@example.com',
    level: 'Beginner',
  },
  {
    id: '6',
    name: 'Olivia Davis',
    email: 'olivia.d@example.com',
    level: 'Advanced',
  },
  {
    id: '7',
    name: 'Noah Miller',
    email: 'noah.m@example.com',
    level: 'Intermediate',
  },
  {
    id: '8',
    name: 'Sophia Martinez',
    email: 'sophia.m@example.com',
    level: 'Beginner',
  },
  {
    id: '9',
    name: 'William Anderson',
    email: 'william.a@example.com',
    level: 'Advanced',
  },
  {
    id: '10',
    name: 'Isabella Thomas',
    email: 'isabella.t@example.com',
    level: 'Intermediate',
  },
  {
    id: '11',
    name: 'Benjamin Jackson',
    email: 'benjamin.j@example.com',
    level: 'Beginner',
  },
  {
    id: '12',
    name: 'Charlotte White',
    email: 'charlotte.w@example.com',
    level: 'Advanced',
  },
  {
    id: '13',
    name: 'Lucas Harris',
    email: 'lucas.h@example.com',
    level: 'Intermediate',
  },
  {
    id: '14',
    name: 'Mia Martin',
    email: 'mia.m@example.com',
    level: 'Beginner',
  },
  {
    id: '15',
    name: 'Henry Thompson',
    email: 'henry.t@example.com',
    level: 'Advanced',
  },
];

export function AddStudentsModal({ isOpen, onClose, groupId }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [open, setOpen] = useState(false);

  const filteredStudents = students.filter(
    (student) =>
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.level.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelectStudent = (studentId) => {
    setSelectedStudents((prev) =>
      prev.includes(studentId)
        ? prev.filter((id) => id !== studentId)
        : [...prev, studentId]
    );
  };

  const handleSelectAll = () => {
    if (selectedStudents.length === filteredStudents.length) {
      setSelectedStudents([]);
    } else {
      setSelectedStudents(filteredStudents.map((student) => student.id));
    }
  };

  const handleSubmit = () => {
    // Here you would typically send the selected students to your API
    console.log(
      `Adding ${selectedStudents.length} students to group ${groupId}`
    );
    console.log('Selected student IDs:', selectedStudents);

    // Close the modal and reset state
    onClose();
    setSelectedStudents([]);
    setSearchQuery('');
  };

  const handleClose = () => {
    onClose();
    setSelectedStudents([]);
    setSearchQuery('');
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className='sm:max-w-[500px]'>
        <DialogHeader>
          <DialogTitle>Add Students to Group</DialogTitle>
          <DialogDescription>
            Select students to add to this group. You can select multiple
            students.
          </DialogDescription>
        </DialogHeader>

        <div className='flex flex-col gap-4 py-4'>
          {/* Search and filter */}
          <div className='flex items-center gap-2'>
            <div className='relative flex-1'>
              <Search className='absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground' />
              <Input
                type='search'
                placeholder='Search students...'
                className='pl-8'
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant='outline'
                  role='combobox'
                  aria-expanded={open}
                  className='w-[130px] justify-between'
                >
                  {selectedStudents.length > 0
                    ? `${selectedStudents.length} selected`
                    : 'Select...'}
                  <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
                </Button>
              </PopoverTrigger>
              <PopoverContent className='w-[200px] p-0'>
                <Command>
                  <CommandInput placeholder='Search level...' />
                  <CommandList>
                    <CommandEmpty>No level found.</CommandEmpty>
                    <CommandGroup>
                      <CommandItem
                        onSelect={() => {
                          handleSelectAll();
                          setOpen(false);
                        }}
                      >
                        <div
                          className={cn(
                            'mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary',
                            selectedStudents.length === filteredStudents.length
                              ? 'bg-primary text-primary-foreground'
                              : 'opacity-50 [&_svg]:invisible'
                          )}
                        >
                          <Check className={cn('h-4 w-4')} />
                        </div>
                        <span>Select all</span>
                      </CommandItem>
                      <CommandItem
                        onSelect={() => {
                          setSelectedStudents([]);
                          setOpen(false);
                        }}
                      >
                        <div
                          className={cn(
                            'mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary',
                            selectedStudents.length === 0
                              ? 'bg-primary text-primary-foreground'
                              : 'opacity-50 [&_svg]:invisible'
                          )}
                        >
                          <Check className={cn('h-4 w-4')} />
                        </div>
                        <span>Clear selection</span>
                      </CommandItem>
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </div>

          {/* Student list */}
          <ScrollArea className='h-[300px] rounded-md border'>
            <div className='p-4'>
              {filteredStudents.length === 0 ? (
                <div className='flex h-32 flex-col items-center justify-center text-center'>
                  <p className='text-sm text-muted-foreground'>
                    No students found
                  </p>
                  <Button
                    variant='link'
                    className='mt-2 h-auto p-0'
                    onClick={() => setSearchQuery('')}
                  >
                    Clear search
                  </Button>
                </div>
              ) : (
                <div className='space-y-2'>
                  {filteredStudents.map((student) => (
                    <div
                      key={student.id}
                      className='flex items-center space-x-2 rounded-md border p-2 transition-colors hover:bg-muted'
                    >
                      <Checkbox
                        id={`student-${student.id}`}
                        checked={selectedStudents.includes(student.id)}
                        onCheckedChange={() => handleSelectStudent(student.id)}
                      />
                      <div className='flex-1 space-y-1'>
                        <div className='flex items-center'>
                          <label
                            htmlFor={`student-${student.id}`}
                            className='flex-1 cursor-pointer font-medium'
                          >
                            {student.name}
                          </label>
                          <span className='text-xs text-muted-foreground'>
                            {student.level}
                          </span>
                        </div>
                        <p className='text-xs text-muted-foreground'>
                          {student.email}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </ScrollArea>
        </div>

        <DialogFooter className='flex items-center justify-between sm:justify-between'>
          <div className='text-sm text-muted-foreground'>
            {selectedStudents.length} students selected
          </div>
          <div className='flex gap-2'>
            <Button variant='outline' onClick={handleClose}>
              <X className='mr-2 h-4 w-4' />
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={selectedStudents.length === 0}
            >
              <Check className='mr-2 h-4 w-4' />
              Add to Group
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
