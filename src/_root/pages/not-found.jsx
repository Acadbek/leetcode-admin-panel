import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"

export function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <div className="mx-auto max-w-md text-center">
        <h1 className="text-9xl font-extrabold tracking-tighter text-gray-600">404</h1>
        <p className="mt-4 text-xl text-gray-500">Page not found</p>
        <p className="mt-2 text-gray-500">The page you're looking for doesn't exist or has been moved.</p>
        <Button asChild className="mt-8">
          <Link to="/">Go back home</Link>
        </Button>
      </div>
    </div>
  )
}

export default NotFound

