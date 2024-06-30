//@ts-nocheck
"use client";

import LayoutDashboard from "@/components/dashboard/layout";
import { ModeToggle } from "@/components/mode-toggle";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";


export default function Chatbot() {
  const [members, setMembers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showDialog, setShowDialog] = useState(false);
  const [memberName, setMemberName] = useState("");
  const router = useRouter();

  useEffect(() => {
    async function fetchMembers() {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/members`);
        const data = await response.json();
        setMembers(data.members);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching members:", error);
        setIsLoading(false);
      }
    }

    fetchMembers();
  }, []);

  const handleDialogOpen = () => {
    setMemberName(""); // Clear member name when opening dialog for adding
    setShowDialog(true);
  };

  const handleNameChange = (event) => {
    setMemberName(event.target.value);
  };

  const handleAddMember = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_ENDPOINT}/members?name=${memberName}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        // Add the new member to the local state and close the dialog
        setMembers([...members, { name: memberName }]);
        setMemberName("");
        window.location.reload();
      } else {
        console.error("Error adding member:", await response.text());
      }
    } catch (error) {
      console.error("Error adding member:", error);
    }
  };
  return (
    <LayoutDashboard>
      <header className="sticky top-0 z-10 flex h-[66px] items-center justify-between gap-1 border-b -ml-3 bg-background px-6">
        <h1 className="text-sm sm:text-xl font-semibold">Member</h1>
        <ModeToggle />
      </header>
      <div>
        <>
          {/* Content */}
          <div className="flex-1 sm:px-0 px-2">
            <div className="mb-10 px-6 sm:mb-0 mt-10 grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
              {members.map((member) => (
                <div
                  className="relative group bg-white/5 py-10 sm:py-20 px-4 flex flex-col space-y-2 items-center cursor-pointer rounded-md hover:bg-white/20 hover:smooth-hover"
                  key={member.id}
                >
                  <img
                    className="w-20 h-20 object-cover object-center rounded-full"
                    src={`https://api.dicebear.com/9.x/pixel-art/svg?seed=${member.name}`}
                    alt="avatar"
                  />
                  <h4 className=" text-2xl font-bold capitalize text-center">
                    {member.name}
                  </h4>
                  <p className="/50">
                    Borrowed {member.total_borrowed} Book
                  </p>
                </div>
              ))}

              <div className="group bg-white/5 py-20 px-4 flex flex-col space-y-2 items-center cursor-pointer rounded-md hover:bg-white/20 hover:smooth-hover">
                <Dialog>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Add Member</DialogTitle>
                      <DialogDescription>
                        Enter the name of the new member. Click add when you're
                        done.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                          Name
                        </Label>
                        <Input
                          id="name"
                          value={memberName}
                          onChange={handleNameChange}
                          className="col-span-3"
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button type="submit" onClick={handleAddMember}>
                        Add member
                      </Button>
                    </DialogFooter>
                  </DialogContent>

                  <DialogTrigger>
                    <a
                      className=" /50 group-hover: group-hover:smooth-hover flex w-20 h-20 rounded-full items-center justify-center"
                      onClick={handleDialogOpen} // Open dialog on click
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-10 w-10"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1}
                          d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                        />
                      </svg>
                    </a>

                    <a
                      className="/50 group-hover: group-hover:smooth-hover text-center cursor-pointer"
                      onClick={handleDialogOpen} // Open dialog on click
                    >
                      Add New
                    </a>
                  </DialogTrigger>
                </Dialog>
              </div>
            </div>
          </div>
        </>

        <div className="overflow-y-auto">
          <div className="mt-3 text-center text-sm p-4">
            Awesome Avatars by{" "}
            <a
              href="https://www.dicebear.com"
              className="font-medium underline underline-offset-4"
              target="_blank"
              rel="noreferrer"
            >
              Dicebear
            </a>
          </div>
        </div>
      </div>
    </LayoutDashboard>
  );
}
