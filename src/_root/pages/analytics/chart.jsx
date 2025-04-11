import { lazy, Suspense } from "react"

const DynamicCharts = lazy(() => import("./dynamic-charts"))

export default function ChartComponents() {
  return (
    <Suspense
      fallback={
        <div className="h-[300px] w-full flex items-center justify-center">
          <p className="text-muted-foreground">Loading chart...</p>
        </div>
      }
    >
      <DynamicCharts />
    </Suspense>
  )
}
