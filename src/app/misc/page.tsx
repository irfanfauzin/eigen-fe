//@ts-nocheck

"use client";
import LayoutDashboard from "@/components/dashboard/layout";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ModeToggle } from "@/components/mode-toggle";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function Miscellaneous() {
  const [text, setText] = useState("");
  const [resultReverse, setResultReverse] = useState("");
  const [longestWord, setLongestWord] = useState("");
  const [dig1, setDig1] = useState(0);
  const [dig2, setDig2] = useState(0);

  const reverseAlphabetKeepNumber = (str) => {
    const letters = str.replace(/[0-9]/g, "");
    const numbers = str.replace(/[^0-9]/g, "");
    const reversedLetters = letters.split("").reverse().join("");
    return reversedLetters + numbers;
  };

  const handleTextChange = (event) => {
    setText(event.target.value);
    setResultReverse(reverseAlphabetKeepNumber(event.target.value));
    setLongestWord(findLongestWord(event.target.value));
  };

  const findLongestWord = (sentence) => {
    const words = sentence.split(" ");
    let longest = "";

    for (const word of words) {
      if (word.length > longest.length) {
        longest = word;
      }
    }

    return longest;
  };

  const handleNumbersChange = (event) => {
    const value = event.target.value.trim();
    if (value.length === 9) {
      const numbersArray = value.split("").map(Number);
      setDig1(numbersArray[0] + numbersArray[4] + numbersArray[8]);
      setDig2(numbersArray[2] + numbersArray[4] + numbersArray[6]);
    } else {
      setDig1(0);
      setDig2(0);
    }
  };

  const [arrayA, setArrayA] = useState(["xc", "dz", "bbb", "dz"]);
  const [arrayB, setArrayB] = useState(["bbb", "ac", "dz"]);
  const [result, setResult] = useState([]);

  const handleCalculate = () => {
    const counts = arrayB.map(
      (wordB) => arrayA.filter((wordA) => wordA === wordB).length
    );

    setResult(counts);
  };

  return (
    <LayoutDashboard>
      <header className="sticky top-0 z-10 flex h-[66px] items-center justify-between gap-1 border-b -ml-3 bg-background px-6">
        <h1 className="text-sm sm:text-xl font-semibold">Miscellaneous</h1>
        <ModeToggle />
      </header>
      <div className="flex justify-center mt-2 p-6	">
          <div
            className="relative flex-col items-start gap-8 md:flex"
            x-chunk="dashboard-03-chunk-0"
          >
            <div className="w-full mx-auto p-4 rounded-lg shadow-md">
              <h2 className="text-lg font-semibold mb-4">
                Count Similar Words
              </h2>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Enter array A (comma-separated):
                </label>
                <input
                  type="text"
                  className="border border-gray-300 rounded-md py-2 px-3 w-full"
                  value={arrayA.join(",")}
                  onChange={(e) => setArrayA(e.target.value.split(","))}
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Enter array B (comma-separated):
                </label>
                <input
                  type="text"
                  className="border border-gray-300 rounded-md py-2 px-3 w-full"
                  value={arrayB.join(",")}
                  onChange={(e) => setArrayB(e.target.value.split(","))}
                />
              </div>

              <Button
                className=" font-semibold py-2 px-4 rounded"
                onClick={handleCalculate}
              >
                Count Similar Words
              </Button>

              <div className="mt-4">
                <p className="text-sm font-medium text-gray-700">
                  Output: {result.join(", ")}
                </p>
              </div>
            </div>

            <div className="w-full mx-auto  p-4 rounded-lg shadow-md">
              <h2 className="text-lg font-semibold mb-4">
                Reverse Text And Find Longest Word
              </h2>
              <Input
                type="text"
                placeholder="Enter text to reverse and find longest word"
                value={text}
                onChange={handleTextChange}
              />
              <Label>Reverse Text</Label>
              <div className="text-gray-500">{resultReverse}</div>
              <Label>Longest Word</Label>
              <div className="text-gray-500">{longestWord}</div>
            </div>

            <div className="w-full mx-auto p-4 rounded-lg shadow-md">
              <h2 className="text-lg font-semibold mb-4">
                Subtract the Matrix NxN
              </h2>

              <div className="grid grid-cols-4 items-center gap-4 mb-4">
                <Label htmlFor="query" className="text-left">
                  Input Numbers
                </Label>
                <Input
                  id="numbers"
                  name="numbers"
                  onChange={handleNumbersChange}
                  className="col-span-3"
                  placeholder="120456789"
                />
              </div>

              <Label>diagonal 1</Label>
              <div className="text-gray-500 mb-4">{dig1}</div>
              <Label>diagonal 2</Label>
              <div className="text-gray-500 mb-4">{dig2}</div>
              <Label className=" inline">
                {dig1} - {dig2} ={" "}
                <span className="text-red-700">{dig1 - dig2}</span>
              </Label>
            </div>
          </div>
      </div>
    </LayoutDashboard>
  );
}
