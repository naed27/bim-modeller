import { cn } from "@/lib/utils";

export default function LoadingSpinner({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center justify-center", className)}>
      <div className="h-full w-full animate-spin rounded-full border-4 border-primary border-t-transparent" />
    </div>
  );
}
