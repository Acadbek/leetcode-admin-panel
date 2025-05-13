'use client';

import { useState } from 'react';
// import { useRouter } from 'next/navigation';
import { useNavigate } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { CalendarIcon, Check, ChevronsUpDown, X } from 'lucide-react';
import { format } from 'date-fns';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
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
import { Calendar } from '@/components/ui/calendar';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { useCreateGroups } from '@/hooks/queries/useGroups';

// Sample teacher data
const teachers = [
  {
    id: '1',
    name: 'Sarah Johnson',
    role: 'Senior Teacher',
    avatar: '/placeholder.svg?height=40&width=40',
  },
  {
    id: '2',
    name: 'Michael Brown',
    role: 'English Teacher',
    avatar: '/placeholder.svg?height=40&width=40',
  },
  {
    id: '3',
    name: 'Emily Davis',
    role: 'ESL Specialist',
    avatar: '/placeholder.svg?height=40&width=40',
  },
  {
    id: '4',
    name: 'Robert Wilson',
    role: 'Business English Specialist',
    avatar: '/placeholder.svg?height=40&width=40',
  },
  {
    id: '5',
    name: 'Jennifer Lee',
    role: 'Language Coach',
    avatar: '/placeholder.svg?height=40&width=40',
  },
  {
    id: '6',
    name: 'David Thompson',
    role: 'IELTS Examiner',
    avatar: '/placeholder.svg?height=40&width=40',
  },
  {
    id: '7',
    name: 'Lisa Chen',
    role: 'Conversation Coach',
    avatar: '/placeholder.svg?height=40&width=40',
  },
  {
    id: '8',
    name: 'Mark Taylor',
    role: 'Grammar Specialist',
    avatar: '/placeholder.svg?height=40&width=40',
  },
  {
    id: '9',
    name: 'Amanda Parker',
    role: 'Pronunciation Expert',
    avatar: '/placeholder.svg?height=40&width=40',
  },
];

// Form schema with validation
const formSchema = z.object({
  title: z.string().min(3, 'Group title must be at least 3 characters long'),
  status: z.string().min(1, 'Status is required'),
  description: z.string().optional(),
  createdAt: z.date(),
  studentCount: z.coerce.number().min(0, 'Student count must be at least 0'),
  mainTeacher: z.string().optional(),
  mainTeacherRole: z.string().optional(),
  coTeachers: z.array(z.string()).optional(),
});

export default function CreateGroupPage() {
  const { mutate: createGroup } = useCreateGroups();

  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedCoTeachers, setSelectedCoTeachers] = useState([]);
  const [openCoTeachers, setOpenCoTeachers] = useState(false);

  // Initialize form with default values
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      status: 'Active',
      description: '',
      createdAt: new Date(),
      studentCount: 0,
      mainTeacher: '',
      mainTeacherRole: '',
      coTeachers: [],
    },
  });

  // Watch for main teacher changes to update the role field
  const mainTeacherId = form.watch('mainTeacher');
  const mainTeacher = teachers.find((teacher) => teacher.id === mainTeacherId);

  // Update the main teacher role when the main teacher changes
  if (mainTeacher && form.getValues('mainTeacherRole') !== mainTeacher.role) {
    form.setValue('mainTeacherRole', mainTeacher.role);
  }

  // Handle form submission
  const onSubmit = (data) => {
    console.log('Form submitted:', data);
    createGroup(data);
    if (isSuccess) {
      toast({
        title: 'Group information submitted',
        description: 'Group data has been successfully saved.',
      });
    }
    if (isError) {
      toast({
        title: 'Error',
        description: error?.message,
      });
    }
    // Show success toast
    toast({
      title: 'Group created successfully',
      description: `Group "${data.title}" has been created.`,
    });

    // Redirect to groups list
    setTimeout(() => {
      navigate('/groups');
    }, 1000);
  };

  // Handle cancel button
  const handleCancel = () => {
    navigate('/groups');
  };

  return (
    <div className=''>
      <div className='mx-auto border-none'>
        <div className='px-4 mb-6'>
          <p className='text-2xl font-semibold tracking-tight'>Create Group</p>
          <p className='text-muted-foreground text-sm'>
            Create a new group for students and teachers.
          </p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className='px-4'>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6'>
                {/* Left Column */}
                <div className='space-y-6'>
                  {/* Group Title */}
                  <FormField
                    control={form.control}
                    name='title'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Group Title{' '}
                          <span className='text-destructive'>*</span>
                        </FormLabel>
                        <FormControl>
                          <Input placeholder='Enter group title' {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Status */}
                  <FormField
                    control={form.control}
                    name='status'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Status <span className='text-destructive'>*</span>
                        </FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder='Select status' />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value='Active'>Active</SelectItem>
                            <SelectItem value='Inactive'>Inactive</SelectItem>
                            <SelectItem value='Archived'>Archived</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Description */}
                  <FormField
                    control={form.control}
                    name='description'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder='Enter group description'
                            className='min-h-[120px]'
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          Optional: Provide a brief description of the group.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Created At */}
                  <FormField
                    control={form.control}
                    name='createdAt'
                    render={({ field }) => (
                      <FormItem className='flex flex-col'>
                        <FormLabel>Created At</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={'outline'}
                                className={cn(
                                  'w-full pl-3 text-left font-normal',
                                  !field.value && 'text-muted-foreground'
                                )}
                                disabled
                              >
                                {field.value ? (
                                  format(field.value, 'PPP')
                                ) : (
                                  <span>Pick a date</span>
                                )}
                                <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className='w-auto p-0' align='start'>
                            <Calendar
                              mode='single'
                              selected={field.value}
                              onSelect={field.onChange}
                              disabled
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                        <FormDescription>
                          Auto-filled with current date.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Right Column */}
                <div className='space-y-6'>
                  {/* Student Count */}
                  <FormField
                    control={form.control}
                    name='studentCount'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Student Count</FormLabel>
                        <FormControl>
                          <Input
                            type='number'
                            min={0}
                            {...field}
                            onChange={(e) => {
                              const value = Number.parseInt(e.target.value);
                              if (isNaN(value)) {
                                field.onChange(0);
                              } else {
                                field.onChange(Math.max(0, value));
                              }
                            }}
                          />
                        </FormControl>
                        <FormDescription>
                          Initial number of students in the group.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Main Teacher */}
                  <FormField
                    control={form.control}
                    name='mainTeacher'
                    render={({ field }) => (
                      <FormItem className='flex flex-col'>
                        <FormLabel>Main Teacher</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant='outline'
                                role='combobox'
                                className={cn(
                                  'w-full justify-between',
                                  !field.value && 'text-muted-foreground'
                                )}
                              >
                                {field.value
                                  ? teachers.find(
                                      (teacher) => teacher.id === field.value
                                    )?.name
                                  : 'Select main teacher'}
                                <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className='w-[400px] p-0'>
                            <Command>
                              <CommandInput placeholder='Search teachers...' />
                              <CommandList>
                                <CommandEmpty>No teacher found.</CommandEmpty>
                                <CommandGroup>
                                  <ScrollArea className='h-[200px]'>
                                    {teachers.map((teacher) => (
                                      <CommandItem
                                        key={teacher.id}
                                        value={teacher.id}
                                        onSelect={() => {
                                          form.setValue(
                                            'mainTeacher',
                                            teacher.id
                                          );
                                          form.setValue(
                                            'mainTeacherRole',
                                            teacher.role
                                          );
                                        }}
                                      >
                                        <div className='flex items-center gap-2'>
                                          <Avatar className='h-8 w-8'>
                                            <AvatarImage
                                              src={
                                                teacher.avatar ||
                                                '/placeholder.svg'
                                              }
                                              alt={teacher.name}
                                            />
                                            <AvatarFallback>
                                              {teacher.name.charAt(0)}
                                            </AvatarFallback>
                                          </Avatar>
                                          <div className='flex flex-col'>
                                            <span>{teacher.name}</span>
                                            <span className='text-xs text-muted-foreground'>
                                              {teacher.role}
                                            </span>
                                          </div>
                                        </div>
                                        <Check
                                          className={cn(
                                            'ml-auto h-4 w-4',
                                            field.value === teacher.id
                                              ? 'opacity-100'
                                              : 'opacity-0'
                                          )}
                                        />
                                      </CommandItem>
                                    ))}
                                  </ScrollArea>
                                </CommandGroup>
                              </CommandList>
                            </Command>
                          </PopoverContent>
                        </Popover>
                        <FormDescription>
                          Optional: Select the main teacher for this group.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Main Teacher Role */}
                  <FormField
                    control={form.control}
                    name='mainTeacherRole'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Main Teacher Role</FormLabel>
                        <FormControl>
                          <Input
                            placeholder='Role will be auto-filled when teacher is selected'
                            {...field}
                            disabled={!!mainTeacherId}
                          />
                        </FormControl>
                        <FormDescription>
                          Auto-filled when a main teacher is selected.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Co-Teachers */}
                  <FormField
                    control={form.control}
                    name='coTeachers'
                    render={({ field }) => (
                      <FormItem className='flex flex-col'>
                        <FormLabel>Co-Teachers</FormLabel>
                        <Popover
                          open={openCoTeachers}
                          onOpenChange={setOpenCoTeachers}
                        >
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant='outline'
                                role='combobox'
                                className={cn(
                                  'w-full justify-between',
                                  !field.value?.length &&
                                    'text-muted-foreground'
                                )}
                                onClick={() =>
                                  setOpenCoTeachers(!openCoTeachers)
                                }
                              >
                                {field.value?.length
                                  ? `${field.value.length} teacher${
                                      field.value.length > 1 ? 's' : ''
                                    } selected`
                                  : 'Select co-teachers'}
                                <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className='w-[400px] p-0'>
                            <Command>
                              <CommandInput placeholder='Search teachers...' />
                              <CommandList>
                                <CommandEmpty>No teacher found.</CommandEmpty>
                                <CommandGroup>
                                  <ScrollArea className='h-[200px]'>
                                    {teachers
                                      .filter(
                                        (teacher) =>
                                          teacher.id !== mainTeacherId
                                      )
                                      .map((teacher) => (
                                        <CommandItem
                                          key={teacher.id}
                                          value={teacher.id}
                                          onSelect={() => {
                                            const updatedTeachers =
                                              field.value?.includes(teacher.id)
                                                ? field.value.filter(
                                                    (id) => id !== teacher.id
                                                  )
                                                : [
                                                    ...(field.value || []),
                                                    teacher.id,
                                                  ];

                                            form.setValue(
                                              'coTeachers',
                                              updatedTeachers
                                            );
                                            setSelectedCoTeachers(
                                              updatedTeachers
                                            );
                                          }}
                                        >
                                          <div className='flex items-center gap-2'>
                                            <Avatar className='h-8 w-8'>
                                              <AvatarImage
                                                src={
                                                  teacher.avatar ||
                                                  '/placeholder.svg'
                                                }
                                                alt={teacher.name}
                                              />
                                              <AvatarFallback>
                                                {teacher.name.charAt(0)}
                                              </AvatarFallback>
                                            </Avatar>
                                            <div className='flex flex-col'>
                                              <span>{teacher.name}</span>
                                              <span className='text-xs text-muted-foreground'>
                                                {teacher.role}
                                              </span>
                                            </div>
                                          </div>
                                          <Check
                                            className={cn(
                                              'ml-auto h-4 w-4',
                                              field.value?.includes(teacher.id)
                                                ? 'opacity-100'
                                                : 'opacity-0'
                                            )}
                                          />
                                        </CommandItem>
                                      ))}
                                  </ScrollArea>
                                </CommandGroup>
                              </CommandList>
                            </Command>
                          </PopoverContent>
                        </Popover>

                        {field.value && field.value.length > 0 && (
                          <div className='flex flex-wrap gap-1 mt-2'>
                            {field.value.map((teacherId) => {
                              const teacher = teachers.find(
                                (t) => t.id === teacherId
                              );
                              if (!teacher) return null;

                              return (
                                <Badge
                                  key={teacherId}
                                  variant='secondary'
                                  className='flex items-center gap-1 py-1 px-2'
                                >
                                  <Avatar className='h-5 w-5 mr-1'>
                                    <AvatarImage
                                      src={teacher.avatar || '/placeholder.svg'}
                                      alt={teacher.name}
                                    />
                                    <AvatarFallback>
                                      {teacher.name.charAt(0)}
                                    </AvatarFallback>
                                  </Avatar>
                                  {teacher.name}
                                  <Button
                                    variant='ghost'
                                    size='icon'
                                    className='h-4 w-4 ml-1 p-0 text-muted-foreground hover:text-foreground'
                                    onClick={() => {
                                      const updatedTeachers =
                                        field.value?.filter(
                                          (id) => id !== teacherId
                                        ) || [];
                                      form.setValue(
                                        'coTeachers',
                                        updatedTeachers
                                      );
                                      setSelectedCoTeachers(updatedTeachers);
                                    }}
                                  >
                                    <X className='h-3 w-3' />
                                    <span className='sr-only'>Remove</span>
                                  </Button>
                                </Badge>
                              );
                            })}
                          </div>
                        )}

                        <FormDescription>
                          Optional: Select co-teachers for this group.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </div>
            <div className='flex justify-between pt-6 border-t px-4 mt-6'>
              <Button type='submit'>Create Group</Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
