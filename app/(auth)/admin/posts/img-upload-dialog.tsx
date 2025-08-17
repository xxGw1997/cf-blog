import React, { useState } from "react";
import { toast } from "sonner";
import { Loader2, Upload } from "lucide-react";

import ImgUploader from "@/components/admin/img-uploader";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { FileWithPreview } from "@/hooks/use-file-upload";
import { uploadFile } from "@/actions/file-upload";

const UploadDialog = () => {
  const [previewFileInfo, setPreviewFileInfo] = useState<File | null>(null);
  const [r2Url, setR2Url] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const onClose = () => {
    setPreviewFileInfo(null);
    setR2Url("");
    setIsOpen(false);
  };

  const onFilesAdded = (files: FileWithPreview[]) => {
    const file = files[0].file;
    if (file instanceof File) {
      setPreviewFileInfo(file);
    }
  };

  const handleUpload = async () => {
    if (!previewFileInfo) {
      toast.error("Please select a file");
      return;
    }
    setIsUploading(true);

    try {
      const formData = new FormData();
      formData.append("file", previewFileInfo);

      const result = await uploadFile(formData, { prefix: "life" });

      setR2Url(result.url);

      toast.success(result.message);
    } catch (error) {
      console.error("Error uploading image:", error);
      toast.error(JSON.stringify(error));
    } finally {
      setIsUploading(false);
    }
  };

  const handleCopyUrl = () => {
    if (!r2Url) return;
    navigator.clipboard.writeText(r2Url);
    toast.success("Copied~");
  };

  return (
    <>
      <Button variant="outline" onClick={() => setIsOpen(true)}>
        Image Upload
      </Button>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent
          className="!max-w-3xl"
          onInteractOutside={(e) => e.preventDefault()}
        >
          <DialogTitle>Image Upload</DialogTitle>
          <div className="flex flex-col gap-8">
            <ImgUploader className="h-96" onFilesAdded={onFilesAdded} />
            <Button
              onClick={handleUpload}
              disabled={isUploading || !previewFileInfo}
            >
              {isUploading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Uploading...
                </>
              ) : (
                <>
                  <Upload className="mr-2 h-4 w-4" />
                  Upload
                </>
              )}
            </Button>
            {r2Url && (
              <p className="text-sm break-all flex items-center gap-x-5">
                <strong>URL:</strong>

                <a
                  className="underline text-accent"
                  href={`https://${r2Url}`}
                  target="_blank"
                >{`https://${r2Url}`}</a>

                <Button onClick={handleCopyUrl} size="sm" variant={"outline"}>
                  Copy
                </Button>
              </p>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default UploadDialog;
