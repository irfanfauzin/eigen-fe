"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";



interface ModelProps {
  onLabelClick: (code: string, name: string) => void;
}

export function MembersDialog({ onLabelClick }: ModelProps) {
  const [nameMember, setNameMember] = useState<string>("");
  const [codeMember, setCodeMember] = useState<string>("");
  const [members, setMembers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const handleLabelClick = (code: string, name: string) => {
    // Call the parent function to update the source URL
    setCodeMember(code);
    setNameMember(name);
    onLabelClick(code, name);
    simulateEscKeyPress();
  };

  function simulateEscKeyPress() {
    // Create a new "keydown" event with the "Esc" key
    var event = new KeyboardEvent("keydown", {
      key: "Escape",
      keyCode: 27,
    });

    // Dispatch the event to simulate pressing the "Esc" key
    document.dispatchEvent(event);
  }

  const endpoint = process.env.NEXT_PUBLIC_API_ENDPOINT;

  useEffect(() => {
    async function fetchMembers() {
      try {
        const response = await fetch(`${endpoint}/members`);
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

  if (isLoading)
    return (
      <>
        <Skeleton className="h-10 w-full" />
      </>
    );

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="mb-2 p-8 items-center">
          {nameMember ? nameMember + "" : "Select Member"} <br/>
          {codeMember ? codeMember + "" : ""} <br/>

        </Button>
      </DialogTrigger>
      <DialogContent className="md:max-w-[calc(100%-100px)] md:max-h-[calc(100%-100px)] sm:max-w-md sm:max-h-[200px]">
        <DialogHeader>
          <DialogTitle>Select a Member</DialogTitle>
          <DialogDescription>Member will be borrowed</DialogDescription>
        </DialogHeader>

        <ScrollArea className="lg:w-full h-[400px]">
          <RadioGroup defaultValue={codeMember}>
            <div className="grid gap-4 py-4 grid-cols-1 justify-items-center lg:grid-cols-6 md:grid-cols-6 sm:grid-cols-3">
              {/* Repeat this block for each RadioGroupItem */}

              {members?.map((item: any, index: number) => (
                <div key={index}>
                  <div>
                    <RadioGroupItem
                      defaultValue="SHR-1"
                      value={item.code}
                      id={item.code}
                      className="peer"
                    />
                    <Label
                      onClick={() => {
                        handleLabelClick(item.code, item.name);
                      }}
                      htmlFor={item.voice_id}
                      className="relative flex p-10 justify-items-start  cursor-pointer flex-col items-left items-center  rounded-md border-2 border-muted hover:bg-accent hover:text-accent-foreground"
                    >
                      <img
                    className="w-20 h-20 object-cover object-center rounded-full"
                    src={`https://api.dicebear.com/9.x/pixel-art/svg?seed=${item.name}`}
                    alt="avatar"
                  />

                      <span className="mt-2 text-xs p-2">
                        {item.name}
                        <br />
                        {item.code}
                      </span>
                    </Label>
                  </div>
                </div>
              ))}
            </div>
          </RadioGroup>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
