"use client";

import { useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { LogOut, UserRoundIcon, UserStar } from "lucide-react";

import LoginForm from "@/components/auth/login-form";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogHeader,
} from "@/components/ui/dialog";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { Role } from "@/lib/db/schema";
import Link from "next/link";

export function LoginButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <UserRoundIcon
        size={22}
        className="cursor-pointer"
        aria-hidden="true"
        onClick={() => setOpen(true)}
      />
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
    </>
  );
}

export function UserButton({
  image,
  fallback,
  role,
}: {
  image: string | null | undefined;
  fallback: string;
  role: Role;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="cursor-pointer">
          {image !== null && <AvatarImage src={image} />}
          <AvatarFallback>{fallback}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="" align="start">
        {role !== "user" && (
          <DropdownMenuItem>
            <Link href="/admin" className="flex">
              <UserStar className="mr-2 h-4 w-4" />
              Dashboard
            </Link>
          </DropdownMenuItem>
        )}
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => signOut()}>
          <LogOut className="mr-2 h-4 w-4" />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function AuthButton() {
  const { data: session } = useSession();

  return (
    <div className="fixed top-2 right-16 h-[3rem] flex items-center">
      {session?.user ? (
        <UserButton
          image={session.user.image}
          fallback={session.user.email ?? "ME"}
          role={session.user.role}
        />
      ) : (
        <LoginButton />
      )}
    </div>
  );
}
