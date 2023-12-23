import { useForm } from "react-hook-form"
import { Button } from "./components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./components/ui/card"
import { Input } from "./components/ui/input"
import { Label } from "./components/ui/label"
import { useContext, useEffect } from "react"
import { GlobalContext } from "./context/GlobalProvider"
import { useNavigate } from "react-router-dom"
import { AuthRequest, GetCookieToken } from "./lib/request"

type FormValues = {
  email: string
  password: string
  name: string
}

export default function Register() {
  const { setIsAuthenticated, toast } = useContext(GlobalContext)
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      email: "",
      password: "",
      name: "",
    },
  })

  useEffect(() => {
    const token = GetCookieToken()
    if (token) {
      navigate("/")
    }
  }, [navigate])

  async function onSubmit(data: FormValues) {
    await AuthRequest(
      "auth/register",
      JSON.stringify(data),
      toast,
      setIsAuthenticated,
      navigate
    )
  }
  return (
    <form
      className="flex items-center justify-center min-h-screen h-fit p-6"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Card className="w-full md:w-[350px]">
        <CardHeader>
          <CardTitle>Register</CardTitle>
          <CardDescription>
            Register yourself to get started with the features.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  placeholder="Email"
                  {...register("email", {
                    required: {
                      value: true,
                      message: "Email is required",
                    },
                    validate: {
                      isEmail: (value) =>
                        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)
                          ? "Invalid email address"
                          : true,
                    },
                  })}
                />
                {errors.email && (
                  <div className="text-sm text-destructive font-bold">
                    {errors.email.message}
                  </div>
                )}
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  placeholder="Username"
                  {...register("name", {
                    required: {
                      value: true,
                      message: "Username is required",
                    },
                  })}
                />
                {errors.name && (
                  <div className="text-sm text-destructive font-bold">
                    {errors.name.message}
                  </div>
                )}
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  placeholder="******"
                  type="password"
                  {...register("password", {
                    required: {
                      value: true,
                      message: "Password is required",
                    },
                  })}
                />
                {errors.password && (
                  <div className="text-sm text-destructive font-bold">
                    {errors.password.message}
                  </div>
                )}
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col justify-start w-full md:gap-6 sm:gap-4 gap-2">
          <p className="text-sm font-bold text-task-foreground text-center">
            Already sign up? You can proceed with{" "}
            <a
              href="/login"
              className="font-extrabold hover:scale-110 transition-all duration-300 ease-in-out underline"
            >
              login
            </a>{" "}
            instead
          </p>
          <Button variant="outline" type="submit">
            Login
          </Button>
        </CardFooter>
      </Card>
    </form>
  )
}
