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
  onLabelClick: (code: string, image: string) => void;
}

export function BooksDialog({ onLabelClick }: ModelProps) {
  const [titleBook, setTitleBook] = useState<string>("");
  const [codeBook, setCodeBook] = useState<string>("");
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const handleLabelClick = (code: string, title: string, image: string) => {
    // Call the parent function to update the source URL
    setCodeBook(code);
    setTitleBook(title);
    onLabelClick(code, image);
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
        const response = await fetch(`${endpoint}/books`);
        const data = await response.json();
        setBooks(data.books);
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
          {titleBook ? titleBook + "" : "Select a Book"} <br/>
          {codeBook ? codeBook + "" : ""} <br/>

        </Button>
      </DialogTrigger>
      <DialogContent className="md:max-w-[calc(100%-100px)] md:max-h-[calc(100%-100px)] sm:max-w-md sm:max-h-[200px]">
        <DialogHeader>
          <DialogTitle>Select a book</DialogTitle>
          <DialogDescription>Book will be borrowed</DialogDescription>
        </DialogHeader>

        <ScrollArea className="lg:w-full h-[400px]">
          <RadioGroup defaultValue={codeBook}>
            <div className="grid gap-4 py-4 grid-cols-1 justify-items-center lg:grid-cols-6 md:grid-cols-6 sm:grid-cols-3">
              {/* Repeat this block for each RadioGroupItem */}

              {books?.map((item: any, index: number) => (
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
                        handleLabelClick(item.code, item.title, item.image);
                      }}
                      htmlFor={item.voice_id}
                      className="relative flex w-44 justify-items-start h-[360px] cursor-pointer flex-col items-left justify-between  rounded-md border-2 border-muted hover:bg-accent hover:text-accent-foreground"
                    >
                      <img src={item.image} />

                      <span className="mt-2 text-xs p-2">
                        {item.author}
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
