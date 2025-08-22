"use client";

import React, { useState } from "react";
import { Loader2, Trash2 } from "lucide-react";
import { toast } from "sonner";

import { useConfirm } from "@/hooks/use-confirm";
import { Button } from "@/components/ui/button";
import { removeFile } from "@/actions/file-upload";

const RemoveFileButton = ({ url }: { url: string }) => {
  const [removing, setRemoving] = useState(false);

  const [ConfirmDialog, beforeRemove] = useConfirm(
    "Are you sure?",
    "This action is irreversible."
  );

  const handleRemove = async () => {
    const ok = await beforeRemove();
    if (!ok) return;

    try {
      setRemoving(true);
      const res = await removeFile(url);
      if (res) toast.success(res);
    } catch (error) {
      throw error;
    } finally {
      setRemoving(false);
    }
  };

  return (
    <>
      <ConfirmDialog />
      <Button
        variant="destructive"
        size="sm"
        onClick={handleRemove}
        disabled={removing}
      >
        {removing ? <Loader2 className="animate-spin" /> : <Trash2 />}
        删除文件
      </Button>
    </>
  );
};

export default RemoveFileButton;
