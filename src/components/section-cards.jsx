import { PlusIcon, TrendingDownIcon, TrendingUpIcon } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "./ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import React from "react";
import { Textarea } from "./ui/textarea";

const cards = [
  {
    id: 1,
    tooltipContent: "Maktab qo'shish",
    type: 'add-school',
    title: "Maktablar",
    count: 1250,
    growth: 12.5,
    growthIcon: <TrendingUpIcon className="w-3 h-3" />,
    growthText: "Trending up this month",
  },
  {
    id: 2,
    type: 'add-user',
    tooltipContent: "Foydalanuvchi qo'shish",
    title: "Foydalanuvchilar",
    count: 1234,
    growth: -20,
    growthIcon: <TrendingDownIcon className="w-3 h-3" />,
    growthText: "Down 20% this period",
  },
  {
    id: 3,
    tooltipContent: "Masala qo'shish",
    type: 'add-problem',
    title: "Yechilgan masalalar",
    count: 45678,
    growth: 12.5,
    growthIcon: <TrendingUpIcon className="w-3 h-3" />,
    growthText: "Strong user retention",
  },
  {
    id: 4,
    tooltipContent: "Musobaqa qo'shish",
    type: 'add-contest',
    title: "Musobaqalar",
    count: 4.5,
    growth: 4.5,
    growthIcon: <TrendingUpIcon className="w-3 h-3" />,
    growthText: "Steady performance",
  }
]


export function SectionCards() {
  const [open, setOpen] = React.useState(false)
  const [modalType, setModalType] = React.useState(null);

  const handleModal = (type) => {
    setOpen(true);
    setModalType(type)
  }

  return (
    <TooltipProvider delayDuration={100}>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>
            { modalType === 'add-school' && "Maktab qo'shish" }
            { modalType === 'add-user' && "Foydalanuvchi qo'shish" }
            { modalType === 'add-problem' && "Masala qo'shish" }
            { modalType === 'add-contest' && "Musobaqa qo'shish" }
            </DialogTitle>
          </DialogHeader>

          <div className="flex flex-col gap-4">
            <Input placeholder="Maktab nomi" />
            <Input placeholder="Manzil" />
            <Input placeholder="Telefon raqami" />
            <Textarea placeholder="Qo'shimcha ma'lumot" />
          </div>

          <DialogFooter className="mt-4">
            <Button variant="outline" onClick={() => setOpen(false)}>
              Bekor qilish
            </Button>
            <Button>Saqlash</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <div className="grid grid-cols-1 gap-4 px-4 lg:px-6 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => (
          <Card key={card.id} className="group relative shadow-xs bg-gradient-to-t from-primary bg-opacity-5 to-card dark:bg-card overflow-hidden">
            <div className="absolute inset-0 bg-black/15 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center z-10">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button onClick={() => handleModal(card.type)} variant="secondary" className="size-7 text-muted-foreground">
                    <PlusIcon className="size-3" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{card.tooltipContent}</p>
                </TooltipContent>
              </Tooltip>
            </div>

            <CardHeader className="relative group-hover:opacity-50 transition-all duration-300">
              <CardDescription>{card.title}</CardDescription>
              <CardTitle className="text-2xl font-semibold tabular-nums sm:text-3xl">
                {card.count}
              </CardTitle>
              <div className="absolute right-4 top-4">
                <Badge variant="outline" className="flex gap-1 rounded-lg text-xs">
                  {card.growthIcon}
                  {card.growth}%
                </Badge>
              </div>
            </CardHeader>

            <CardFooter className="flex-col items-start gap-1 text-sm group-hover:opacity-50 transition-all duration-300">
              <div className="line-clamp-1 flex gap-2 font-medium">
                {card.growthText} {card.growthIcon}
              </div>
              <div className="text-muted-foreground">
                {card.description}
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </TooltipProvider>
  );
}
