"use client";

import { Users, BookOpen, Info, Handshake, Dice6 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import Link from "next/link";
import { ReactNode } from "react";
import { Library } from "lucide-react";
import { usePathname, useSearchParams } from "next/navigation";

interface Props {
  children?: ReactNode;
}

export default function LayoutDashboard({ children }: Props) {
  const pathname = usePathname();
  return (
    <div className="grid h-screen w-full pl-[78px]">
      <aside className="inset-y fixed  -left-2 z-20 flex h-full flex-col border-r">
        <div className="border-b ml-2">
          <Library width={65} height={65} className=" scale-50" />
        </div>
        <nav className="grid gap-3 pl-4 pr-2 py-4 ">
          <Tooltip>
            <TooltipTrigger asChild>
              <Link href="/member">
                <Button
                  variant="ghost"
                  size="sm"
                  className={`mt-auto rounded-lg ${
                    pathname === "/member" ? "bg-muted" : ""
                  }`}
                  aria-label="Member"
                >
                  <Users className="size-5" />
                </Button>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right" sideOffset={5}>
              Member
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Link href="/book">
                <Button
                  variant="ghost"
                  size="sm"
                  className={`rounded-lg ${
                    pathname === "/book" ? "bg-muted" : ""
                  }`}
                  aria-label="Book"
                >
                  <BookOpen className="size-5" />
                </Button>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right" sideOffset={5}>
              Book
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Link href="/borrow">
                <Button
                  variant="ghost"
                  size="sm"
                  className={`rounded-lg ${
                    pathname === "/borrow" ? "bg-muted" : ""
                  }`}
                  aria-label="Borrow"
                >
                  <Handshake className="size-5" />
                </Button>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right" sideOffset={5}>
              Borrow a Book
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Link href="/misc">
                <Button
                  variant="ghost"
                  size="sm"
                  className={`rounded-lg ${
                    pathname === "/misc" ? "bg-muted" : ""
                  }`}
                  aria-label="Misc"
                >
                  <Dice6 className="size-5" />
                </Button>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right" sideOffset={5}>
              Miscellaneous
            </TooltipContent>
          </Tooltip>
        </nav>
      </aside>
      <div className="flex flex-col -ml-4 md:ml-0">{children}</div>
    </div>
  );
}
