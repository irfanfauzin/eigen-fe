
import MainBorrow from "@/components/borrow/main";
import LayoutDashboard from "@/components/dashboard/layout";
import { ModeToggle } from "@/components/mode-toggle";


export default function Borrowing() {
  return (
    <LayoutDashboard>
       
      <header className="sticky top-0 z-10 flex h-[66px] items-center justify-between gap-1 border-b -ml-3 bg-background px-6">
          <h1 className="text-sm sm:text-xl font-semibold">Borrowing</h1>
          <ModeToggle />
        </header>
      <MainBorrow />
      
    </LayoutDashboard>
  );
}
