import {
  ArrowDown,
  ArrowRight,
  ArrowUp,
  CheckCircle,
  Circle,
  CircleOff,
  HelpCircle,
  Timer,
} from "lucide-react"

export const labels = [
  {
    value: "bug",
    label: "Bug",
  },
  {
    value: "feature",
    label: "Feature",
  },
  {
    value: "documentation",
    label: "Documentation",
  },
]

export const statuses = [
  {
    value: "ACTIVE",
    label: "Active",
    // icon: HelpCircle,
  },
  {
    value: "INACTIVE",
    label: "Inactive",
    // icon: Circle,
  },
  {
    value: "ARCHIVED",
    label: "Archived",
    // icon: Timer,
  },
  {
    value: "DELETED",
    label: "Deleted",
    icon: CheckCircle,
  }
]

export const priorities = [
  {
    label: "Low",
    value: "low",
    icon: ArrowDown,
  },
  {
    label: "Medium",
    value: "medium",
    icon: ArrowRight,
  },
  {
    label: "High",
    value: "high",
    icon: ArrowUp,
  },
]