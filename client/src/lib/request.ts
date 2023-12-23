import Cookies from "js-cookie"

export const AuthenticatedFetch = async (
  endpoint: string,
  init?: RequestInit | undefined
) => {
  const token = Cookies.get("token")

  if (!token)
    return fetch(`${import.meta.env.VITE_API_URL}/${endpoint}`, {
      ...init,
      headers: {
        "Content-Type": "application/json",
        ...init?.headers,
      },
    })

  return fetch(`${import.meta.env.VITE_API_URL}/${endpoint}`, {
    ...init,
    headers: {
      authorization: `Bearer ${token}`,
      "Content-Type": "application/json",

      ...init?.headers,
    },
  })
}

export const SetCookieToken = (token: string) => {
  Cookies.set("token", token)
}

export const RemoveCookieToken = () => {
  Cookies.remove("token")
}

export const GetCookieToken = () => {
  return Cookies.get("token")
}

export const AuthRequest = async (
  endpoint: string,
  data: any,
  toast: any,
  setIsAuthenticated: any,
  navigate: any
) => {
  try {
    const res = await AuthenticatedFetch(endpoint, {
      method: "POST",
      body: data,
    })

    const dt = await res.json()

    if (dt.success == false) {
      toast({
        title: "Error",
        description: dt.message,
        variant: "destructive",
      })
    } else {
      const token = dt.data

      SetCookieToken(token)

      toast({
        title: "Success",
        description: `${
          endpoint == "auth/login"
            ? "You have successfully logged in."
            : "You have successfully registered your account."
        }`,
      })
      setIsAuthenticated(true)
      navigate("/")
    }
  } catch (error) {
    toast({
      title: "Error",
      description: "Something went wrong, please try again later.",
      variant: "destructive",
    })
  }
}

export const FetchRequest = async (toast: any) => {
  try {
    const [userResponse, tasksResponse] = await Promise.all([
      AuthenticatedFetch("users"),
      AuthenticatedFetch("task"),
    ])

    const userJson = await userResponse.json()
    const tasksJson = await tasksResponse.json()

    if (userJson.success == false || tasksJson.success == false) {
      toast({
        title: "Error",
        description: userJson.message,
        variant: "destructive",
      })
      RemoveCookieToken()
    } else {
      return {
        user: userJson.data,
        tasks: tasksJson.data,
      }
    }
  } catch (error) {
    toast({
      title: "Error",
      description: "Something went wrong, please try again later.",
      variant: "destructive",
    })
  }
}
