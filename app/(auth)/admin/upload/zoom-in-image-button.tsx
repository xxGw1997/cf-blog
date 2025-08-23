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
          <div className="max-w-[800px] max-h-[800px]">
            <Image
              src={url}
              alt={url}
              height={750}
              width={750}
              className="object-contain"
            />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ZoomInImageButton;
