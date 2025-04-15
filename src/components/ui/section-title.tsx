
import { cn } from "@/lib/utils";

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  center?: boolean;
  className?: string;
}

export function SectionTitle({
  title,
  subtitle,
  center = false,
  className = "",
}: SectionTitleProps) {
  return (
    <div className={cn(
      "mb-10",
      center && "text-center",
      className
    )}>
      <h2 className="text-3xl md:text-4xl font-bold font-display relative inline-block mb-2">
        {title}
        <span className="absolute -bottom-2 left-0 w-1/3 h-1 bg-vitality-300 rounded"></span>
      </h2>
      {subtitle && (
        <p className="text-gray-600 mt-4 max-w-2xl">
          {subtitle}
        </p>
      )}
    </div>
  );
}
