export default function NotFound() {
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-4 bg-background text-foreground">
      <h2 className="text-4xl font-bold">404 - Not Found</h2>
      <p className="text-muted-foreground">Could not find requested resource</p>

    </div>
  )
}
