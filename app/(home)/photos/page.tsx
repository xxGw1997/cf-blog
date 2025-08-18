"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

import { getFileList, validatePassword } from "@/actions/file-upload";

import { Masonry } from "@/components/masonry";
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
  const [keys, setKeys] = useState<string[]>([]);

  const submit = async () => {
    setIsSubmitting(true);
    try {
      const res = await validatePassword(password);

      if (res) {
        setIsOpen(false);
        setCanView(true);
      } else {
        setCanView(false);
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

  useEffect(() => {
    async function getKeys() {
      const keys = await getFileList();
      setKeys(keys);
    }
    if (canView) getKeys();
  }, [canView]);

  if (canView)
    return (
      <div className="mx-auto px-10 pt-20">
        <Masonry>
          {keys.map((item, index) => (
            <BlurFade key={index} delay={index * 0.1} inView>
              <Image
                className="rounded-2xl"
                src={`${process.env.NEXT_PUBLIC_R2_DOMAIN}/${item}`}
                alt={item}
                width={500}
                height={300}
              ></Image>
            </BlurFade>
          ))}
        </Masonry>
      </div>
    );

  return (
    <>
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
            <AlertDialogCancel>Cancel</AlertDialogCancel>
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
    </>
  );
};

export default Photos;
