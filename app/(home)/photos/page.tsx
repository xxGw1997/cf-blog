"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Masonry } from "react-plock";

import { getFileList, validatePassword } from "@/actions/file-upload";

import { BlurFade } from "@/components/magicui/blur-fade";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Photos = () => {
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [canView, setCanView] = useState(false);
  const [links, setLinks] = useState<string[]>([]);

  const submit = async () => {
    setIsSubmitting(true);
    try {
      const res = await validatePassword(password);

      if (res) {
        const links = await getFileList();
        setLinks(links);
        setIsOpen(false);
        setCanView(true);
      } else {
        setCanView(false);
        toast.error("Password is wrong!");
      }
    } catch (error) {
      toast.error("Something went wrong!");
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    setIsOpen(true);
  }, []);

  if (canView)
    return (
      <div className="mx-auto px-10 pt-20">
        <Masonry
          items={links}
          config={{
            columns: [1, 3, 5],
            gap: [24, 24, 24],
            media: [640, 768, 1024],
            useBalancedLayout: true,
          }}
          render={(link, index) => (
            <BlurFade key={index} delay={index * 0.1} inView>
              <Image
                className="rounded-2xl"
                src={link}
                alt={link}
                width={500}
                height={300}
              ></Image>
            </BlurFade>
          )}
        />
      </div>
    );

  return (
    <div className="flex justify-center items-center">
      <Button variant="outline" onClick={() => setIsOpen(true)}>
        Enter password
      </Button>
      <AlertDialog open={isOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Please enter password.</AlertDialogTitle>
            <AlertDialogDescription>
              Sorry, the photos are currently in testing and not open to public
              access. They will be made available once the feature upgrade is
              complete.
            </AlertDialogDescription>
          </AlertDialogHeader>
          PASSWORD:
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setIsOpen(false)}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction onClick={submit} disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Submitting
                </>
              ) : (
                <>Submit</>
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Photos;
