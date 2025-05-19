import { GalleryVerticalEnd } from "lucide-react"
import { useForm } from "react-hook-form";
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useLogin } from "@/hooks/queries/useLogin"
import { useNavigate } from "react-router-dom";
import storage from "@/api/localStorage";
import { toast } from "sonner"

export function LoginForm({
  className,
  ...props
}) {
  const navigate = useNavigate();

  const { mutate: login, isPending, error } = useLogin();
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    login(data, {
      onSuccess: (res) => {
        storage.setItem("accessToken", res.accessToken);
        storage.setItem('refreshToken', res.refreshToken);
        toast.success("Login successful");
        navigate("/");
      },
      onError: (err) => {
        console.log("Login failed", err);
        // Serverdan kelgan aniq xato xabarini ko'rsatish
        toast.error('Parol yoki foydalanuvchi nomi xato');
      },
    });
  }

  return (
    (<div className={cn("flex flex-col gap-6", className)} {...props}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col items-center gap-2">
            <a href="#" className="flex flex-col items-center gap-2 font-medium">
              <div className="flex h-8 w-8 items-center justify-center rounded-md">
                <GalleryVerticalEnd className="size-6" />
              </div>
              <span className="sr-only">LOGO</span>
            </a>
            <h1 className="text-xl font-bold">Welcome to Company name</h1>
          </div>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="text"
                {...register("username", {
                  required: "Foydalanuvchi nomi majburiy",
                  minLength: { value: 4, message: "Foydalanuvchi nomi kamida 4 belgi bo'lishi kerak" }
                })}
                placeholder="username"
                className={cn("", errors.username && "border-red-500")}
              />
              {errors.username && <p className="text-red-500 text-sm">{errors.username.message}</p>}

              <Label htmlFor="password" className="mt-3">Password</Label>
              <Input
                id="password"
                type="password"
                {...register("password", {
                  required: "Parol majburiy",
                  minLength: { value: 4, message: "Parol kamida 4 belgi bo'lishi kerak" }
                })}
                placeholder="********"
                className={cn("", errors.password && "border-red-500")}
              />
              {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}

              {/* Parolni tasdiqlash uchun qo'shimcha input (agar ro'yxatdan o'tish uchun bo'lsa) */}
              {/* <Label htmlFor="confirmPassword" className="mt-3">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                {...register("confirmPassword", {
                  required: "Parolni tasdiqlash majburiy",
                  validate: value =>
                    value === getValues("password") || "Parollar mos kelmadi"
                })}
                placeholder="********"
                className={cn("", errors.confirmPassword && "border-red-500")}
              />
              {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>} */}

            </div>
            <Button type="submit" className="w-full" disabled={isPending}>
              {isPending ? "Logging in..." : "Login"}
            </Button>
          </div>
        </div>
      </form>
      <div
        className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary  ">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </div>
    </div>)
  );
}