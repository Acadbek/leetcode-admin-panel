import { Calendar, Edit, ExternalLink, Users } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export function GroupCard({ group, onAddStudents }) {
  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'active':
        return 'bg-green-100 text-green-800 hover:bg-green-200';
      case 'inactive':
        return 'bg-amber-100 text-amber-800 hover:bg-amber-200';
      case 'archived':
        return 'bg-gray-100 text-gray-800 hover:bg-gray-200';
      default:
        return 'bg-blue-100 text-blue-800 hover:bg-blue-200';
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }).format(date);
  };

  return (
    <Card className='overflow-hidden flex flex-col justify-between transition-all hover:shadow-md'>
      <CardHeader className='pb-2'>
        <div className='flex items-start justify-between'>
          <div className='space-y-1'>
            <h3 className='font-semibold leading-none tracking-tight'>
              {group?.name}
            </h3>
            <p className='text-sm text-muted-foreground'>
              {group?.description}
            </p>
          </div>
          <Badge className={getStatusColor(group?.status)}>
            {group?.status}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className='pb-2'>
        <div className='space-y-4'>
          <div className='grid grid-cols-2 gap-2 text-sm'>
            <div className='flex items-center gap-1'>
              <Calendar className='h-4 w-4 text-muted-foreground' />
              <span>{formatDate(group?.createdDate)}</span>
            </div>
            <div className='flex items-center gap-1'>
              <Users className='h-4 w-4 text-muted-foreground' />
              <span>{group?.studentCount} students</span>
            </div>
          </div>

          <div className='space-y-2'>
            <div className='flex flex-col'>
              <span className='text-xs text-muted-foreground'>
                Main Teacher
              </span>
              <span className='text-sm font-medium'>
                {group?.mainTeacher?.name}
              </span>
              <span className='text-xs text-muted-foreground'>
                {group?.mainTeacher?.role}
              </span>
            </div>

            {group?.coTeachers?.length > 0 && (
              <div className='flex flex-col'>
                <span className='text-xs text-muted-foreground'>
                  Co-Teachers
                </span>
                <div className='flex -space-x-2'>
                  {group?.coTeachers?.map((teacher, index) => (
                    <Avatar
                      key={index}
                      className='h-6 w-6 border-2 border-background'
                    >
                      <AvatarImage
                        src={teacher?.avatar || '/placeholder.svg'}
                        alt={teacher?.name}
                      />
                      <AvatarFallback>{teacher?.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                  ))}
                </div>
              </div>
            )}

            <div className='flex flex-col'>
              <span className='text-xs text-muted-foreground'>Schedule</span>
              <span className='text-sm'>{group?.schedule}</span>
            </div>

            <div className='flex flex-col'>
              <span className='text-xs text-muted-foreground'>Company</span>
              <span className='text-sm'>{group?.company}</span>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className='flex justify-between gap-2 pt-2'>
        <Button variant='outline' size='sm' className='flex-1'>
          <ExternalLink className='mr-1 h-3.5 w-3.5' />
          View
        </Button>
        <Button variant='outline' size='sm' className='flex-1'>
          <Edit className='mr-1 h-3.5 w-3.5' />
          Edit
        </Button>
        <Button size='sm' className='flex-1' onClick={onAddStudents}>
          <Users className='mr-1 h-3.5 w-3.5' />
          Add
        </Button>
      </CardFooter>
    </Card>
  );
}
