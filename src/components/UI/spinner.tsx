import { cn } from "@/lib/utils";
import { HugeiconsIcon } from "@hugeicons/react";
import { Loading03Icon } from "@hugeicons/core-free-icons";

function Spinner({ className, ...props }: React.ComponentProps<"svg">) {
  const { strokeWidth, ...restProps } = props;
  return (
    <HugeiconsIcon
      icon={Loading03Icon}
      role="status"
      strokeWidth={3}
      aria-label="Loading"
      className={cn("size-4 animate-spin", className)}
      {...restProps}
    />
  );
}

export { Spinner };
