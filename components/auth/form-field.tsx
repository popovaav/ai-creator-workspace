"use client";

import * as React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface AuthFormFieldProps extends React.ComponentProps<"input"> {
  label: string;
  error?: string;
}

export function AuthFormField({
  label,
  error,
  id,
  ...props
}: AuthFormFieldProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <Label
        htmlFor={id}
        className="text-[13px] font-medium text-foreground/75"
      >
        {label}
      </Label>
      <Input
        id={id}
        className="text-sm"
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
        {...props}
      />
      {error && (
        <p
          id={`${id}-error`}
          role="alert"
          className="text-[12px] leading-snug text-destructive"
        >
          {error}
        </p>
      )}
    </div>
  );
}
