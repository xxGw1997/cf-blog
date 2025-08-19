"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

import { getFileList, validatePassword } from "@/actions/file-upload";

import { Masonry as MyMasonry, MasonryRef } from "@/components/my-masonry";
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
  const [links, setLinks] = useState<string[]>([]);

  const masonryRef = useRef<MasonryRef>(null);

  const submit = async () => {
    setIsSubmitting(true);
    try {
      const res = await validatePassword(password);

      if (res) {
        // const links = await getFileList();
        const links = [
          "https://r2.88boy.lol/cat1.jpg",
          "https://r2.88boy.lol/cat2.jpg",
          "https://r2.88boy.lol/cat3.jpg",
          "https://r2.88boy.lol/cat5.jpg",
          "https://r2.88boy.lol/cat6.jpg",
          "https://r2.88boy.lol/p1.jpg",
          "https://r2.88boy.lol/p2.jpg",
          "https://r2.88boy.lol/p3.jpg",
          "https://r2.88boy.lol/s1.jpg",
          "https://r2.88boy.lol/s2.jpg",
          "https://r2.88boy.lol/s3.jpg",
          "https://r2.88boy.lol/s4.jpg",
          "https://r2.88boy.lol/s5.jpg",
        ];
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
        {/* <Masonry
          items={links}
          config={{
            columns: [1, 3, 5],
            gap: [24, 24, 24],
            media: [640, 768, 1024],
            useBalancedLayout: true,
          }}
          render={(link, index) => (
            <BlurFade
              key={index}
              delay={index * 0.1}
              inView
              onAnimationComplete={() => console.log("complete")}
            >
              <Image
                className="rounded-2xl"
                src={link}
                alt={link}
                width={500}
                height={300}
              ></Image>
            </BlurFade>
          )}
        /> */}
        <MyMasonry
          ref={masonryRef}
          items={links}
          cols={5}
          gap={20}
          render={(link, index) => (
            <BlurFade
              key={index}
              delay={index * 0.1}
              inView
              onAnimationComplete={() => {
                masonryRef.current?.updateLayout();
              }}
            >
              <Image
                className="rounded-2xl h-auto"
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
