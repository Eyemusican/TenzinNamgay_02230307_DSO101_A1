
"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface InputWithButtonProps {
  onSubmit: (value: string) => void;
  placeholder?: string;
  buttonText?: string;
}

export default function InputWithButton({
  onSubmit,
  placeholder = "Add a new task...",
  buttonText = "Add",
}: InputWithButtonProps) {
  const [value, setValue] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (value.trim()) {
      onSubmit(value);
      setValue("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mb-6">
      <Input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
      />
      <Button type="submit">
        {buttonText}
      </Button>
    </form>
  );
}
