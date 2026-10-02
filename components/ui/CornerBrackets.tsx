import { cn } from "@/lib/utils";

const VARIANTS = {
  /** Static 2px red frame sitting just outside the box */
  frame: {
    base: "w-6 h-6 z-10",
    corners: [
      "-top-2 -left-2 border-t-2 border-l-2",
      "-top-2 -right-2 border-t-2 border-r-2",
      "-bottom-2 -left-2 border-b-2 border-l-2",
      "-bottom-2 -right-2 border-b-2 border-r-2",
    ],
  },
  /** Thin corners that fade in on parent `group` hover */
  hover: {
    base: "w-4 h-4 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300",
    corners: [
      "-top-px -left-px border-t border-l",
      "-top-px -right-px border-t border-r",
      "-bottom-px -left-px border-b border-l",
      "-bottom-px -right-px border-b border-r",
    ],
  },
};

/** Red corner brackets — place inside a `relative` container */
export default function CornerBrackets({ variant = "frame" }: { variant?: keyof typeof VARIANTS }) {
  const { base, corners } = VARIANTS[variant];
  return (
    <>
      {corners.map((corner) => (
        <span key={corner} className={cn("absolute border-accent", base, corner)} />
      ))}
    </>
  );
}
