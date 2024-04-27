"use client";

import { useFormStatus } from "react-dom";

export function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      className="border-white border rounded px-10 py-2 bg-white text-black"
      disabled={pending}
    >
      {pending ? "Added..." : "Add"}
    </button>
  );
}
