"use client";
import React from "react";
import { useState } from "react";

export default function Home() {
  const [message, setMessage] = useState(
    "Your masked prompt will appear here..."
  );
  const [error, setError] = useState(false);

  const checkForSensitiveInfo = (e) => {
    const sensitiveWords = [
      "password",
      "credit card",
      "social security",
      "aadhar",
      "phone",
      "email",
    ];
    const text = e.target.value;
    const words = text.split(" ");
    for (let i = 0; i < words.length; i++) {
      if (sensitiveWords.includes(words[i].toLowerCase())) {
        setError(true);
        return;
      }
    }
    const regexPatterns = [
      // email addresses
      /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/,
      /\b\d{3}[-.]?\d{3}[-.]?\d{4}\b/,
      // credit and debit card numbers
      /\b(?:\d[ -]*?){13,16}\b/,
      // social security numbers
      /\b\d{3}[-.]?\d{2}[-.]?\d{4}\b/,
      // aadhar numbers
      /\b\d{4}[-.]?\d{4}[-.]?\d{4}\b/,
      // indian phone
      /\b\d{5}[-.]?\d{5}\b/,
      // ten digit phone
      /\b\d{10}\b/,
      // eleven digit phone
      /\b\d{11}\b/,
      // +91 phone
      /\b\+91\d{10}\b/,
    ];
    for (let i = 0; i < regexPatterns.length; i++) {
      if (regexPatterns[i].test(text)) {
        setError(true);
        return;
      }
    }
    setError(false);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const text = document.getElementById("text").value;
    const regexPatterns = [
      // email addresses
      /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/,
      /\b\d{3}[-.]?\d{3}[-.]?\d{4}\b/,
      // credit and debit card numbers
      /\b(?:\d[ -]*?){13,16}\b/,
      // social security numbers
      /\b\d{3}[-.]?\d{2}[-.]?\d{4}\b/,
      // aadhar numbers
      /\b\d{4}[-.]?\d{4}[-.]?\d{4}\b/,
      // indian phone
      /\b\d{5}[-.]?\d{5}\b/,
      // ten digit phone
      /\b\d{10}\b/,
      // eleven digit phone
      /\b\d{11}\b/,
      // +91 phone
      /\b\+91\d{10}\b/,
    ];
    // sanitize the text
    let sanitizedText = text;
    for (let i = 0; i < regexPatterns.length; i++) {
      const prevSize = sanitizedText.length
      const temp = sanitizedText.replace(regexPatterns[i], 'X');
      const newSize = temp.length
      const diff = new Array(prevSize - newSize).fill('X').join('')
      sanitizedText = sanitizedText.replace(regexPatterns[i], diff)
    }
    setMessage(sanitizedText);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-around p-24">
      <h1 className="text-4xl font-bold">Safe Chat!</h1>
      <div className="w-1/2 h-1/2">
        <p>{message}</p>
      </div>
      <input
        type="text"
        id="text"
        onChange={checkForSensitiveInfo}
        className="w-1/2 p-4 border-2 border-gray-300 rounded-lg text-black"
        placeholder="Type something..."
      />
      <p
        className={
          error
            ? "text-red-500 text-sm duration-200"
            : "text-black text-sm duration-200"
        }
      >
        {
          "Any sensitive information you enter will be masked to protect your privacy."
        }
      </p>
      <button
        onClick={submitHandler}
        className="bg-blue-500 text-white p-4 rounded-lg"
      >
        Send
      </button>
    </main>
  );
}
