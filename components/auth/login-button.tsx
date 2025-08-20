"use client";

import { useState } from "react";

import LoginForm from "@/components/auth/login-form";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogHeader,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

export default function LoginButton({
  className,
}: React.ComponentProps<"div">) {
  const [open, setOpen] = useState(false);

  return (
    <div className={cn("h-[3rem] flex items-center", className)}>
      <Button className="cursor-pointer" onClick={() => setOpen(true)}>
        Login
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent
          className="gap-y-8"
          onInteractOutside={(e) => e.preventDefault()}
        >
          <DialogHeader>
            <DialogTitle>Welcome!</DialogTitle>
            <DialogDescription>
              We’ll send an email with a login button to your email address.
              Please click the button in the email to log in.
            </DialogDescription>
          </DialogHeader>
          <LoginForm onSuccess={() => setOpen(false)} />
        </DialogContent>
      </Dialog>
    </div>
  );
}
