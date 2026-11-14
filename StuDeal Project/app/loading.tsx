export default function Loading() {
  return (
    <div className="page-wrap py-10">
      <div className="h-8 w-48 animate-pulse rounded-lg bg-border" />
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div className="h-56 animate-pulse rounded-2xl bg-white" />
        <div className="h-56 animate-pulse rounded-2xl bg-white" />
      </div>
    </div>
  );
}
