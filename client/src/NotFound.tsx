export default function NotFound() {
  return (
    <div className="flex justify-center items-center h-screen p-8">
      <div className="flex flex-col items-center justify-center gap-4 p-6 bg-task-background border-2 border-solid border-sidebar-link rounded-2xl">
        <h1 className="md:text-4xl text-2xl text-center">
          Unfortunately, we did not find your destination
        </h1>
        <p className="md:text-2xl text-lg text-center">
          Please check the URL in the address bar and try again.
        </p>
      </div>
    </div>
  )
}
