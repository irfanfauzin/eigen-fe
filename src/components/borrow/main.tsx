//@ts-nocheck

"use client";

import { MembersDialog } from "./members";
import { BooksDialog } from "./books";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import axios from "axios";
import { User, Book } from "lucide-react";

export default function MainBorrow() {
  const { toast } = useToast();
  const [imageBook, setImageBook] = useState<string>("");
  const [nameMember, setNameMember] = useState<string>("");
  const [codeMember, setCodeMember] = useState<string>("");

  const [borrows, setBorrows] = useState<string>([]);
  const [codeBook, setCodeBook] = useState<string>("");

  const endpoint = process.env.NEXT_PUBLIC_API_ENDPOINT;
  const handleLabelClickMember = (code: string, name: string) => {
    setNameMember(name);
    setCodeMember(code);
  };

  const handleLabelClickBook = (code: string, image: string) => {
    setImageBook(image);
    setCodeBook(code);
  };

  const borrow = async () => {
    if (!codeBook) {
      toast({
        variant: "destructive",
        description: "Please select book first!",
      });
      return;
    }

    if (!codeMember) {
      toast({
        variant: "destructive",
        description: "Please select member first!",
      });
      return;
    }

    try {
      const submitBorrow = await axios.post(
        `${endpoint}/borrowings?member_code=${codeMember}&book_code=${codeBook}`
      );

      console.log(submitBorrow)

      if (submitBorrow.status == 200) {
        toast({
          variant: "default",
          description: submitBorrow.data.message,
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        description: error.response.data.detail,
      });
    }
  };

  useEffect(() => {
    async function fetchBorrow() {
      try {
        const response = await fetch(`${endpoint}/borrowings`);
        const data = await response.json();
        setBorrows(data.borrowings);
      } catch (error) {
        console.error("Error fetching borrowings:", error);
      }
    }

    fetchBorrow();
  }, []);

  return (
    <div className="flex justify-center mt-2 md:mt-6	">
      <Card className="w-full md:w-9/12 lg:w-7/12  md:p-4 md:m-4 border-none md:border-solid shadow-none md:shadow-lg">
        <div
          className="relative flex-col items-start gap-8 md:flex"
          x-chunk="dashboard-03-chunk-0"
        >
          <form className="grid w-full overflow-y-hidden items-start gap-6">
            <div className="grid gap-0 md:grid-cols-2 w-full">
              <fieldset className=" pt-6   self-end px-6">
                <div className="grid gap-3 justify-items-center">
                  {nameMember ? (
                    <img
                      className="w-[150px] rounded-full"
                      src={`https://api.dicebear.com/9.x/pixel-art/svg?seed=${nameMember}`}
                      alt="avatar"
                    />
                  ) : (
                    <User size={200} />
                  )}
                  <MembersDialog onLabelClick={handleLabelClickMember} />
                </div>
              </fieldset>
              <fieldset className=" items-stretch pt-6 px-6">
                <div className="grid gap-3 justify-items-center">
                  {imageBook ? (
                    <img src={imageBook} alt="Book cover" width={150} />
                  ) : (
                    <Book size={200} />
                  )}
                  <BooksDialog onLabelClick={handleLabelClickBook} />
                </div>
              </fieldset>
            </div>
            {codeMember && codeBook ? (
              <>
                <Button
                  className="py-6 mx-6"
                  onClick={(e) => {
                    e.preventDefault();
                    borrow();
                  }}
                >
                  Borrow
                </Button>
              </>
            ) : (
              ""
            )}
          </form>
        </div>

        <div className="col-span-12 mt-20 border-t">
          <div className="overflow-auto lg:overflow-visible ">
            <p className="text-center text-2xl mt-6">Borrowing History</p>
            <table className="table w-full text-gray-400 border-separate space-y-6 text-sm">
              <thead className="bg-white/5 text-gray-500">
                <tr>
                  <th className="p-3">Member</th>
                  <th className="p-3 text-left">Book</th>
                  <th className="p-3 text-left">Date</th>
                  <th className="p-3 text-left">Status</th>
                </tr>
              </thead>
              <tbody>
                {borrows?.map((borrow) => (
                  <>
                    <tr className="bg-white/5">
                      <td className="p-3">
                        <div className="flex align-items-center">
                          <img
                            className="rounded-full h-12 w-12  object-cover"
                            src={`https://api.dicebear.com/9.x/pixel-art/svg?seed=${borrow.member_name}`}
                            alt={`${borrow.member_name}`}
                          />
                          <div className="ml-3">
                            <div className="">{borrow.member_name}</div>
                            <div className="text-gray-500">
                              {borrow.member_code}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="p-3">
                        {" "}
                        <div className="">
                          <div className="">{borrow.book_title}</div>
                          <div className="text-gray-500">
                            {borrow.book_code}
                          </div>
                        </div>{" "}
                      </td>
                      <td className="p-3 font-bold">{borrow.borrowed_at}</td>
                      <td className="p-3">
                        <span className="bg-green-400 text-gray-50 rounded-md px-2">
                          Borrowed
                        </span>
                      </td>
                    </tr>
                  </>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Card>
    </div>
  );
}
