"use client";

import React from "react";
import { FormField } from "./Form";

interface SwitchFieldProps {
  field: FormField;
  value: boolean;
  onChange: (value: boolean) => void;
}

export const SwitchField: React.FC<SwitchFieldProps> = ({ value, onChange }) => {
  return (
    <button
      type="button"
      onClick={() => onChange(!value)}
      className={`relative w-11 h-6 rounded-full transition-colors duration-200 ${
        value ? "bg-[#d4af37]" : "bg-neutral-200 dark:bg-white/15"
      }`}
    >
      <span
        className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-200 ${
          value ? "translate-x-5" : "translate-x-0"
        }`}
      />
    </button>
  );
};
