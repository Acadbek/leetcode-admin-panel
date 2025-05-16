'use client';

import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Check, ChevronsUpDown, Loader2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
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
import { useCreateUser } from '@/hooks/queries/useUsers';

// Base schema for shared fields
const baseSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  username: z.string().min(1, 'Username is required'),
  sendToEmail: z.string().email('Invalid email address'),
});

// Student schema extends base schema with groupId
const studentSchema = baseSchema.extend({
  role: z.literal('student'),
  groupId: z
    .number()
    .int()
    .nonnegative('Group ID must be a non-negative integer')
    .optional(),
});

// Staff schema extends base schema with groupIds array
const staffSchema = baseSchema.extend({
  role: z.literal('staff'),
  groupIds: z.array(z.number().int().nonnegative()).optional().nullable(),
});

// Combined schema using discriminated union
const formSchema = z.discriminatedUnion('role', [studentSchema, staffSchema]);

// Mock data for groups
const groups = [
  { id: 0, name: 'Group A' },
  { id: 1, name: 'Group B' },
  { id: 2, name: 'Group C' },
  { id: 3, name: 'Group D' },
  { id: 4, name: 'Group E' },
];

export function UserCreationForm({ onSubmit }) {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedGroups, setSelectedGroups] = useState([]);
  const [openGroupsPopover, setOpenGroupsPopover] = useState(false);

  const {
    mutateAsync: createUser,
    isLoading,
    isError,
    error,
    isSuccess,
    data,
  } = useCreateUser();

  // Initialize form with default values
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      role: 'student',
      firstName: '',
      lastName: '',
      username: '',
      sendToEmail: '',
      groupId: undefined,
    },
  });

  // Get current role
  const currentRole = form.watch('role');

  // Reset form fields when role changes
  const handleRoleChange = (role) => {
    // Reset form values based on the selected role
    if (role === 'student') {
      form.reset({
        ...form.getValues(),
        role: 'student',
        groupId: undefined,
      });
      setSelectedGroups([]);
    } else {
      form.reset({
        ...form.getValues(),
        role: 'staff',
        groupIds: [],
      });
    }
  };

  // Handle form submission
  const handleSubmit = async (data) => {
    setIsSubmitting(true);

    try {
      const cleanData = {
        firstName: data.firstName,
        lastName: data.lastName,
        username: data.username,
        sendToEmail: data.sendToEmail,
        ...(data.role === 'student'
          ? { groupId: data.groupId }
          : { groupIds: Array.isArray(data.groupIds) ? data.groupIds : null }),
      };
      createUser({ data: cleanData, role: currentRole });
      console.log(cleanData, currentRole);

      // Show success toast
      // toast({
      //   title: 'User created successfully',
      //   description: `${
      //     data.role.charAt(0).toUpperCase() + data.role.slice(1)
      //   } user ${data.firstName} ${data.lastName} has been created.`,
      // });

      // Reset form
      form.reset({
        role: data.role,
        firstName: '',
        lastName: '',
        username: '',
        sendToEmail: '',
        ...(data.role === 'student'
          ? { groupId: undefined }
          : { groupIds: [] || null }),
      });

      setSelectedGroups([]);
    } catch (error) {
      // Show error toast
      toast({
        title: 'Error creating user',
        description:
          error instanceof Error ? error.message : 'An unknown error occurred',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Toggle group selection for staff role
  const toggleGroup = (groupId) => {
    setSelectedGroups((current) => {
      if (current.includes(groupId)) {
        const updated = current.filter((id) => id !== groupId);
        form.setValue('groupIds', updated, { shouldValidate: true });
        return updated;
      } else {
        const updated = [...current, groupId];
        form.setValue('groupIds', updated, { shouldValidate: true });
        return updated;
      }
    });
  };

  return (
    <Card className='w-full mx-auto'>
      <CardHeader>
        <CardTitle>Create New User</CardTitle>
        <CardDescription>
          Add a new user to the system as either a student or staff member.
        </CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <CardContent className='space-y-6'>
            {/* Role Selection - Full width */}
            <div className='flex items-center justify-end gap-2'>
              <FormField
                control={form.control}
                name='role'
                render={({ field }) => (
                  <FormItem className='col-span-2'>
                    <FormLabel>User Role</FormLabel>
                    <Select
                      onValueChange={(value) => {
                        field.onChange(value);
                        handleRoleChange(value);
                      }}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder='Select a role' />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value='student'>Student</SelectItem>
                        <SelectItem value='staff'>Staff</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      The form will adapt based on the selected role.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type='submit'
                disabled={isSubmitting}
                className='w-[150px] mt-[5px]'
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className='h-4 w-4 animate-spin' />
                    Creating User...
                  </>
                ) : (
                  'Create User'
                )}
              </Button>
            </div>

            <Separator className='my-4' />

            {/* User Information - Two column grid */}
            <div className='space-y-4'>
              <h3 className='text-lg font-medium'>User Information</h3>

              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                {/* First Name */}
                <FormField
                  control={form.control}
                  name='firstName'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First Name</FormLabel>
                      <FormControl>
                        <Input placeholder='John' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Last Name */}
                <FormField
                  control={form.control}
                  name='lastName'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last Name</FormLabel>
                      <FormControl>
                        <Input placeholder='Doe' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Username */}
                <FormField
                  control={form.control}
                  name='username'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Username</FormLabel>
                      <FormControl>
                        <Input placeholder='johndoe' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Email */}
                <FormField
                  control={form.control}
                  name='sendToEmail'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          placeholder='john.doe@example.com'
                          type='email'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <Separator className='my-4' />

            {/* Role-specific fields */}
            <div className='space-y-4'>
              <h3 className='text-lg font-medium'>
                {currentRole === 'student' ? 'Student' : 'Staff'} Settings
              </h3>

              {currentRole === 'student' ? (
                <FormField
                  control={form.control}
                  name='groupId'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Group</FormLabel>
                      <Select
                        onValueChange={(value) =>
                          field.onChange(Number.parseInt(value))
                        }
                        value={field.value?.toString()}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder='Select a group' />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {groups.map((group) => (
                            <SelectItem
                              key={group.id}
                              value={group.id.toString()}
                            >
                              {group.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        The student will be assigned to this group.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ) : (
                <FormField
                  control={form.control}
                  name='groupIds'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Groups</FormLabel>
                      <Popover
                        open={openGroupsPopover}
                        onOpenChange={setOpenGroupsPopover}
                      >
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant='outline'
                              role='combobox'
                              aria-expanded={openGroupsPopover}
                              className='w-full justify-between'
                            >
                              {selectedGroups.length > 0
                                ? `${selectedGroups.length} group${
                                    selectedGroups.length > 1 ? 's' : ''
                                  } selected`
                                : 'Select groups'}
                              <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className='w-full p-0'>
                          <Command>
                            <CommandInput placeholder='Search groups...' />
                            <CommandList>
                              <CommandEmpty>No group found.</CommandEmpty>
                              <CommandGroup>
                                {groups.map((group) => (
                                  <CommandItem
                                    key={group.id}
                                    value={group.name}
                                    onSelect={() => toggleGroup(group.id)}
                                  >
                                    <Check
                                      className={cn(
                                        'mr-2 h-4 w-4',
                                        selectedGroups.includes(group.id)
                                          ? 'opacity-100'
                                          : 'opacity-0'
                                      )}
                                    />
                                    {group.name}
                                  </CommandItem>
                                ))}
                              </CommandGroup>
                            </CommandList>
                          </Command>
                        </PopoverContent>
                      </Popover>
                      <FormDescription>
                        The staff member will be assigned to these groups.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
            </div>
          </CardContent>
        </form>
      </Form>
    </Card>
  );
}
