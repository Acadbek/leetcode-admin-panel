import { TrendingDownIcon, TrendingUpIcon } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export function SectionCards() {
  return (
    <div className="grid grid-cols-1 gap-4 px-4 lg:px-6 sm:grid-cols-2 xl:grid-cols-4">
      <Card className="shadow-xs bg-gradient-to-t from-primary bg-opacity-5 to-card dark:bg-card">
        <CardHeader className="relative">
          <CardDescription>Maktablar</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums sm:text-3xl">
            1,250
          </CardTitle>
          <div className="absolute right-4 top-4">
            <Badge variant="outline" className="flex gap-1 rounded-lg text-xs">
              <TrendingUpIcon className="w-3 h-3" />
              +12.5%
            </Badge>
          </div>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1 text-sm">
          <div className="line-clamp:1 flex gap-2 font-medium">
            Trending up this month <TrendingUpIcon className="w-4 h-4" />
          </div>
          <div className="text-muted-foreground">
            Visitors for the last 6 months
          </div>
        </CardFooter>
      </Card>
      <Card className="shadow-xs bg-gradient-to-t from-primary bg-opacity-5 to-card dark:bg-card">
        <CardHeader className="relative">
          <CardDescription>Foydalanuvchilar</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums sm:text-3xl">
            1,234
          </CardTitle>
          <div className="absolute right-4 top-4">
            <Badge variant="outline" className="flex gap-1 rounded-lg text-xs">
              <TrendingDownIcon className="w-3 h-3" />
              -20%
            </Badge>
          </div>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1 text-sm">
          <div className="line-clamp:1 flex gap-2 font-medium">
            Down 20% this period <TrendingDownIcon className="w-4 h-4" />
          </div>
          <div className="text-muted-foreground">
            Acquisition needs attention
          </div>
        </CardFooter>
      </Card>
      <Card className="shadow-xs bg-gradient-to-t from-primary bg-opacity-5 to-card dark:bg-card">
        <CardHeader className="relative">
          <CardDescription>Yechilgan masalalar</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums sm:text-3xl">
            45,678
          </CardTitle>
          <div className="absolute right-4 top-4">
            <Badge variant="outline" className="flex gap-1 rounded-lg text-xs">
              <TrendingUpIcon className="w-3 h-3" />
              +12.5%
            </Badge>
          </div>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1 text-sm">
          <div className="line-clamp:1 flex gap-2 font-medium">
            Strong user retention <TrendingUpIcon className="w-4 h-4" />
          </div>
          <div className="text-muted-foreground">Engagement exceed targets</div>
        </CardFooter>
      </Card>
      <Card className="shadow-xs bg-gradient-to-t from-primary bg-opacity-5 to-card dark:bg-card">
        <CardHeader className="relative">
          <CardDescription>Musobaqalar</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums sm:text-3xl">
            4.5%
          </CardTitle>
          <div className="absolute right-4 top-4">
            <Badge variant="outline" className="flex gap-1 rounded-lg text-xs">
              <TrendingUpIcon className="w-3 h-3" />
              +4.5%
            </Badge>
          </div>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1 text-sm">
          <div className="line-clamp:1 flex gap-2 font-medium">
            Steady performance <TrendingUpIcon className="w-4 h-4" />
          </div>
          <div className="text-muted-foreground">Meets growth projections</div>
        </CardFooter>
      </Card>
    </div>
  );
}
