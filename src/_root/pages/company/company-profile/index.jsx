'use client';

import React, { useState } from 'react';
import {
  Activity,
  AlertCircle,
  Building,
  Building2,
  Calendar,
  Check,
  Clock,
  Code2,
  Eye,
  Lock,
  LogOut,
  Mail,
  Map,
  Phone,
  Plus,
  Shield,
  User,
  UserX,
  X,
} from 'lucide-react';
import { format } from 'date-fns';
import { useGetCompany } from '@/hooks/queries/useCompany';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { AreaChart, BarChart } from '@/components/user-profile-chart';
import { useNavigate, useParams } from 'react-router-dom';
import { useLoading } from '@/context/loading-state';
import { useGetGroupsWithCompanyId } from '@/hooks/queries/useGroups';
import { parsePhoneNumber } from 'awesome-phonenumber';
import { Skeleton } from '@/components/ui/skeleton';

export default function CompanyProfilePage() {
  const [activeTab, setActiveTab] = useState('daily');
  const navigate = useNavigate();
  const { run, stop } = useLoading();
  const { id: companyId } = useParams();

  const {
    data: groups,
    isLoading: isLoadingGroups,
    isError: isErrorGroups,
  } = useGetGroupsWithCompanyId(companyId);

  React.useEffect(() => {
    run();
    const timer = setTimeout(() => {
      stop();
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  // Sample data for the charts
  const dailyData = [
    { name: 'Mon', value: 5 },
    { name: 'Tue', value: 8 },
    { name: 'Wed', value: 3 },
    { name: 'Thu', value: 7 },
    { name: 'Fri', value: 9 },
    { name: 'Sat', value: 2 },
    { name: 'Sun', value: 4 },
  ];

  const weeklyData = [
    { name: 'Week 1', value: 25 },
    { name: 'Week 2', value: 18 },
    { name: 'Week 3', value: 30 },
    { name: 'Week 4', value: 22 },
  ];

  const monthlyData = [
    { name: 'Jan', value: 80 },
    { name: 'Feb', value: 65 },
    { name: 'Mar', value: 95 },
    { name: 'Apr', value: 70 },
    { name: 'May', value: 85 },
    { name: 'Jun', value: 60 },
  ];

  const groupData = [
    {
      name: 'Group 1',
      users: 10,
      createdAt: '2023-10-15',
      mainTeacher: 'John Doe',
      coTeachers: ['Jane Smith', 'Alice Johnson'],
    },
    {
      name: 'Group 2',
      users: 15,
      createdAt: '2023-10-12',
      mainTeacher: 'Jane Smith',
      coTeachers: ['Alice Johnson'],
    },
    {
      name: 'Group 3',
      users: 20,
      createdAt: '2023-10-08',
      mainTeacher: 'John Doe',
      coTeachers: ['Alice Johnson'],
    },
    {
      name: 'Group 4',
      users: 25,
      createdAt: '2023-10-05',
      mainTeacher: 'Jane Smith',
      coTeachers: ['Alice Johnson'],
    },
    {
      name: 'Group 5',
      users: 30,
      createdAt: '2023-10-01',
      mainTeacher: 'John Doe',
      coTeachers: ['Alice Johnson'],
    },
  ];

  // Sample data for problem history
  const problemHistory = [
    {
      name: 'Two Sum',
      difficulty: 'Easy',
      dateSolved: '2023-10-15',
      attempts: 1,
      solutionLink: '#',
    },
    {
      name: 'Merge Intervals',
      difficulty: 'Medium',
      dateSolved: '2023-10-12',
      attempts: 3,
      solutionLink: '#',
    },
    {
      name: 'LRU Cache',
      difficulty: 'Hard',
      dateSolved: '2023-10-08',
      attempts: 5,
      solutionLink: '#',
    },
    {
      name: 'Valid Parentheses',
      difficulty: 'Easy',
      dateSolved: '2023-10-05',
      attempts: 1,
      solutionLink: '#',
    },
    {
      name: 'Merge K Sorted Lists',
      difficulty: 'Hard',
      dateSolved: '2023-10-01',
      attempts: 4,
      solutionLink: '#',
    },
  ];

  // Sample data for submissions
  const submissions = [
    {
      problem: 'Two Sum',
      language: 'JavaScript',
      result: 'Accepted',
      submittedAt: '2023-10-15T14:30:00',
      codeLink: '#',
    },
    {
      problem: 'Merge Intervals',
      language: 'Python',
      result: 'Wrong Answer',
      submittedAt: '2023-10-12T10:15:00',
      codeLink: '#',
    },
    {
      problem: 'Merge Intervals',
      language: 'Python',
      result: 'Time Limit',
      submittedAt: '2023-10-12T11:20:00',
      codeLink: '#',
    },
    {
      problem: 'Merge Intervals',
      language: 'Python',
      result: 'Accepted',
      submittedAt: '2023-10-12T13:45:00',
      codeLink: '#',
    },
    {
      problem: 'LRU Cache',
      language: 'Java',
      result: 'Compilation Error',
      submittedAt: '2023-10-08T09:10:00',
      codeLink: '#',
    },
  ];

  const getResultBadge = (result) => {
    switch (result) {
      case 'Accepted':
        return (
          <Badge className='bg-green-100 text-green-800 hover:bg-green-100'>
            <Check className='mr-1 h-3 w-3' /> {result}
          </Badge>
        );
      case 'Wrong Answer':
        return (
          <Badge className='bg-red-100 text-red-800 hover:bg-red-100'>
            <X className='mr-1 h-3 w-3' /> {result}
          </Badge>
        );
      case 'Time Limit':
        return (
          <Badge className='bg-yellow-100 text-yellow-800 hover:bg-yellow-100'>
            <Clock className='mr-1 h-3 w-3' /> {result}
          </Badge>
        );
      case 'Compilation Error':
        return (
          <Badge className='bg-gray-100 text-gray-800 hover:bg-gray-100'>
            <AlertCircle className='mr-1 h-3 w-3' /> {result}
          </Badge>
        );
      default:
        return <Badge>{result}</Badge>;
    }
  };

  function formatUzbekPhoneNumber(input) {
    if (!input) return 'N/A';

    const digits = input.toString().replace(/\D/g, '');

    let normalized = digits;

    if (digits.length === 9) {
      normalized = '998' + digits;
    }

    if (normalized.length === 12 && normalized.startsWith('998')) {
      return `+998 ${normalized.slice(3, 5)} ${normalized.slice(
        5,
        8
      )} ${normalized.slice(8, 10)} ${normalized.slice(10)}`;
    }

    return input;
  }

  const { data: company, isLoading, isError } = useGetCompany(companyId);

  return (
    <div className='container mx-auto p-4 space-y-6'>
      <div className='flex flex-col md:flex-row justify-between items-start md:items-center mb-6'>
        <div>
          <h1 className='text-3xl font-bold'>Company Profile</h1>
          <p className='text-muted-foreground'>
            Detailed information and statistics
          </p>
        </div>
        <div className='mt-4 md:mt-0'>
          <Button
            onClick={() => navigate('/company')}
            variant='secondary'
            className='mr-2'
          >
            <LogOut className='mr-2 h-4 w-4' /> Back to Companies
          </Button>
        </div>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
        {/* Basic Info Card */}
        <Card className='md:col-span-1'>
          <CardHeader>
            <CardTitle className='flex items-center'>
              {/* <User className="mr-2 h-5 w-5" /> */}
              <Building className='mr-2 h-5 w-5' />
              Basic Information
            </CardTitle>
          </CardHeader>

          {isLoading ? (
            <CompanyCardSkeleton />
          ) : (
            <CardContent className='space-y-4'>
              <div className='flex justify-center mb-6'>
                <div className='relative'>
                  <div className='h-24 w-24 rounded-full bg-secondary flex items-center justify-center text-2xl font-bold text-primary'>
                    {company?.name?.slice(0, 2).toUpperCase()}
                  </div>
                  {company?.active ? (
                    <Badge className='absolute bottom-0 left-0 translate-x-1/3 translate-y-1/5 bg-green-500 hover:bg-green-500'>
                      Active
                    </Badge>
                  ) : (
                    <Badge className='absolute bottom-0 left-0 translate-x-1/3 translate-y-1/5 bg-red-500 hover:bg-red-500'>
                      Inactive
                    </Badge>
                  )}
                </div>
              </div>

              <div className='space-y-4'>
                <div className='flex items-center'>
                  {/* <p className="text-sm text-muted-foreground">Full Name</p> */}
                  <Building className='mr-2 h-4 w-4 text-muted-foreground' />
                  <p className='font-medium text-primary'>{company?.name}</p>
                </div>
                <div>
                  {/* <p className="text-sm text-muted-foreground">Username</p> */}
                  <p className='font-medium text-primary flex items-center'>
                    <Phone className='mr-2 h-4 w-4 text-muted-foreground' />{' '}
                    <a href={`tel:${formatUzbekPhoneNumber(company?.phone)}`}>
                      {formatUzbekPhoneNumber(company?.phone)}
                    </a>
                  </p>
                </div>
                <div>
                  {/* <p className="text-sm text-muted-foreground">Email</p> */}
                  <div className='flex items-center'>
                    <Mail className='mr-2 h-4 w-4 text-muted-foreground' />
                    <a className='mb-1' href={`mailto:${company?.email}`}>
                      {company?.email}
                    </a>
                  </div>
                </div>
                <div>
                  {/* <p className="text-sm text-muted-foreground">Role</p> */}
                  <div className='flex items-center'>
                    <Map className='mr-2 h-4 w-4 text-muted-foreground' />
                    <p className='font-medium line-clamp-1'>
                      {company?.address}
                    </p>
                  </div>
                </div>
                <div>
                  <p className='text-sm text-muted-foreground'>
                    Registration Date
                  </p>
                  <div className='flex items-center'>
                    <Calendar className='mr-2 h-4 w-4 text-muted-foreground' />
                    <p className='font-medium'>
                      {company?.createdAt &&
                        format(
                          new Date(company?.createdAt.split('.')[0] + 'Z'),
                          'dd-MM-yyyy'
                        )}
                    </p>
                    <p className='ml-2 flex items-center'>
                      <Clock className='mx-1 h-4 w-4 text-muted-foreground' />
                      <span>
                        {company?.createdAt &&
                          format(
                            new Date(company?.createdAt.split('.')[0] + 'Z'),
                            'HH:mm'
                          )}
                      </span>
                    </p>
                  </div>
                </div>
                <div>
                  <p className='text-sm text-muted-foreground'>Description</p>
                  <p
                    title={company?.description}
                    className='font-medium line-clamp-6'
                  >
                    {company?.description}
                  </p>
                </div>
              </div>
            </CardContent>
          )}
        </Card>

        {/* Statistics Card */}
        <Card className='md:col-span-2'>
          <CardHeader>
            <CardTitle className='flex items-center'>
              <Activity className='mr-2 h-5 w-5' /> Statistics
            </CardTitle>
            <CardDescription>
              Company performance and activity metrics
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <CompanyStatsSkeleton />
            ) : (
              <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 mb-6'>
                <div className='bg-secondary p-4 rounded-lg'>
                  <p className='text-sm text-muted-foreground'>Total Users</p>
                  <p className='text-2xl font-bold'>{company?.totalUsers}</p>
                </div>
                <div className='bg-secondary p-4 rounded-lg'>
                  <p className='text-sm text-muted-foreground'>Active Users</p>
                  <p className='text-2xl font-bold'>{company?.activeUsers}</p>
                </div>
                <div className='bg-secondary p-4 rounded-lg'>
                  <p className='text-sm text-muted-foreground'>Total Groups</p>
                  <p className='text-2xl font-bold'>{company?.totalGroups}</p>
                </div>
                <div className='bg-secondary p-4 rounded-lg'>
                  <p className='text-sm text-muted-foreground'>Active Groups</p>
                  <p className='text-2xl font-bold'>{company?.activeGroups}</p>
                </div>
              </div>
            )}
            <div className='space-y-4'>
              <div className='flex justify-between items-center mb-4'>
                <h3 className='text-lg font-medium'>Activity</h3>
              </div>

              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <div className='flex justify-between items-center mb-4'>
                  <div></div>
                  <TabsList className='grid w-[300px] grid-cols-3'>
                    <TabsTrigger value='daily'>Daily</TabsTrigger>
                    <TabsTrigger value='weekly'>Weekly</TabsTrigger>
                    <TabsTrigger value='monthly'>Monthly</TabsTrigger>
                  </TabsList>
                </div>

                <div className='h-[200px]'>
                  <TabsContent value='daily' className='h-full mt-0'>
                    <AreaChart
                      data={dailyData}
                      index='name'
                      categories={['value']}
                      colors={['blue']}
                      valueFormatter={(value) => `${value}`}
                      className='h-full'
                    />
                  </TabsContent>
                  <TabsContent value='weekly' className='h-full mt-0'>
                    <BarChart
                      data={weeklyData}
                      index='name'
                      categories={['value']}
                      colors={['blue']}
                      valueFormatter={(value) => `${value}`}
                      className='h-full'
                    />
                  </TabsContent>
                  <TabsContent value='monthly' className='h-full mt-0'>
                    <AreaChart
                      data={monthlyData}
                      index='name'
                      categories={['value']}
                      colors={['blue']}
                      valueFormatter={(value) => `${value} `}
                      className='h-full'
                    />
                  </TabsContent>
                </div>
              </Tabs>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Problem History Card */}
      <Card>
        <CardHeader>
          <div className='flex items-center justify-between'>
            <div>
              <CardTitle className='flex items-center'>
                <Code2 className='mr-2 h-5 w-5' /> Groups
              </CardTitle>
              <CardDescription>List of groups</CardDescription>
            </div>
            <Button
              variant='default'
              size='sm'
              onClick={() => navigate('/groups/create')}
            >
              <Plus className='h-4 w-4' /> Create Group
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Group Name</TableHead>
                <TableHead>Joined At</TableHead>
                <TableHead>Users</TableHead>
                <TableHead>Main teacher</TableHead>
                <TableHead>Co teachers</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {groupData.map((group, index) => (
                <TableRow key={index}>
                  <TableCell className='font-medium'>{group.name}</TableCell>

                  <TableCell>
                    {new Date(group.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>{group.users}</TableCell>
                  <TableCell>{group.mainTeacher}</TableCell>
                  <TableCell className='flex flex-wrap gap-2 truncate'>
                    {group.coTeachers.map((teacher, index) => (
                      <p key={index}>{teacher}</p>
                    ))}
                  </TableCell>
                  <TableCell>
                    <Button variant='ghost' size='sm' asChild>
                      <a href={group.solutionLink}>
                        <Eye className='mr-2 h-4 w-4' /> View Solution
                      </a>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter className='flex justify-between'>
          <Button variant='outline' size='sm'>
            Previous
          </Button>
          <div className='flex items-center gap-2'>
            <Button variant='outline' size='sm' className='h-8 w-8 p-0'>
              1
            </Button>
            <Button variant='outline' size='sm' className='h-8 w-8 p-0'>
              2
            </Button>
            <Button variant='outline' size='sm' className='h-8 w-8 p-0'>
              3
            </Button>
          </div>
          <Button variant='outline' size='sm'>
            Next
          </Button>
        </CardFooter>
      </Card>

      {/*  Card */}
      <Card>
        <CardHeader>
          <CardTitle className='flex items-center'>
            <Code2 className='mr-2 h-5 w-5' /> Submissions
          </CardTitle>
          <CardDescription>Recent contest submissions</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Contest</TableHead>
                <TableHead>Language</TableHead>
                <TableHead>Result</TableHead>
                <TableHead>Submitted At</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {submissions.map((submission, index) => (
                <TableRow key={index}>
                  <TableCell className='font-medium'>
                    {submission.problem}
                  </TableCell>
                  <TableCell>{submission.language}</TableCell>
                  <TableCell>{getResultBadge(submission.result)}</TableCell>
                  <TableCell>
                    {format(
                      new Date(submission.submittedAt),
                      'MMM dd, yyyy HH:mm'
                    )}
                  </TableCell>
                  <TableCell>
                    <Button variant='ghost' size='sm' asChild>
                      <a href={submission.codeLink}>
                        <Eye className='mr-2 h-4 w-4' /> View Code
                      </a>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter className='flex justify-between'>
          <Button variant='outline' size='sm'>
            Previous
          </Button>
          <div className='flex items-center gap-2'>
            <Button variant='outline' size='sm' className='h-8 w-8 p-0'>
              1
            </Button>
            <Button variant='outline' size='sm' className='h-8 w-8 p-0'>
              2
            </Button>
            <Button variant='outline' size='sm' className='h-8 w-8 p-0'>
              3
            </Button>
          </div>
          <Button variant='outline' size='sm'>
            Next
          </Button>
        </CardFooter>
      </Card>

      {/* Admin Actions Card */}
      <Card>
        <CardHeader>
          <CardTitle className='flex items-center'>
            <Shield className='mr-2 h-5 w-5' /> Company Actions
          </CardTitle>
          <CardDescription>
            Manage company account and permissions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
            <Button variant='outline' className='justify-start'>
              <UserX className='mr-2 h-4 w-4' /> Block Company
            </Button>
            <Button variant='outline' className='justify-start'>
              <Lock className='mr-2 h-4 w-4' /> Reset Password
            </Button>
            <Button variant='outline' className='justify-start'>
              <Shield className='mr-2 h-4 w-4' /> Change Role
            </Button>
            <Button variant='outline' className='justify-start'>
              <Mail className='mr-2 h-4 w-4' /> Send Notification
            </Button>
            <Button variant='destructive' className='justify-start'>
              <UserX className='mr-2 h-4 w-4' /> Delete Company
            </Button>
            <Button variant='outline' className='justify-start'>
              <Eye className='mr-2 h-4 w-4' /> View Login History
            </Button>
          </div>
        </CardContent>
        <CardFooter>
          <Button variant='outline' className='w-full'>
            Go to Company Settings
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

export function CompanyCardSkeleton() {
  return (
    <div className='space-y-4 px-6'>
      <div className='flex justify-center mb-6'>
        <div className='relative'>
          <Skeleton className='h-24 w-24 rounded-full' />
        </div>
      </div>

      <div className='space-y-4'>
        <div className='flex items-center space-x-2'>
          <Skeleton className='h-4 w-4 rounded-full' />
          <Skeleton className='h-4 w-32' />
        </div>

        <div className='flex items-center space-x-2'>
          <Skeleton className='h-4 w-4 rounded-full' />
          <Skeleton className='h-4 w-40' />
        </div>

        <div className='flex items-center space-x-2'>
          <Skeleton className='h-4 w-4 rounded-full' />
          <Skeleton className='h-4 w-40' />
        </div>

        <div className='flex items-center space-x-2'>
          <Skeleton className='h-4 w-4 rounded-full' />
          <Skeleton className='h-4 w-48' />
        </div>

        <div>
          <Skeleton className='h-4 w-28 mb-1' />
          <div className='flex items-center space-x-2'>
            <Skeleton className='h-4 w-4 rounded-full' />
            <Skeleton className='h-4 w-24' />
            <Skeleton className='h-4 w-4 rounded-full' />
            <Skeleton className='h-4 w-16' />
          </div>
        </div>

        <div>
          <Skeleton className='h-4 w-28 mb-1' />
          <Skeleton className='h-20 w-full' />
        </div>
      </div>
    </div>
  );
}

export function CompanyStatsSkeleton() {
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 mb-6'>
      {[...Array(4)].map((_, i) => (
        <div key={i} className='bg-secondary p-5 rounded-lg space-y-2'>
          <Skeleton className='h-4 w-24' />
          <Skeleton className='h-5 w-20' />
        </div>
      ))}
    </div>
  );
}
