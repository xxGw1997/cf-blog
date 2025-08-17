"use client";

import { useEffect, useState } from "react";

import { getFileList } from "@/actions/file-upload";

const Pictures = () => {
  const [files, setFiles] = useState<R2Objects>();
  useEffect(() => {
    async function getFiles() {
      const files = await getFileList();
      setFiles(files);
    }
    getFiles();
  }, []);

  return (
    <div>
      <ul>
        {files &&
          files.objects.map((file, index) => (
            <li key={index}>
              {index + 1} : {file.key}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Pictures;
