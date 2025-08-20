"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import { getFileList } from "@/actions/file-upload";

import { Masonry, MasonryRef } from "@/components/masonry";
import { BlurFade } from "@/components/magicui/blur-fade";

const Photos = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [links, setLinks] = useState<string[]>([]);

  const masonryRef = useRef<MasonryRef>(null);

  useEffect(() => {
    async function getLinks() {
      try {
        const links = await getFileList();
        setLinks(links);
      } catch (error) {
        toast.error("Something went wrong!");
      }
    }
    if (!session?.user) {
      toast.error("Please login to access photoes!");
      router.push("/");
    } else {
      getLinks();
    }
  }, []);

  return (
    <div className="px-7 pt-20">
      <Masonry
        className="w-full"
        ref={masonryRef}
        items={links}
        cols={[1, 3, 5]}
        gaps={[10, 20, 30]}
        medias={[512, 768, 1024]}
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
};

export default Photos;
