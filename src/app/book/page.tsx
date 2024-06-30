//@ts-nocheck
"use client";
import React, { useState, useEffect } from "react";
import Card from "@/components/borrow/card";
import { Skeleton } from "@/components/ui/skeleton";
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
import { Button } from "@/components/ui/button";
import { Metadata } from "next";
import LayoutDashboard from "@/components/dashboard/layout";
import { ModeToggle } from "@/components/mode-toggle";

export default function Member() {
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [formData, setFormData] = useState({
    code: "",
    title: "",
    author: "",
    stock: "",
  });

  const handleInputChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const endpoint = process.env.NEXT_PUBLIC_API_ENDPOINT;

  useEffect(() => {
    async function fetchBooks() {
      try {
        const response = await fetch(`${endpoint}/books`);
        const data = await response.json();
        setBooks(data.books);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching books:", error);
        setIsLoading(false);
      }
    }

    fetchBooks();
  }, []);

  const handleAddBook = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(
        `${endpoint}/books?code=${formData.code}&title=${formData.title}&author=${formData.author}&stock=${formData.stock}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        // Add the new book to the local state and close the dialog
        setBooks([...books, formData]);
        setFormData({ code: "", title: "", author: "", stock: "" }); // Clear form data
        window.location.reload();
      } else {
        console.error("Error adding book:", await response.text());
      }
    } catch (error) {
      console.error("Error adding book:", error);
    }
  };
  return (
    <LayoutDashboard>
      <header className="sticky top-0 z-10 flex h-[66px] items-center justify-between gap-1 border-b -ml-3 bg-background px-6">
        <h1 className="text-sm sm:text-xl font-semibold">Book</h1>
        <ModeToggle />
      </header>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mt-2 md:mt-10 px-6">
        {isLoading ? (
          <div className="flex flex-col space-y-3">
            <Skeleton className="h-[125px] w-[250px] rounded-xl" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[250px]" />
              <Skeleton className="h-4 w-[200px]" />
            </div>
          </div>
        ) : (
          books.map((book) => (
            <Card
              key={book.code}
              className="w-full md:w-9/12 lg:w-7/12 md:p-4 md:m-4 border-none md:border-solid shadow-none md:shadow-lg"
              image={book.image}
              title={book.title}
              author={book.author}
              available_to_borrow={book.available_to_borrow}
              code={book.code}
            />
          ))
        )}

        <div className="group bg-white/5 py-20 px-4 flex flex-col space-y-2 items-center cursor-pointer rounded-md hover:bg-white/20 hover:smooth-hover  shadow-md border text-center justify-center">
          <Dialog>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Add Book</DialogTitle>
                <DialogDescription>
                  Enter the details of the new book. Click add when you're done.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="code" className="text-right">
                    Code
                  </Label>
                  <Input
                    id="code"
                    name="code"
                    value={formData.code}
                    onChange={handleInputChange}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="title" className="text-right">
                    Title
                  </Label>
                  <Input
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="author" className="text-right">
                    Author
                  </Label>
                  <Input
                    id="author"
                    name="author"
                    value={formData.author}
                    onChange={handleInputChange}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="stock" className="text-right">
                    Stock
                  </Label>
                  <Input
                    id="stock"
                    name="stock"
                    value={formData.stock}
                    onChange={handleInputChange}
                    className="col-span-3"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit" onClick={handleAddBook}>
                  Add
                </Button>
              </DialogFooter>
            </DialogContent>

            <DialogTrigger>
              <a
                className="group-hover:smooth-hover flex w-20 h-20 rounded-full items-center justify-center"
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
                className="  group-hover:smooth-hover text-center cursor-pointer"
                // onClick={handleDialogOpen} // Open dialog on click
              >
                Add New
              </a>
            </DialogTrigger>
          </Dialog>
        </div>
      </div>
      <div className="mt-3 text-center text-sm p-4 ">
        Book Cover Image by{" "}
        <a
          href="https://openlibrary.org/"
          className="font-medium underline underline-offset-4"
          target="_blank"
          rel="noreferrer"
        >
          {" "}
          Openlibrary
        </a>
      </div>
    </LayoutDashboard>
  );
}
