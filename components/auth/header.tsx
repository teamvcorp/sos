import { Poppins, Great_Vibes } from "next/font/google";
import { cn } from "@/lib/utils";

// Import both fonts
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["600"],
});

const greatVibes = Great_Vibes({
  subsets: ["latin"],
  weight: ["400"],
});

interface HeaderProps {
  label: string;
}

export const Header = ({ label }: HeaderProps) => {
  return (
    <div className="w-full flex flex-col gap-y-4 items-center justify-center">
      {/* h1 with red color and whimsical font */}
      <h1 className={cn("text-4xl text-red-500", greatVibes.className)}>
        Spirit Of Santa
      </h1>
      {/* p with Poppins font */}
      <p className={cn("text-muted-foreground text-sm", poppins.className)}>
        {label}
      </p>
    </div>
  );
};
