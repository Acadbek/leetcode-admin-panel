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
// Bu yerda useCreateUser o'rniga, ikkalasini ham ishlatamiz
import { useCreateStaff, useCreateStudent } from '@/hooks/queries/useUsers';

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
    .optional() // `optional()` bo'lsa ham, ba'zan server tarafda majburiy bo'lishi mumkin. Shunga qarab to'g'irlang.
    .nullable(), // Agar null bo'lishi mumkin bo'lsa
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

export function UserCreationForm() { // onSubmit propini olib tashladik, chunki u ichida boshqariladi
  const { toast } = useToast();
  // isSubmitting state'ini o'rniga isLoading dan foydalanamiz
  // const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedGroups, setSelectedGroups] = useState([]);
  const [openGroupsPopover, setOpenGroupsPopover] = useState(false);

  // Ikki xil hook'ni chaqiramiz
  const { mutateAsync: createStudent, isLoading: isCreatingStudent } = useCreateStudent();
  const { mutateAsync: createStaff, isLoading: isCreatingStaff } = useCreateStaff();

  // Umumiy yuklanish holati
  const isSubmitting = isCreatingStudent || isCreatingStaff;

  // Formani default qiymatlar bilan ishga tushirish
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      role: 'student',
      firstName: '',
      lastName: '',
      username: '',
      sendToEmail: '',
      groupId: undefined, // undefined bo'lishi kerak, null emas, chunki optional
      groupIds: [], // Massiv bo'lishi kerak
    },
  });

  // Joriy rolni kuzatish
  const currentRole = form.watch('role');

  // Rol o'zgarganda form maydonlarini qayta tiklash
  const handleRoleChange = (role) => {
    if (role === 'student') {
      form.reset({
        ...form.getValues(), // Mavjud qadriyatlarni saqlaymiz
        role: 'student',
        groupId: undefined, // Student uchun groupId undefined bo'ladi
        groupIds: [], // Staff uchun groupIds ni tozalaymiz
      });
      setSelectedGroups([]); // Tanlangan guruhlarni tozalaymiz
    } else {
      form.reset({
        ...form.getValues(),
        role: 'staff',
        groupId: undefined, // Student uchun groupId ni tozalaymiz
        groupIds: [], // Staff uchun groupIds ni bo'sh massivga o'rnatamiz
      });
      setSelectedGroups([]);
    }
  };

  // Formani yuborishni boshqarish
  const onSubmit = async (data) => {
    try {
      if (data.role === 'student') {
        const studentData = {
          firstName: data.firstName,
          lastName: data.lastName,
          username: data.username,
          sendToEmail: data.sendToEmail,
          groupId: data.groupId,
        };
        await createStudent(studentData); // Student yaratish hook'ini chaqiramiz
        toast({
          title: 'Student created successfully',
          description: `Student ${data.firstName} ${data.lastName} has been created.`,
        });
      } else { // currentRole === 'staff'
        const staffData = {
          firstName: data.firstName,
          lastName: data.lastName,
          username: data.username,
          sendToEmail: data.sendToEmail,
          // groupIds Array.isArray(data.groupIds) bo'lishini zod tekshiradi.
          // Agar tanlanmagan bo'lsa, z.array().optional().nullable() ga ko'ra [] yoki null bo'lishi mumkin.
          // Agar null bo'lsa server tarafida qabul qilishga e'tibor bering.
          groupIds: data.groupIds,
        };
        await createStaff(staffData); // Staff yaratish hook'ini chaqiramiz
        toast({
          title: 'Staff created successfully',
          description: `Staff member ${data.firstName} ${data.lastName} has been created.`,
        });
      }

      // Muvaffaqiyatli bo'lgandan keyin formani qayta tiklash
      form.reset({
        role: currentRole, // Rolni saqlab qolamiz
        firstName: '',
        lastName: '',
        username: '',
        sendToEmail: '',
        groupId: undefined,
        groupIds: [],
      });
      setSelectedGroups([]); // Tanlangan guruhlarni tozalaymiz

    } catch (error) {
      console.error("User creation failed:", error); // Xatoni konsolda ko'rsatish
      toast({
        title: 'Error creating user',
        // Serverdan kelgan aniqroq xabarni ko'rsatishga harakat qiling
        description: error.response?.data?.message || 'An unknown error occurred',
        variant: 'destructive',
      });
    }
  };

  // Staff roli uchun guruh tanlashni boshqarish
  const toggleGroup = (groupId) => {
    setSelectedGroups((current) => {
      const updated = current.includes(groupId)
        ? current.filter((id) => id !== groupId)
        : [...current, groupId];
      form.setValue('groupIds', updated, { shouldValidate: true }); // form.setValue orqali yangilash
      return updated;
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
        <form onSubmit={form.handleSubmit(onSubmit)}>
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
                      value={field.value} // `defaultValue` o'rniga `value` ishlatamiz
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
                disabled={isSubmitting} // isSubmitting ni ishlatamiz
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
                        value={field.value?.toString() || ''} // Agar undefined bo'lsa, bo'sh string qaytarish
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
                                ? `${selectedGroups.length} group${selectedGroups.length > 1 ? 's' : ''
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