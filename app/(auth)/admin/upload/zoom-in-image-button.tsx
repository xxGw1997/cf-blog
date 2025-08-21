"use client";

import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const ZoomInImageButton = ({ url }: { url: string }) => {
  return (
    <>
      <Dialog>
        <DialogTrigger>
          <Image
            src={url}
            alt={url}
            height={50}
            width={50}
            className="object-cover cursor-zoom-in"
          />
        </DialogTrigger>
        <DialogContent className="md:max-w-1/2">
          <DialogTitle></DialogTitle>
          <div className="flex items-center justify-center">
            <Image
              src={url}
              alt={url}
              height={400}
              width={400}
              className="object-contain"
            />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ZoomInImageButton;
