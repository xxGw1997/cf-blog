"use client";

import { useState } from "react";
import { Loader2, Mail } from "lucide-react";
import { signIn } from "next-auth/react";
import { toast } from "sonner";

import { Input } from "../ui/input";
import { Button } from "../ui/button";

interface LoginFormProps {
  onSuccess?: () => void;
}

export default function LoginForm({ onSuccess }: LoginFormProps) {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState({
    email: false,
  });

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsLoading((prev) => ({
      ...prev,
      email: true,
    }));

    try {
      const res = await signIn("resend", {
        email,
        redirect: false,
      });

      if (res.ok && !res.error && onSuccess) {
        toast.success("Please check your email address to start~");
        onSuccess();
      }
    } catch (error) {
      toast.error("Error sign in with email!");
    } finally {
      setIsLoading((prev) => ({
        ...prev,
        email: false,
      }));
    }
  };

  return (
    <div className="space-y-6">
      <form className="space-y-4" onSubmit={handleEmailSubmit}>
        <Input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full"
        />

        <Button
          type="submit"
          disabled={isLoading.email}
          variant="secondary"
          className="w-full cursor-pointer"
        >
          {isLoading.email ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Mail className="mr-2 h-5 w-5" />
          )}
          Start with email
        </Button>
      </form>
    </div>
  );
}
