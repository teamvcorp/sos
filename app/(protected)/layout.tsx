import { Navbar } from "./_components/navbar";
import { cn } from "@/lib/utils";
import style from "./dashboard/dashboard.module.css";
import DaysUntilChristmas from "./_components/days-till-christmas";

interface ProtectedLayoutProps {
  children: React.ReactNode;
}

const ProtectedLayout = ({ children }: ProtectedLayoutProps) => {
  return (
    <>
      <div className="flex justify-center">
        <Navbar />
      </div>

      <div
        className={cn(
          `h-full w-full flex flex-col gap-y-10 items-center justify-center border border-blue-500 ${style.dashLayout}`
        )}
      >
        <span><DaysUntilChristmas /></span>
        {children}
      </div>
    </>
  );
};

export default ProtectedLayout;
