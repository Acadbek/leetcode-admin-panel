import { DataTable } from '@/components/table/data-table'
import React from 'react'
import data from './data.json'
import { Button } from '@/components/ui/button'
import { MoreVerticalIcon, TrendingUpIcon } from 'lucide-react'
import { Checkbox } from '@/components/ui/checkbox'
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'
import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts'
import { Separator } from '@/components/ui/separator'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { useIsMobile } from '@/hooks/use-mobile'
import { useLoading } from '@/context/loading-state'

const Problems = () => {
  const { run, stop } = useLoading()

  React.useEffect(() => {
    run()
    const timer = setTimeout(() => {
      stop()
    }, 300)
    return () => clearTimeout(timer)
  }, [])


  const truncateTitle = title => title.length > 64 ? `${title.slice(0, 64)}...` : title

  const chartData = [
    { month: "Yanvar", desktop: 186, mobile: 80 },
    { month: "Fevral", desktop: 305, mobile: 200 },
    { month: "Mart", desktop: 237, mobile: 120 },
    { month: "Aprel", desktop: 73, mobile: 190 },
    { month: "May", desktop: 209, mobile: 130 },
    { month: "Iyun", desktop: 214, mobile: 140 },
  ]

  const chartConfig = {
    desktop: {
      label: "Desktop",
      color: "var(--primary)",
    },

    mobile: {
      label: "Mobile",
      color: "var(--primary)",
    }
  }

  function TableCellViewer({
    item
  }) {
    const isMobile = useIsMobile()

    return (
      (<Sheet>
        <SheetTrigger asChild>
          <Button title={item.title.length > 64 && item.title} variant="link" className="w-fit px-0 text-left text-foreground">
            {truncateTitle(item.title)}
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="flex flex-col">
          <SheetHeader className="gap-1">
            <SheetTitle>{item.title}</SheetTitle>
            <SheetDescription>
              Showing total visitors for the last 6 months
            </SheetDescription>
          </SheetHeader>
          <div className="flex flex-1 flex-col gap-4 overflow-y-auto py-4 text-sm">
            {!isMobile && (
              <>
                <ChartContainer config={chartConfig}>
                  <AreaChart
                    accessibilityLayer
                    data={chartData}
                    margin={{
                      left: 0,
                      right: 10,
                    }}>
                    <CartesianGrid vertical={false} />
                    <XAxis
                      dataKey="month"
                      tickLine={false}
                      axisLine={false}
                      tickMargin={8}
                      tickFormatter={(value) => value.slice(0, 3)}
                      hide />
                    <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="dot" />} />
                    <Area
                      dataKey="mobile"
                      type="natural"
                      fill="var(--color-mobile)"
                      fillOpacity={0.6}
                      stroke="var(--color-mobile)"
                      stackId="a" />
                    <Area
                      dataKey="desktop"
                      type="natural"
                      fill="var(--color-desktop)"
                      fillOpacity={0.4}
                      stroke="var(--color-desktop)"
                      stackId="a" />
                  </AreaChart>
                </ChartContainer>
                <Separator />
                <div className="grid gap-2">
                  <div className="flex gap-2 font-medium leading-none">
                    Trending up by 5.2% this month{" "}
                    <TrendingUpIcon className="size-4" />
                  </div>
                  <div className="text-muted-foreground">
                    Showing total visitors for the last 6 months. This is just
                    some random text to test the layout. It spans multiple lines
                    and should wrap around.
                  </div>
                </div>
                <Separator />
              </>
            )}
            <form className="flex flex-col gap-4">
              <div className="flex flex-col gap-3">
                <Label htmlFor="header">Title</Label>
                <Input id="header" defaultValue={item.title} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-3">
                  <Label htmlFor="type">Type</Label>
                  <Select defaultValue={item.status}>
                    <SelectTrigger id="type" className="w-full">
                      <SelectValue placeholder="Select a type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Table of Contents">
                        Table of Contents
                      </SelectItem>
                      <SelectItem value="Executive Summary">
                        Executive Summary
                      </SelectItem>
                      <SelectItem value="Technical Approach">
                        Technical Approach
                      </SelectItem>
                      <SelectItem value="Design">Design</SelectItem>
                      <SelectItem value="Capabilities">Capabilities</SelectItem>
                      <SelectItem value="Focus Documents">
                        Focus Documents
                      </SelectItem>
                      <SelectItem value="Narrative">Narrative</SelectItem>
                      <SelectItem value="Cover Page">Cover Page</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex flex-col gap-3">
                  <Label htmlFor="status">Status</Label>
                  <Select defaultValue={item.status}>
                    <SelectTrigger id="status" className="w-full">
                      <SelectValue placeholder="Select a status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Done">Done</SelectItem>
                      <SelectItem value="In Progress">In Progress</SelectItem>
                      <SelectItem value="Not Started">Not Started</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-3">
                  <Label htmlFor="target">Target</Label>
                  <Input id="target" defaultValue={item.target} />
                </div>
                <div className="flex flex-col gap-3">
                  <Label htmlFor="limit">Limit</Label>
                  <Input id="limit" defaultValue={item.limit} />
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <Label htmlFor="reviewer">Reviewer</Label>
                <Select defaultValue={item.reviewer}>
                  <SelectTrigger id="reviewer" className="w-full">
                    <SelectValue placeholder="Select a reviewer" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Eddie Lake">Eddie Lake</SelectItem>
                    <SelectItem value="Jamik Tashpulatov">
                      Jamik Tashpulatov
                    </SelectItem>
                    <SelectItem value="Emily Whalen">Emily Whalen</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </form>
          </div>
          <SheetFooter className="mt-auto flex gap-2 sm:flex-col sm:space-x-0">
            <Button className="w-full">Submit</Button>
            <SheetClose asChild>
              <Button variant="outline" className="w-full">
                Done
              </Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>)
    );
  }

  const columns = [
    {
      id: "select",
      header: ({ table }) => (
        <div className="flex items-center justify-center">
          <Checkbox
            checked={
              table.getIsAllPageRowsSelected() ||
              (table.getIsSomePageRowsSelected() && "indeterminate")
            }
            onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
            aria-label="Select all" />
        </div>
      ),
      cell: ({ row }) => (
        <div className="flex items-center justify-center">
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label="Select row" />
        </div>
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "title",
      header: "Title",
      cell: ({ row }) => {
        return <TableCellViewer item={row.original} />;
      },
      enableHiding: false,
    },
    {
      accessorKey: "level",
      header: "Problem level",
      cell: ({ row }) => (
        <div className="w-32">
          {
            <>
              {row.original.level === 'easy' && <p className="px-1.5 text-green-500">Easy</p>}
              {row.original.level === 'medium' && <p className="px-1.5 text-yellow-500">Medium</p>}
              {row.original.level === 'hard' && <p className="px-1.5 text-red-500">Hard</p>}
            </>
          }
        </div>
      ),
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => (
        <p>
          {row.original.status}
        </p>
      ),
    },
    {
      accessorKey: "owner",
      header: () => <div className="w-full text-left">Owner</div>,
      cell: ({ row }) => (
        <div className="text-left">
          {row.original.owner}
        </div>
      ),
    },
    {
      id: "actions",
      cell: () => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="flex size-8 text-muted-foreground data-[state=open]:bg-muted"
              size="icon">
              <MoreVerticalIcon />
              <span className="sr-only">Open menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-32">
            <DropdownMenuItem>Edit</DropdownMenuItem>
            <DropdownMenuItem>Favorite</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ]

  return (
    <div>
      <DataTable endpoint='title' columns={columns} data={data} />
    </div>
  )
}

export default Problems;