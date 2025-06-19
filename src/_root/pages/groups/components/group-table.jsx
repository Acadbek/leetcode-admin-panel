import {
  Calendar,
  Edit,
  ExternalLink,
  MoreHorizontal,
  Users,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export function GroupTable({ groups, onAddStudents }) {
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';

    const date = new Date(dateString);
    if (isNaN(date.getTime())) return 'N/A';

    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }).format(date);
  };

  return (
    <div className='rounded-md border'>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className='w-[250px]'>Group</TableHead>
            <TableHead className='hidden lg:table-cell'>Created</TableHead>
            <TableHead>Students</TableHead>
            <TableHead className='hidden xl:table-cell'>Teachers</TableHead>
            <TableHead className='hidden lg:table-cell'>Schedule</TableHead>
            <TableHead className='hidden md:table-cell'>Company</TableHead>
            <TableHead className='text-right'>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {groups.map((group) => (
            <TableRow key={group.id} className='group'>
              <TableCell className='font-medium'>
                <div>
                  <div title={group.name} className='line-clamp-1'>{group.name}</div>
                  <div title={group.description} className='text-xs text-muted-foreground line-clamp-1'>
                    {group.description}
                  </div>
                </div>
              </TableCell>
              <TableCell className='hidden lg:table-cell'>
                <div className='flex items-center gap-1'>
                  <Calendar className='h-4 w-4 text-muted-foreground' />
                  <span>{formatDate(group?.createdAt)}</span>
                </div>
              </TableCell>
              <TableCell>
                <div className='flex items-center gap-1'>
                  <Users className='h-4 w-4 text-muted-foreground' />
                  <span>{group?.studentCount}</span>
                </div>
              </TableCell>
              <TableCell className='hidden xl:table-cell'>
                <div className='flex flex-col'>
                  {group?.mainTeacher?.name && (
                    <span className='text-xs font-medium'>
                      {group?.mainTeacher?.name}
                    </span>
                  )}
                  {group?.coTeachers?.length > 0 && (
                    <div className='flex -space-x-2 pt-1'>
                      {group?.coTeachers?.map((teacher, index) => (
                        <Avatar
                          key={index}
                          className='h-6 w-6 border-2 border-background'
                        >
                          <AvatarImage
                            src={teacher?.avatar || '/placeholder.svg'}
                            alt={teacher?.name}
                          />
                          <AvatarFallback>
                            {teacher?.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                      ))}
                    </div>
                  )}
                </div>
              </TableCell>
              <TableCell className='hidden lg:table-cell'>
                <span className='text-sm'>{group?.schedule}</span>
              </TableCell>
              <TableCell className='hidden md:table-cell'>
                <span className='text-sm'>{group?.company}</span>
              </TableCell>
              <TableCell className='text-right'>
                <div className='flex justify-end gap-2'>
                  <div className='hidden sm:flex gap-1'>
                    <Button variant='ghost' size='icon' className='h-8 w-8'>
                      <ExternalLink className='h-4 w-4' />
                      <span className='sr-only'>View</span>
                    </Button>
                    <Button variant='ghost' size='icon' className='h-8 w-8'>
                      <Edit className='h-4 w-4' />
                      <span className='sr-only'>Edit</span>
                    </Button>
                    <Button
                      variant='ghost'
                      size='icon'
                      className='h-8 w-8'
                      onClick={() => onAddStudents(group?.id)}
                    >
                      <Users className='h-4 w-4' />
                      <span className='sr-only'>Add Students</span>
                    </Button>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant='ghost'
                        size='icon'
                        className='h-8 w-8 sm:hidden'
                      >
                        <MoreHorizontal className='h-4 w-4' />
                        <span className='sr-only'>Open menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align='end'>
                      <DropdownMenuItem
                        onClick={() => window.alert(`View ${group?.name}`)}
                      >
                        <ExternalLink className='mr-2 h-4 w-4' />
                        <span>View</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => window.alert(`Edit ${group?.name}`)}
                      >
                        <Edit className='mr-2 h-4 w-4' />
                        <span>Edit</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => onAddStudents(group?.id)}
                      >
                        <Users className='mr-2 h-4 w-4' />
                        <span>Add Students</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
