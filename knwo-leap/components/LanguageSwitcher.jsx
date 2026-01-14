"use client";
import React, { useState } from "react";

export default function LanguageSwitcher() {
  const [language, setLanguage] = useState("English");

  return (
    <button
      onClick={() => setLanguage(language === "English" ? "Arabic" : "English")}
      className="bg-gray-100 text-gray-800 px-4 py-2 rounded hover:bg-gray-200 transition"
    >
      {language}
    </button>
  );
}
